var React = require('react-native');
var WebV = require('./WebView');
var NavBar = require('./NavBar');
var TermList = require('./TermList');
var StyleVars = require('./StyleVars');
var {
  colorBackground,
  colorBorderBottom,
  colorBorderSide,
  colorBorderTop,
  colorDarkGray,
  colorLightGray,
  colorGray,
  colorUrl,
  fontFamily,
} = StyleVars;

var {
  Image,
  ListView,
  Navigator,
  PixelRatio,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  WebView,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    categoryName: React.PropTypes.string,
    categoryObj: React.PropTypes.object,
  },
  getInitialState: function() {
    var libs = [{ text: 'Select a library to view its related terms'}];
    libs.push.apply(libs, this.props.categoryObj.libraries);
    return {
      libraryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(libs),
    };
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.libraryDataSrc}
        renderRow={this._renderLibrary}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
  _goToTerms: function(libObj) {
    this.props.navigator.push({
      name: 'Term List',
      component: TermList,
      passProps: {
        terms: libObj.terms,
        libraryName: libObj.name,
        idName: libObj.idName,
        baseUrl: libObj.baseUrl,
        useTermName: libObj.useTermName,
        libraryDesc: libObj.description,
      },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={this.props.categoryObj.name}
          library={libObj.name}
        />
      )
    });
  },
  _goToUrl: function(libName, libUrl) {
    this.props.navigator.push({
      name: 'Library View',
      component: WebV,
      configureScene: Navigator.SceneConfigs.FloatFromBottom,
      passProps: { url: libUrl },
      navigationBar: (
        <NavBar
          useXBtn={true}
          hideInfoBtn={true}
          library={libName}
        />
      )
    });
  },
  _renderLibrary: function(libObj) {
    return (
      <TouchableOpacity
        style={styles.rowWrapper}
        onPress={() => this._goToTerms(libObj)}>
        {!!libObj.text && libObj.text.length
          ? <Text style={styles.libText}>{libObj.text}</Text>
          : <View style={styles.rowInner}>
              <View style={styles.rowInfo}>
                <Text style={[
                  styles.libraryTitle,
                  { fontSize: libObj.name.length < 30 ? 16 : 15 },
                ]}>
                  {libObj.name}
                </Text>
                <Text style={styles.libraryDesc}>
                  {libObj.description}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.rowNav}
                onPress={() => this._goToTerms(libObj)}>
                <Image
                  source={require('image!nav_forward')}
                  resizeMode={'contain'}
                  style={{height: 80, width: 20}}
                />
              </TouchableOpacity>
            </View>
        }
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  libText: {
    fontFamily: fontFamily,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listView: {
    backgroundColor: colorBackground,
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
  },
  rowInfo: {
    flexDirection: 'column',
    flex: 4,
  },
  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    backgroundColor: 'white',
    padding: 10,
  },
  libraryDesc: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fontFamily,
  },
  libraryTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  gene: {
    fontSize: 13,
    fontFamily: fontFamily,
  },
  rowNav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  url: {
    fontFamily: fontFamily,
    color: colorUrl,
  }
});

module.exports = LibraryResults;
