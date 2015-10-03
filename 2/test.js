var expect = require('chai').expect;
var requireUncached = require('require-uncached');
var getType = require('./getType');
var curringSum = require('./curringSum');


describe('getType', function () {
  it('should works with number', function() {
    expect(getType(1)).to.equal('number');
  });

  it('should works with NaN', function() {
    expect(getType(NaN)).to.equal('NaN');
  });

  it('should works with string', function() {
    expect(getType('1')).to.equal('string');
  });

  it('should works with function', function() {
    expect(getType(function() {})).to.equal('function');
  });

  it('should works with object', function() {
    expect(getType({})).to.equal('object');
  });

  it('should works with array', function() {
    expect(getType([])).to.equal('array');
  });

  it('should works with null', function() {
    expect(getType(null)).to.equal('null');
  });

  it('should works with undefined', function() {
    expect(getType(undefined)).to.equal('undefined');
  });
});

describe('counter', function () {
  var counter;
  beforeEach(function() {
    counter = requireUncached('./counter');
  });

  describe('#getCounter', function () {
    it('should initialize with 0', function () {
      expect(counter.getState()).to.equal(0);
    });
  });

  describe('#increase', function () {
    it('should +1 after increase', function () {
      counter.increase();
      expect(counter.getState()).to.equal(1);
      counter.increase();
      expect(counter.getState()).to.equal(2);
      counter.increase();
      expect(counter.getState()).to.equal(3);
    });
  });

  describe('#decrease', function () {
    it('should -1 after decrease', function () {
      counter.decrease();
      expect(counter.getState()).to.equal(-1);
      counter.decrease();
      expect(counter.getState()).to.equal(-2);
      counter.decrease();
      expect(counter.getState()).to.equal(-3);
    });
  });
});

describe('curringSum', function () {
  it('should works', function() {
    expect(curringSum(1)).to.be.a('function');
    expect(curringSum(1)(2)).to.be.a('function');
    expect(curringSum(1)(2)(3)).to.equal(6);
  });
});
