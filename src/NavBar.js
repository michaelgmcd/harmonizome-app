var React = require('react-native');
var {
  BackAndroid,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;
var StyleVars = require('./StyleVars');
var {
  colorBorderBottom,
  colorPrimary,
  colorPrimaryDark,
  fontFamily,
} = StyleVars;

var {Icon,} = require('react-native-icons');

var routesWithListeners = [];
var listenerAdded = false;

var NavBar = React.createClass({
  propTypes: {
    hideInfoBtn: React.PropTypes.bool,
    gene: React.PropTypes.string,
    category: React.PropTypes.string,
    library: React.PropTypes.string,
    onBack: React.PropTypes.func,
  },
  getInitialState() {
    return {
      modalVisible: false,
    };
  },
  componentDidMount: function() {
    if (this.props.os === 'android') {
      // The listenerAdded variable ensures that only one event listener is added
      // to the Android back button.
      if (!listenerAdded) {
        BackAndroid.addEventListener(this.props.route.name, () => {
          // If there is more than one route in the stack, then pressing the back
          // button should pop the navigator, otherwise, exit the app.
          var currRoutes = this.props.navigator.getCurrentRoutes();
          if (currRoutes.length > 1) {
            this.props.navigator.pop();
            return true;
          }
          return false;
        });
        routesWithListeners.push(this.props.route.name);
        listenerAdded = true;
      }
    }
  },
  componentWillUnmount: function() {
    if (routesWithListeners.length) {
      routesWithListeners.forEach((routeName) => {
        BackAndroid.removeEventListener(routeName);
      });
    }
  },
  _setModalVisible(visible) {
    this.props.navigator.replace(
      Object.assign(
        {},
        this.props.route,
        {
          passProps: {
            ...this.props.route.passProps,
            useLastResult: true,
          },
          gene: this.props.gene,
          modalVisible: visible
        }
      )
    );
  },
  _formatText(text) {
    if (text && text.length > 16) {
      return text.substring(0, 16) + '...';
    }
    return text;
  },
  render() {
    var backBtn;
    var backBtnStyle;
    if (this.props.useXBtn) {
      backBtn = require('image!nav_x_white');
      backBtnStyle = styles.navX;
    } else {
      backBtn = require('image!nav_back_white');
      backBtnStyle = styles.navBtn;
    }
    var category = this._formatText(this.props.category) || '';
    var library = this._formatText(this.props.library) || '';
    return (
      <View>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => { this.props.navigator.pop(); }}>
            <Image
              source={backBtn}
              resizeMode={'contain'}
              style={backBtnStyle}
            />
          </TouchableOpacity>
          <View style={styles.navMiddle}>
            {
              !!category && !!library
              ? <View style={styles.center}>
                  <Text style={styles.navTitleWithSub}>{this.props.gene}</Text>
                  <Text style={styles.navSubTitle}>
                    {category + ' | ' + library}
                  </Text>
                </View>
              : !!category
              ? <View style={styles.center}>
                  <Text style={styles.navTitleWithSub}>{this.props.gene}</Text>
                  <Text style={styles.navSubTitle}>{category}</Text>
                </View>
              : !!library
              ? <View style={styles.center}>
                  <Text style={styles.navTitle}>{library}</Text>
                </View>
              : <Text style={styles.navTitle}>{this.props.gene}</Text>
            }
          </View>
          { this.props.hideInfoBtn
            ? <View style={styles.navBtn}></View>
            : <TouchableOpacity onPress={() => { this._setModalVisible(true); }}>
                <Image
                  source={require('image!nav_info')}
                  resizeMode={'contain'}
                  style={styles.navBtn}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navContainer: {
    backgroundColor: colorPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colorPrimaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    marginTop: 2,
    fontSize: 20,
    fontFamily: fontFamily,
    color: 'white',
  },
  navTitleWithSub: {
    flex: 1,
    fontSize: 18,
    fontFamily: fontFamily,
    color: 'white',
  },
  navSubTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily,
    color: 'white',
  },
  navX: {
    height: 20,
    width: 20,
  },
  navBtn: {
    height: 24.5,
    width: 28,
  },
});

module.exports = NavBar;
