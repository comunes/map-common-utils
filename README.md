# map-common-utils [![NPM version][npm-image]][npm-url]
> Map common utils

## Installation

```sh
$ npm install --save map-common-utils
```

## Usage

Given center {lat, lon} and x, y size in kilometers create a polygon of a real-earth rectangle.

```js
const mapCommonUtils = require('map-common-utils');

const square = mapCommonUtils.rectangleAround({lat: 53.5775, lon: 3.106111}, 0.5, 1);
```

Given center {lat, lon} and size in kilometers create a polygon of a real-earth square.

```js
const mapCommonUtils = require('map-common-utils');

const square = mapCommonUtils.squareAround({lat: 53.5775, lon: 3.106111}, 1);
```

Also, union of square/circle objects (see doc folder).

This package was generated with [yeoman generator-node](https://github.com/yeoman/generator-node).

## License

AGPL-3.0 © [Comunes Association](https://comunes.org)


[npm-image]: https://badge.fury.io/js/map-common-utils.svg
[npm-url]: https://npmjs.org/package/map-common-utils
