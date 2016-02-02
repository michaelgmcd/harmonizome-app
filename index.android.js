var React = require('react-native');
var Router = require('./src/Router');
var { AppRegistry } = React;

var Harmonizome = React.createClass({
  render: function() {
    return (
      <Router os="android" />
    );
  }
});

AppRegistry.registerComponent('Harmonizome', () => Harmonizome);
