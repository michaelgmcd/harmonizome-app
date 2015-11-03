var React = require('react-native');
var WebV = require('./WebView');
var NavBar = require('./NavBar');
var libInfo = require('./libInfo');
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
  Navigator,
  PixelRatio,
  StyleSheet,
  View,
  Text,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    library: React.PropTypes.string,
    libraryDesc: React.PropTypes.string,
    terms: React.PropTypes.array
  },
  getInitialState: function() {
    var terms = [{ libraryDesc: this.props.libraryDesc }];
    terms.push.apply(terms, this.props.terms.sort());
    return {
      termsDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }).cloneWithRows(terms),
    };
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
    if (!!term.libraryDesc && term.libraryDesc.length) {
      return (
        <Text style={styles.libraryDesc}>{term.libraryDesc}</Text>
      );
    }
    var idRegEx = /(\d{7,8})/g;
    var geoRegEx = /[Gg][DdSs][EeMmSs]\d{3,7}/;
    var dsId = term.match(idRegEx);
    var geoAccession = term.match(geoRegEx);
    var idName = libInfo[this.props.library].idName;
    var baseUrl = libInfo[this.props.library].baseUrl;
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          <Text style={styles.termTitle}>{term}</Text>
          { geoAccession
            ? <Text>
                <Text>Geo Accession Number: </Text>
                <Text
                  style={styles.url}
                  onPress={() => {
                    var geoUrl = 'http://www.ncbi.nlm.nih.gov/sites/' +
                      'GDSbrowser?acc=' + geoAccession;
                    this._goToUrl(geoUrl);
                  }}>
                  {geoAccession.toString().toUpperCase()}
                </Text>
              </Text>
            : dsId && idName.length && baseUrl.length
            ? <Text>
                <Text>{idName}: </Text>
                <Text
                  style={styles.url}
                  onPress={() => {
                    var dsUrl = baseUrl + dsId;
                    this._goToUrl(dsUrl);
                  }}>
                  {dsId}
                </Text>
              </Text>
            : null
          }
        </View>
      </View>
    );
  },
  _goToUrl: function(url) {
    this.props.navigator.push({
      name: 'Term View',
      component: WebV,
      configureScene: Navigator.SceneConfigs.FloatFromBottom,
      passProps: { url: url },
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
  libraryDesc: {
    padding: 10,
  },
  listView: {
    backgroundColor: colorBackground,
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowWrapper: {
    marginTop: 5,
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
  termTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  gene: {
    fontSize: 13,
    fontFamily: fontFamily,
  },
  url: {
    paddingTop: 8,
    fontFamily: fontFamily,
    color: colorUrl,
  },
});

module.exports = LibraryResults;
