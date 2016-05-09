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
  IntentAndroid,
  ListView,
  Navigator,
  PixelRatio,
  StyleSheet,
  View,
  Text,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    libraryName: React.PropTypes.string,
    idName: React.PropTypes.string,
    idRegExp: React.PropTypes.string,
    idRegExpFlag: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    splitChar: React.PropTypes.string,
    useFirstTerm: React.PropTypes.bool,
    useTermName: React.PropTypes.bool,
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
    if (!!term.libraryDesc || term.libraryDesc === '') {
      return <Text style={styles.libraryDesc}>{term.libraryDesc}</Text>;
    }
    var _this = this;
    try {
      var dsId;
      if (this.props.idRegExp && this.props.idRegExp.length) {
        var regex = new RegExp(this.props.idRegExp, 'i');
        dsId = term.match(regex);
      }
      var geoRegEx = /[Gg][DdSs][EeMmSs]\d{3,7}/;
      var splitChar = this.props.splitChar;
      var useFirstTerm = this.props.useFirstTerm;
      var showId = true;
      if (dsId && dsId[0].length > 20) {
        showId = false;
      }
      var geoAccession = term.match(geoRegEx);
      var useTermName = this.props.useTermName || false;
      var idName = this.props.idName || '';
      var baseUrl = this.props.baseUrl || '';
    } catch (e) {
      console.log(e);
      return null;
    }
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
            : useTermName && idName.length && baseUrl.length
            ? <Text>
                <Text>{idName}: </Text>
                <Text
                  style={styles.url}
                  onPress={() => {
                    var dsUrl = baseUrl + term;
                    this._goToUrl(dsUrl);
                  }}>
                  {term}
                </Text>
              </Text>
            : dsId && idName.length && baseUrl.length
            ? <Text>
                {
                  showId
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
                  : <Text
                      style={styles.url}
                      onPress={() => {
                        var dsUrl = baseUrl + dsId;
                        this._goToUrl(dsUrl);
                      }}>
                      {idName}
                    </Text>
                }
              </Text>
            : useFirstTerm && splitChar.length
            ? <Text>
                <Text>{idName}: </Text>
                <Text
                  style={styles.url}
                  onPress={() => {
                    var dsUrl = baseUrl + term.split(splitChar)[0];
                    this._goToUrl(dsUrl);
                  }}>
                  {term.split(splitChar)[0]}
                </Text>
              </Text>
            : null
          }
        </View>
      </View>
    );
  },
  _goToUrl: function(url) {
    if (this.props.os === 'android') {
      IntentAndroid.canOpenURL(url, (supported) => {
        if (supported) {
          IntentAndroid.openURL(url);
        }
        console.log('Don\'t know how to open URI: ' + this.props.url);
      });
    } else {
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
  }
});

var styles = StyleSheet.create({
  libraryDesc: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 0,
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
