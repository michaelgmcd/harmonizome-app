var React = require('react-native');
var StyleVars = require('./StyleVars');

var RECENT_SEARCHES = [];

function exists(searchStr) {
  return RECENT_SEARCHES.indexOf(searchStr) !== -1;
}

function isString(input) {
  return typeof input === 'string' || input instanceof String;
}

module.exports = {
  getSearches: function() {
    return RECENT_SEARCHES;
  },
  addSearch: function(searchStr) {
    if (!exists(searchStr) && isString(searchStr)) {
      RECENT_SEARCHES.push(searchStr);
    }
  },
  removeSearch: function(searchStr) {
    if (exists(searchStr)) {
      var index = RECENT_SEARCHES.indexOf(searchStr);
      RECENT_SEARCHES.splice(index, 1);
    }
  },
};
