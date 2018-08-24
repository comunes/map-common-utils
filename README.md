# map-common-utils [![NPM version][npm-image]][npm-url]
> Map common utils

## Installation

```sh
$ npm install --save map-common-utils
```

## Usage

Given center as {lat, lng} and radius in meters create a polygon of a real-earth square:

```js
const mapCommonUtils = require('map-common-utils');

const square = mapCommonUtils.square({lat: 53.5775, lng: 3.106111}, 1000)
```

This package was generated with [yeoman generator-node](https://github.com/yeoman/generator-node).

## License

AGPL-3.0 © [Comunes Association](https://comunes.org)


[npm-image]: https://badge.fury.io/js/map-common-utils.svg
[npm-url]: https://npmjs.org/package/map-common-utils
