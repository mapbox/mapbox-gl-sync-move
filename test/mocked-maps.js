var test = require('tape');
var sinon = require('sinon');
var EventEmitter = require('eventemitter3');
var syncMaps = require('..');

function createMockMap() {
  const map = new EventEmitter();
  map.getCenter = sinon.spy();
  map.getZoom = sinon.spy();
  map.getBearing = sinon.spy();
  map.getPitch = sinon.spy();
  map.jumpTo = sinon.spy(function() {
    map.emit('move');
  });
  return map;
}

test('when foo moves once, bar moves once', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  syncMaps(foo, bar);

  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 1);
  t.equal(foo.getZoom.callCount, 1);
  t.equal(foo.getBearing.callCount, 1);
  t.equal(foo.getPitch.callCount, 1);

  t.equal(bar.jumpTo.callCount, 1);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.end();
});

test('when foo moves thrice, bar moves thrice', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  syncMaps(foo, bar);

  foo.emit('move');
  foo.emit('move');
  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 3);
  t.equal(foo.getZoom.callCount, 3);
  t.equal(foo.getBearing.callCount, 3);
  t.equal(foo.getPitch.callCount, 3);

  t.equal(bar.jumpTo.callCount, 3);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.end();
});

test('when bar moves once, foo moves once', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  syncMaps(foo, bar);

  bar.emit('move');

  t.equal(bar.jumpTo.callCount, 0);
  t.equal(bar.getCenter.callCount, 1);
  t.equal(bar.getZoom.callCount, 1);
  t.equal(bar.getBearing.callCount, 1);
  t.equal(bar.getPitch.callCount, 1);

  t.equal(foo.jumpTo.callCount, 1);
  t.equal(foo.getCenter.callCount, 0);
  t.equal(foo.getZoom.callCount, 0);
  t.equal(foo.getBearing.callCount, 0);
  t.equal(foo.getPitch.callCount, 0);

  t.end();
});

test('when bar moves thrice, foo moves thrice', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  syncMaps(foo, bar);

  bar.emit('move');
  bar.emit('move');
  bar.emit('move');

  t.equal(bar.jumpTo.callCount, 0);
  t.equal(bar.getCenter.callCount, 3);
  t.equal(bar.getZoom.callCount, 3);
  t.equal(bar.getBearing.callCount, 3);
  t.equal(bar.getPitch.callCount, 3);

  t.equal(foo.jumpTo.callCount, 3);
  t.equal(foo.getCenter.callCount, 0);
  t.equal(foo.getZoom.callCount, 0);
  t.equal(foo.getBearing.callCount, 0);
  t.equal(foo.getPitch.callCount, 0);

  t.end();
});

test('when foo moves once, bar moves once, baz moves once', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  const baz = createMockMap();
  syncMaps(foo, bar, baz);

  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 1);
  t.equal(foo.getZoom.callCount, 1);
  t.equal(foo.getBearing.callCount, 1);
  t.equal(foo.getPitch.callCount, 1);

  t.equal(bar.jumpTo.callCount, 1);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.equal(baz.jumpTo.callCount, 1);
  t.equal(baz.getCenter.callCount, 0);
  t.equal(baz.getZoom.callCount, 0);
  t.equal(baz.getBearing.callCount, 0);
  t.equal(baz.getPitch.callCount, 0);

  t.end();
});

test('when foo moves once, bar moves once, baz moves once -- array version', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  const baz = createMockMap();
  syncMaps([foo, bar, baz]);

  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 1);
  t.equal(foo.getZoom.callCount, 1);
  t.equal(foo.getBearing.callCount, 1);
  t.equal(foo.getPitch.callCount, 1);

  t.equal(bar.jumpTo.callCount, 1);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.equal(baz.jumpTo.callCount, 1);
  t.equal(baz.getCenter.callCount, 0);
  t.equal(baz.getZoom.callCount, 0);
  t.equal(baz.getBearing.callCount, 0);
  t.equal(baz.getPitch.callCount, 0);

  t.end();
});

test('when foo moves thrice, bar moves thrice, baz moves thrice', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  const baz = createMockMap();
  syncMaps(foo, bar, baz);

  foo.emit('move');
  foo.emit('move');
  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 3);
  t.equal(foo.getZoom.callCount, 3);
  t.equal(foo.getBearing.callCount, 3);
  t.equal(foo.getPitch.callCount, 3);

  t.equal(bar.jumpTo.callCount, 3);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.equal(baz.jumpTo.callCount, 3);
  t.equal(baz.getCenter.callCount, 0);
  t.equal(baz.getZoom.callCount, 0);
  t.equal(baz.getBearing.callCount, 0);
  t.equal(baz.getPitch.callCount, 0);

  t.end();
});

test('when foo moves thrice, bar moves thrice, baz moves thrice -- array version', function(t) {
  const foo = createMockMap();
  const bar = createMockMap();
  const baz = createMockMap();
  syncMaps([foo, bar, baz]);

  foo.emit('move');
  foo.emit('move');
  foo.emit('move');

  t.equal(foo.jumpTo.callCount, 0);
  t.equal(foo.getCenter.callCount, 3);
  t.equal(foo.getZoom.callCount, 3);
  t.equal(foo.getBearing.callCount, 3);
  t.equal(foo.getPitch.callCount, 3);

  t.equal(bar.jumpTo.callCount, 3);
  t.equal(bar.getCenter.callCount, 0);
  t.equal(bar.getZoom.callCount, 0);
  t.equal(bar.getBearing.callCount, 0);
  t.equal(bar.getPitch.callCount, 0);

  t.equal(baz.jumpTo.callCount, 3);
  t.equal(baz.getCenter.callCount, 0);
  t.equal(baz.getZoom.callCount, 0);
  t.equal(baz.getBearing.callCount, 0);
  t.equal(baz.getPitch.callCount, 0);

  t.end();
});