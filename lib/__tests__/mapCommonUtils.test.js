/* globals describe, it */
const assert = require('assert');
const mapCommonUtils = require('../index.js');

const DEF_LAT = 53.5775;
const DEF_LON = 3.106111;

describe('mapCommonUtils', () => {
  it('square returs array', () => {
    const square = mapCommonUtils.squareAround({ lat: DEF_LAT, lon: DEF_LON }, 1);
    console.log(square);
    assert(Array.isArray(square.bbox), 'mapCommonUtils square returns an polygon array with bbox');
    assert(Array.isArray(square.geometry.coordinates), 'mapCommonUtils square returns an polygon array');
  });

  it('rectangle returs array', () => {
    const rect = mapCommonUtils.rectangleAround({ lat: DEF_LAT, lon: DEF_LON }, 1, 0.5);
    console.log(rect);
    assert(Array.isArray(rect.bbox), 'mapCommonUtils rect returns an polygon array with bbox');
    assert(Array.isArray(rect.geometry.coordinates), 'mapCommonUtils rect returns an polygon array');
  });

  it('union of circles', () => {
    const elements = [
      { location: { lat: DEF_LAT, lon: DEF_LON }, distance: 1 },
      { location: { lat: DEF_LAT, lon: DEF_LON }, distance: 2 }
    ];
    const union = mapCommonUtils.calcUnion(elements, sub => sub, true);
    assert('Feature' === union.type, 'returns a feature');
  });

  it('union of rectangles', () => {
    const elements = [
      { location: { lat: DEF_LAT, lon: DEF_LON }, distance: 1, distanceY: 1 },
      { location: { lat: DEF_LAT, lon: DEF_LON }, distance: 2, distanceY: 1 }
    ];
    const union = mapCommonUtils.calcUnion(elements, sub => sub, false);
    assert('Feature' === union.type, 'returns a feature');
  });

  it('union of empty list', () => {
    const elements = [
    ];
    const union = mapCommonUtils.calcUnion(elements, sub => sub, false);
    assert(null === union, 'returns null');
  });
});
