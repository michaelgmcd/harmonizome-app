var React = require('react-native');
var StyleVars = require('./StyleVars');
var {
  colorLightGray,
  colorGray,
  colorBackground,
  fontFamily,
} = StyleVars;

var {
  ListView,
  PixelRatio,
  StyleSheet,
  View,
  Text,
} = React;

var LibraryResults = React.createClass({
  propTypes: {
    results: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      resultsDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };
  },
  componentWillMount: function() {
    this.setState({
      resultsDataSrc: this.state.resultsDataSrc.cloneWithRows(this.props.results)
    });
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.resultsDataSrc}
        renderRow={this.renderResults}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
  renderResults: function(libObj) {
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          <Text style={styles.libraryTitle}>
            {libObj.name}
          </Text>
          <Text style={styles.libraryFormat}>
            Description: {libObj.format}
          </Text>
          {
            libObj.genes.map(function(gene, index) {
              return (
                <Text key={index} style={styles.gene}>{gene}</Text>
              );
            })
          }
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 10,
    backgroundColor: colorLightGray,
  },
  rowWrapper: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
  rowInner: {
    flexDirection: 'column',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: colorGray,
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  libraryTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  libraryType: {

  },
  libraryFormat: {

  },
  gene: {
    fontFamily: fontFamily,
    paddingLeft: 20,
  },
});

module.exports = LibraryResults;
