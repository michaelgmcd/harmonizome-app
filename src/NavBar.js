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
  colorPrimary,
  colorGray,
  fontFamily,
} = StyleVars;

var {Icon,} = require('react-native-icons');
var GeneModal = require('./GeneModal');

var NavBar = React.createClass({
  propTypes: {
    gene: React.PropTypes.string,
    category: React.PropTypes.string,
    onBack: React.PropTypes.func,
  },
  getInitialState: function() {
    return {
      modalVisible: false,
    };
  },
  _setModalVisible: function(visible) {
    this.setState({modalVisible: visible});
  },
  render: function() {
    return (
      <View>
        <GeneModal
          gene={this.props.gene}
          modalVisible={this.state.modalVisible}
          onClose={() => { this._setModalVisible(false); }}
        />
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => { this.props.onBack(); }}>
            <Image
              source={require('image!nav-back')}
              resizeMode={'contain'}
              style={styles.navBtn}
            />
          </TouchableOpacity>
          <View style={styles.navMiddle}>
            {
              !!this.props.category ?
                <View>
                  <Text style={styles.navTitleWithSub}>{this.props.gene}</Text>
                  <Text style={styles.navSubTitle}>{this.props.category}</Text>
                </View>
              :
                <Text style={styles.navTitle}>{this.props.gene}</Text>
            }
          </View>
          <TouchableOpacity onPress={() => { this._setModalVisible(true); }}>
            <Icon
              name='fontawesome|circle-thin'
              size={28}
              color={colorPrimary}
              style={styles.infoOutline}>
              <Icon
                name='fontawesome|info'
                size={16}
                color={colorPrimary}
                style={styles.infoInner}/>
            </Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  navContainer: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: colorGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navTitle: {
    fontSize: 20,
    fontFamily: fontFamily,
    color: colorPrimary,
    textAlign: 'center',
  },
  navTitleWithSub: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorPrimary,
    textAlign: 'center',
  },
  navSubTitle: {
    fontSize: 14,
    fontFamily: fontFamily,
    color: colorPrimary,
    textAlign: 'center',
  },
  navBtn: {
    height: 24,
    width: 32,
  },
  infoInner: {
    flex: 1,
    height: 16,
    width: 16,
  },
  infoOutline: {
    flexDirection: 'column',
    height: 28,
    width: 28,
    alignItems: 'center',
  },
});

module.exports = NavBar;
