var React = require('react-native');
var WebV = require('./WebView');
var NavBar = require('./NavBar');
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
  LinkingIOS,
  ListView,
  Navigator,
  PixelRatio,
  StyleSheet,
  View,
  Text,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    terms: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      termsDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };
  },
  componentWillMount: function() {
    // var terms = [{ text: ''}]
    this.setState({
      termsDataSrc: this.state.termsDataSrc.cloneWithRows(this.props.terms)
    });
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.termsDataSrc}
        renderRow={this.renderTerms}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
  renderTerms: function(term) {
    var pmIdRegEx = /(\b\d{7,8}\b)/g;
    var pmId = term.match(pmIdRegEx);
    var termWithId = term.split(pmIdRegEx);
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          <Text style={styles.libraryTitle}>{term}</Text>
          { pmId
            ? <View>
                <Text>{'PubMed ID: ' + pmId}</Text>
                <Text
                  style={styles.url}
                  onPress={() => this._goToPubMed(pmId)}>
                  {'Visit PubMed'}
                </Text>
              </View>
            : null
          }
        </View>
      </View>
    );
  },
  _goToPubMed: function(pmId) {
    this.props.navigator.push({
      name: 'Term View',
      component: WebV,
      configureScene: Navigator.SceneConfigs.FloatFromBottom,
      passProps: { url: 'http://www.ncbi.nlm.nih.gov/pubmed/?term=' + pmId },
      navigationBar: (
        <NavBar
          useXBtn={true}
          hideInfoBtn={true}
        />
      )
    });
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
    fontFamily: fontFamily,
    color: colorUrl,
  },
});

module.exports = LibraryResults;
