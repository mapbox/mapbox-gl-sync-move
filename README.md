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

Pull Requests merged to `main` with conventional commit prefixes are automatically published to npm by the `NPM release` GitHub Actions workflow, as new major/minor/patch versions (`feat!:`/`feat:`/`fix:` respectively). When using "Squash and merge", ensure your PR title includes the conventional commit prefix; a `BREAKING CHANGE:` footer only counts if it ends up in the squash commit's body. Other prefixes (`chore:`, `docs:`, etc.) or no prefix don't trigger a release.

Examples:
- `fix: resolved issue with pitch syncing` -> patch
- `feat: added option to sync bearing only` -> minor
- `feat!: dropped support for mapbox-gl v1` (requires consumer changes) -> major

The workflow publishes via [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC), so no npm token is needed. This requires an npm org admin to configure a trusted publisher for `@mapbox/mapbox-gl-sync-move` (GitHub Actions, workflow `npm-release.yml`, environment `npm-release`), and the `npm-release` GitHub Environment to exist in this repository. After publishing, the workflow creates a [GitHub Release](https://github.com/mapbox/mapbox-gl-sync-move/releases) with generated notes and comments the released version on the merged PRs.

`package.json`'s `version` may be incremented manually if needed (for example, to skip a minor version), but you shouldn't normally need to touch it; the published npm version, not `package.json`, is the source of truth for what gets released next.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `0.3.1-aa79c6a`) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.
