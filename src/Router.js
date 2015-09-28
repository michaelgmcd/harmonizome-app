var React = require('react-native');
var Home = require('./Home');
var Styles = require('./StyleVars');
var {colorPrimary} = Styles;

var {
  Navigator,
  StyleSheet,
  View,
} = React;

var router = React.createClass({
  getInitialState: function() {
    return {
      navHidden: true
    };
  },
  render: function() {
    var _this = this;
    return (
      <Navigator
        style={styles.homeNav}
        initialRoute={{
          name: 'Home',
          component: Home
        }}
        renderScene={this.renderScene}
      />
    );
  },
  renderScene: function(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;
    var props = route.passProps;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator, route,
      });
    }

    return (
      <View style={{ flex: 1, }}>
        {navBar}
        <Component {...props} navigator={navigator} route={route} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  homeNav: {
    flex: 1,
    borderBottomWidth: 0
  }
});

module.exports = router;
