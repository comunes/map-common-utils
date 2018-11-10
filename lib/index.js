const thelper = require('@turf/helpers');
const tdest = require('@turf/destination').default;
const tbbox = require('@turf/bbox').default;
const tbboxPolygon = require('@turf/bbox-polygon').default;
const tinv = require('@turf/invariant');
const tunion = require('@turf/union').default;
const ttrunc = require('@turf/truncate').default;
const tcircle = require('@turf/circle').default;

/**
 * Given center and x, y size in kilometers create a polygon of a real-earth rectangle.
 * @param {Object} center0 - A center Object with lat, lon elements.
 * @param {number} center0.lat - A center latitude.
 * @param {number} center0.lon - A center longitude.
 * @param {number} x - Size x in kilometers
 * @param {number} y - Size y in kilometers
 * @return {Feature<Polygon>} A rectangle polygon of x*y in that center
 */
const rectangleAround = function rect(centerO, x, y) {
  const center = thelper.point([centerO.lon, centerO.lat]);
  const options = { units: 'kilometers' };
  const x2 = x / 2;
  const y2 = y / 2;
  const sw = tinv.getCoord(tdest(tinv.getCoord(tdest(center, y2, 180, options)), x2, -90, options));
  const ne = tinv.getCoord(tdest(tinv.getCoord(tdest(center, y2, 0, options)), x2, 90, options));
  const line = thelper.lineString([sw, ne]);
  const bbox = tbbox(line);
  const bboxPolygon = tbboxPolygon(bbox);
  return bboxPolygon;
};

module.exports.rectangleAround = rectangleAround;

/**
 * Given center and size in kilometers create a polygon of a real-earth square.
 * @param {Object} center - A center Object with lat, lon elements.
 * @param {number} center.lat - A center latitude.
 * @param {number} center.lon - A center longitude.
 * @param {number} size - Size in kilometers.
 * @return {Feature<Polygon>} A square polygon of x*y in that center.
 */
module.exports.squareAround = function sq(center, size) {
  return module.exports.rectangleAround(center, size, size);
};

// https://stackoverflow.com/questions/35394577/leaflet-js-union-merge-circles
// https://stackoverflow.com/questions/7167604/how-accurately-should-i-store-latitude-and-longitude
const truncOptions = { precision: 6, coordinates: 2 };

// Turf union operates in only two polygons
// https://gis.stackexchange.com/questions/243460/turf-js-union-with-array-of-features
const unify = (polyList) => {
  let unionTemp = polyList.length > 0 ?  ttrunc(polyList[0], truncOptions) : null;
  for (let i = 1; i < polyList.length; i += 1) {
    const pol = polyList[i];
    unionTemp = ttrunc(tunion(unionTemp, pol), truncOptions);
  }
  return unionTemp;
};

/**
 * Calc the union of rectangles or circles.
 * @param {Object[]} subs - An array of polygon objects.
 * @param {Object} subs[].location - A polygon center location.
 * @param {number} subs[].location.lat - Latitude of polygon.
 * @param {number} subs[].location.lon - Longitude of polygon.
 * @param {Function} decorated - A function used for add some noise to the results for privacy reasons.
 * @param {Boolean} typeCircle - If polygon objects are circle or rectangles.
 * @return {Feature<Polygon>} A GeoJson union of the objects arrays.
 */
module.exports.calcUnion = (subs, decorated, typeCircle) => {
  const unionGroup = [];
  const doCircle = (typeof typeCircle !== 'undefined') ? typeCircle : true;
  subs.forEach((osub) => {
    try {
      if (osub.location && osub.location.lat && osub.location.lon && osub.distance) {
        const dsub = decorated(osub);
        const jsonPolygon = doCircle ?
                            tcircle(
                              [dsub.location.lon, dsub.location.lat], dsub.distance,
                              { units: 'kilometers', steps: 144 }
                            ) :
                            rectangleAround(
                              { lon: dsub.location.lon, lat: dsub.location.lat },
                              dsub.distance,
                              (typeof dsub.distanceY !== 'undefined') ? dsub.distanceY : dsub.distance
                            );
        unionGroup.push(jsonPolygon);
      } else {
        console.info(`Wrong element to do union ${JSON.stringify(osub)}`);
      }
    } catch (e) {
      console.error(e, `Wrong element trying to make union ${JSON.stringify(osub)}`);
    }
  });
  const unionJson = unify(unionGroup);
  return unionJson;
};
