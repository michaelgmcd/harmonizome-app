var React = require('react-native');
var StyleVars = require('./StyleVars');

var RECENT_SEARCHES = [];

module.exports = {
  getSearches: function() {
    return RECENT_SEARCHES;
  },
  addSearch: function(searchStr) {
    if (RECENT_SEARCHES.indexOf(searchStr) === -1 &&
      typeof searchStr === 'string' || searchStr instanceof String) {
      RECENT_SEARCHES.push(searchStr);
    }
  },
  removeSearch: function(searchStr) {
    if (RECENT_SEARCHES.indexOf(searchStr) !== -1) {
      RECENT_SEARCHES.splice(index, 1);
    }
  },
};
