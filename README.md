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

## License

AGPL-3.0 © [vjrj]()


[npm-image]: https://badge.fury.io/js/map-common-utils.svg
[npm-url]: https://npmjs.org/package/map-common-utils
[travis-image]: https://travis-ci.org/comunes/map-common-utils.svg?branch=master
[travis-url]: https://travis-ci.org/comunes/map-common-utils
[daviddm-image]: https://david-dm.org/comunes/map-common-utils.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/comunes/map-common-utils
