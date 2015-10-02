var React = require('react-native');
var NavBar = require('./NavBar');
var TermList = require('./TermList');
var StyleVars = require('./StyleVars');
var {
  colorBackground,
  colorBorderBottom,
  colorBorderSide,
  colorBorderTop,
  colorLightGray,
  colorGray,
  colorUrl,
  fontFamily,
} = StyleVars;

var {
  ListView,
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
    return {
      url: '',
      showWebView: false,
      libraryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(this.props.libraries),
    };
  },
  render: function() {
    return (
      <View>
        { this.state.showWebView && this.state.url.length
          ? <WebView
              automaticallyAdjustContentInsets={false}
              style={styles.webView}
              url={this.state.url}
              javaScriptEnabledAndroid={true}
              startInLoadingState={true}
            />
          : <ListView
              dataSource={this.state.libraryDataSrc}
              renderRow={this._renderLibrary}
              style={styles.listView}
              automaticallyAdjustContentInsets={false}
            />
        }
      </View>
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
  _goToUrl: function(url) {
    this.setState({
      url: url,
      showWebView: true,
    });
  },
  _renderLibrary: function(libObj) {
    return (
      <View style={styles.rowWrapper}>
        <TouchableHighlight onPress={() => this._goToTerms(libObj)}>
          <View style={styles.rowInner}>
            <Text style={styles.libraryTitle}>
              {libObj.name}
            </Text>
            <Text>
              Description: {libObj.format}
            </Text>
            <Text
              style={styles.url}
              onPress={() => this._goToUrl(libObj.link)}>
              {libObj.link}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: colorBackground,
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowWrapper: {
    marginTop: 10,
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
    color: colorUrl,
  }
});

module.exports = LibraryResults;
