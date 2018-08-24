const assert = require('assert');
const mapCommonUtils = require('../index.js');

describe('mapCommonUtils', () => {
  it('square returs array', () => {
    const square = mapCommonUtils.square({lat: 53.5775, lng: 3.106111}, 1000)
    console.log(square);
    assert(Array.isArray(square), 'mapCommonUtils square returns an polygon array');
  });
});
