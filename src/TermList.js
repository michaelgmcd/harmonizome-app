var React = require('react-native');
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
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          <Text style={styles.libraryTitle}>
            {term}
          </Text>
        </View>
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
