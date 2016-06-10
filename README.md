# mapbox-gl-sync-move

Sync movement between two [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps.

## Usage

This module exports a function that receives as arguments two [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps whose movements you'd like to sync.

```js
var mapboxgl = require('mapbox-gl');
var syncMove = require('mapbox-gl-sync-move');

var mapA = new mapboxgl.Map(..);
var mapB = new mapboxgl.Map(..);

syncMove(mapA, mapB);
```

## Developing

There are unit tests with mocked maps, and there's a page for manual testing.

Run the unit tests with `npm test`.

Start a server to perform manual tests with `npm run start`.
