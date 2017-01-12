function moveToMapPosition (master, slaves) {
  var center = master.getCenter();
  var zoom = master.getZoom();
  var bearing = master.getBearing();
  var pitch = master.getPitch();

  slaves.forEach(slave => {
    slave.jumpTo({
      center,
      zoom,
      bearing,
      pitch
    });
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
function syncMaps () {
  var maps;
  var argLen = arguments.length;
  if (argLen === 1) {
    maps = arguments[0];
  } else {
    maps = Array(argLen);
    for (i = 0; i < argLen; i++) {
      maps[i] = arguments[i];
    }
  }

  // Create all the movement functions, because if they're created every time
  // they wouldn't be the same and couldn't be removed.
  var fns = [];
  maps.forEach((map, index) => {
    fns[index] = sync.bind(null, map, maps.filter((o, i) => i !== index));
  });

  function on () {
    maps.forEach((map, index) => {
      map.on('move', fns[index]);
    });
  }

  function off () {
    maps.forEach((map, index) => {
      map.off('move', fns[index]);
    });
  }

  // When one map moves, we turn off the movement listeners
  // on all the maps, move it, then turn the listeners on again
  function sync (master, slaves) {
    off();
    moveToMapPosition(master, slaves);
    on();
  }

  on();
}

module.exports = syncMaps;
