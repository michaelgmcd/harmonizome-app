var React = require('react-native');
var Home = require('./Home');
var GeneModal = require('./GeneModal');
var Styles = require('./StyleVars');
var {colorPrimary} = Styles;

var {
  IntentAndroid,
  Navigator,
  StyleSheet,
  View,
} = React;

var router = React.createClass({
  componentWillMount: function() {
    if (this.props.os === 'android') {
      DEVICE_IS_ANDROID = true;
    }
  },
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
    var routeProps = route.passProps;
    var os = this.props.os;

    if (navBar) {
      navBar = React.cloneElement(navBar, {
        navigator, route, os,
      });
    }

    return (
      <View style={{ flex: 1 }}>
        {navBar}
        <Component
          {...routeProps}
          os={this.props.os}
          navigator={navigator}
          route={route}
        />
        { route.modalVisible
          ? <GeneModal
              navigator={navigator}
              gene={route.gene}
              os={this.props.os}
              onClose={() => {

                navigator.replace(
                  Object.assign(
                    {},
                    route,
                    {
                      passProps: {
                        ...routeProps,
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
