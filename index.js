function moveToMapPosition(referenceMap, mapToMove) {
  mapToMove.jumpTo({
    center: referenceMap.getCenter(),
    zoom: referenceMap.getZoom(),
    bearing: referenceMap.getBearing(),
    pitch: referenceMap.getPitch()
  });
}

// Sync movements of two maps.
//
// All interactions that result in movement end up firing
// a "move" event. The trick here, though, is to
// ensure that movements don't cycle from one map
// to the other and back again, because such a cycle
// - could cause an infinite loop
// - prematurely halts prolonged movements like
//   double-click zooming, box-zooming, and flying
function syncMaps(a, b) {
  on();

  function on() {
    a.on('move', a2b);
    b.on('move', b2a);
  }
  function off() {
    a.off('move', a2b);
    b.off('move', b2a);
  }

  // When one map moves, we turn off the movement listeners
  // on the both maps, move it, then turn the listeners on again
  function a2b() {
    off();
    moveToMapPosition(a, b);
    on();
  }
  function b2a() {
    off();
    moveToMapPosition(b, a);
    on();
  }
}

module.exports = syncMaps;
