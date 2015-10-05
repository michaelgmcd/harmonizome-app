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
  ListView,
  Navigator,
  PixelRatio,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  WebView,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    categoryName: React.PropTypes.string,
    libraries: React.PropTypes.array,
  },
  getInitialState: function() {
    var libs = [{ text: 'Select a library to view its related terms'}];
    libs.push.apply(libs, this.props.libraries);
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
      passProps: { terms: libObj.terms },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={this.props.categoryName}
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
      <View style={styles.rowWrapper}>
        { !!libObj.text && libObj.text.length
          ? <Text style={styles.libText}>{libObj.text}</Text>
          : <TouchableHighlight onPress={() => this._goToTerms(libObj)}>
              <View style={styles.rowInner}>
                <Text style={styles.libraryTitle}>
                  {libObj.name}
                </Text>
                <Text style={styles.libraryDesc}>
                  {libObj.description}
                </Text>
                <Text
                  style={styles.url}
                  onPress={() => this._goToUrl(libObj.name, libObj.link)}>
                  {libObj.link}
                </Text>
              </View>
            </TouchableHighlight>
        }
      </View>
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
    marginTop: 8,
  },
  rowInner: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    flex: 1,
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
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  gene: {
    fontSize: 13,
    fontFamily: fontFamily,
  },
  url: {
    fontFamily: fontFamily,
    color: colorUrl,
  }
});

module.exports = LibraryResults;
