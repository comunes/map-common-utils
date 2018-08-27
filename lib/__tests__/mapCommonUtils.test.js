/* globals describe, it */
const assert = require('assert');
const mapCommonUtils = require('../index.js');

describe('mapCommonUtils', () => {
  it('square returs array', () => {
    const square = mapCommonUtils.squareAround({ lat: 53.5775, lon: 3.106111 }, 1);
    console.log(square);
    assert(Array.isArray(square.bbox), 'mapCommonUtils square returns an polygon array with bbox');
    assert(Array.isArray(square.geometry.coordinates), 'mapCommonUtils square returns an polygon array');
  });

  it('rectangle returs array', () => {
    const rect = mapCommonUtils.rectangleAround({ lat: 53.5775, lon: 3.106111 }, 1, 0.5);
    console.log(rect);
    assert(Array.isArray(rect.bbox), 'mapCommonUtils rect returns an polygon array with bbox');
    assert(Array.isArray(rect.geometry.coordinates), 'mapCommonUtils rect returns an polygon array');
  });
});
