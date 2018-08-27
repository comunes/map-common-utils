const thelper = require('@turf/helpers');
const tdest = require('@turf/destination').default;
const tbbox = require('@turf/bbox').default;
const tbboxPolygon = require('@turf/bbox-polygon').default;
const tinv = require('@turf/invariant');

// Given center {lat, lon} and x, y size in kilometers create a polygon of a real-earth rectangle.
module.exports.rectangleAround = function rect(centerO, x, y) {
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

// Given center {lat, lon} and size in kilometers create a polygon of a real-earth square.
module.exports.squareAround = function sq(center, size) {
  return module.exports.rectangleAround(center, size, size);
};
