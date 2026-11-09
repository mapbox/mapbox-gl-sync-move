# @mapbox/mapbox-gl-sync-move

Sync movement between two or more [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps.

## Install

```
npm install @mapbox/mapbox-gl-sync-move
```

## Usage

This module exports a function that receives as arguments two or more [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps whose movements you'd like to sync.

```js
var mapboxgl = require('mapbox-gl');
var syncMaps = require('mapbox-gl-sync-move');

var mapA = new mapboxgl.Map(..);
var mapB = new mapboxgl.Map(..);

syncMaps(mapA, mapB);
```

## Developing

There are unit tests with mocked maps, and there's a page for manual testing.

Run the unit tests with `npm test`.

To manually test, ensure you have a `MapboxAccessToken` environment variable set. Then start the server with `npm run start`.

## Publishing

Pull Requests to `main` automatically publish a new version based on the PR's title prefix (`major:`, `minor:` or `patch:`) to the npmjs registry.

The published version in the registry is the source of truth for the package version, but you can manually increment the `package.json`'s `version`.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `0.3.1-aa79c6a`) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.
