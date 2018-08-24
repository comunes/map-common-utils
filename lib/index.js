'use strict';
const spherical = require('spherical');
const wgs84 = require('wgs84');

function pitagoras(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

// Given center as {lat, lng} and radius in meters create a polygon of a real-earth square.
// Based in https://github.com/mapbox/leaflet-geodesy
// Copyright (c) 2017, Mapbox under BSD 2-Clause license

module.exports.square = function(center, radiusP) {
  const radius = pitagoras(radiusP / 2, radiusP / 2);
  const parts = 4;

  function generate(center) {
    var lls = [];
    var angularRadius = ((radius / wgs84.RADIUS) * 180) / Math.PI;

    for (var i = 0; i < parts + 1; i++) {
      lls.push(spherical.radial(
        [center.lng, center.lat],
        // We start a 45º if not we get a rhombus
        ((i / parts) * 360) + 45, radius).reverse());
    }

    if (angularRadius > (90 - center.lat)) {
      lls.push(
        [lls[0][0], center.lng + 180],
               [90, center.lng + 180],
               [90, center.lng - 180],
               [lls[0][0], center.lng - 180]
      );
    }

    if (angularRadius > (90 + center.lat)) {
      lls.splice((parts >> 1) + 1, 0,
                 [lls[(parts>>1)][0], center.lng-180 ],
                 [-90, center.lng-180],
                 [-90, center.lng+180],
                 [lls[(parts >> 1)][0], center.lng+180 ]);
    }

    return lls;
  }

  var poly = generate(center);
  return poly;
};
