module.exports = function getType(value) {
  if (Array.isArray(value)) {
    return 'array';
  } else if (typeof value === 'undefined') {
    return 'undefined';
  } else if (typeof value === 'string') {
    return 'string';
  } else if (typeof value === 'function') {
    return 'function';
  } else if (typeof value === 'number') {
    if (isNaN(value)) {
      return 'NaN';
    } else {
      return 'number';
    }
  } else if (value === null) {
    return 'null';
  } else if (typeof value === 'object') {
    return 'object';
  }

  throw new Error('undefined behavior');
};
