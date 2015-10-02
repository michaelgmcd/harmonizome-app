var React = require('react-native');
var {
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

var NavBar = React.createClass({
  propTypes: {
    gene: React.PropTypes.string,
    category: React.PropTypes.string,
    library: React.PropTypes.string,
    onBack: React.PropTypes.func,
  },
  getInitialState: function() {
    return {
      modalVisible: false,
    };
  },
  _setModalVisible: function(visible) {
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
  render: function() {
    return (
      <View>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => { this.props.navigator.pop(); }}>
            <Image
              source={require('image!nav_back_white')}
              resizeMode={'contain'}
              style={styles.navBtn}
            />
          </TouchableOpacity>
          <View style={styles.navMiddle}>
            {
              !!this.props.category && !!this.props.library
              ? <View>
                  <Text style={styles.navTitleWithSub}>{this.props.gene}</Text>
                  <Text style={styles.navSubTitle}>
                    {this.props.category} | {this.props.libary}
                  </Text>
                </View>
              : !!this.props.category
              ? <View>
                  <Text style={styles.navTitleWithSub}>{this.props.gene}</Text>
                  <Text style={styles.navSubTitle}>{this.props.category}</Text>
                </View>
              : <Text style={styles.navTitle}>{this.props.gene}</Text>
            }
          </View>
          <TouchableOpacity onPress={() => { this._setModalVisible(true); }}>
            <Image
              source={require('image!nav_info')}
              resizeMode={'contain'}
              style={styles.navBtn}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
  navTitle: {
    marginTop: 2,
    fontSize: 20,
    fontFamily: fontFamily,
    color: 'white',
    textAlign: 'center',
  },
  navTitleWithSub: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: 'white',
    textAlign: 'center',
  },
  navSubTitle: {
    fontSize: 14,
    fontFamily: fontFamily,
    color: 'white',
    textAlign: 'center',
  },
  navBtn: {
    height: 28,
    width: 32,
  },
});

module.exports = NavBar;
