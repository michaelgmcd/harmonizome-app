'use strict';

var React = require('react-native');
var Router = require('./src/Router');
var {AppRegistry,} = React;

var gene = React.createClass({
  render: function() {
    return (
      <Router />
    );
  }
});

AppRegistry.registerComponent('gene', () => gene);
