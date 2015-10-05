var React = require('react-native');
var Home = require('./Home');
var GeneModal = require('./GeneModal');
var Styles = require('./StyleVars');
var {colorPrimary} = Styles;

var {
  Navigator,
  StyleSheet,
  View,
} = React;


var router = React.createClass({
  render: function() {
    var _this = this;
    return (
      <Navigator
        style={styles.nav}
        initialRoute={{
          name: 'Home',
          component: Home
        }}
        configureScene={this._configureScene}
        renderScene={this._renderScene}
      />
    );
  },
  _configureScene: function(route) {
    return route.configureScene
    ? route.configureScene
    : Navigator.SceneConfigs.FloatFromRight;
  },
  _renderScene: function(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;
    var modal = route.modal;
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
        { route.modalVisible
          ? <GeneModal
              navigator={navigator}
              gene={route.gene}
              onClose={() => {

                navigator.replace(
                  Object.assign(
                    {},
                    route,
                    {
                      passProps: {
                        ...props,
                        useLastResult: true,
                      },
                      modalVisible: false
                    }
                  )
                );
              }}
            />
          : null
        }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  nav: {
    flex: 1,
    borderBottomWidth: 0
  }
});

module.exports = router;
