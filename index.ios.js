'use strict';

var React = require('react-native');
var Router = require('./src/Router');
var {AppRegistry,} = React;

var Harmonizome = React.createClass({
  render: function() {
    return (
      <Router os="ios" />
    );
  }
});

AppRegistry.registerComponent('Harmonizome', () => Harmonizome);
