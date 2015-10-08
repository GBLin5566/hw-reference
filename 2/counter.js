module.exports = (function () {
  var count = 0;
  return {
    getState: function() {
      return count;
    },
    increase: function() {
      count++;
    },
    decrease: function() {
      count--;
    }
  }
})();
