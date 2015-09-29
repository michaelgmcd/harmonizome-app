var React = require('react-native');
var LibraryResults = require('./LibraryResults');
var NavBar = require('./NavBar');
var StyleVars = require('./StyleVars');
var {
  colorBackground,
  colorLightGray,
  colorGray,
  fontFamily,
} = StyleVars;

var {
  ListView,
  PixelRatio,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
  Text,
} = React;

var Results = React.createClass({
  propTypes: {
    gene: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      libraryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };
  },
  componentWillMount: function() {
    this.getLibraries(this.props.gene);
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.libraryDataSrc}
        renderRow={this.renderLibraries}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
  renderLibraries: function(libObj) {
    return (
      <TouchableHighlight
        onPress={() => this.goToLibrary(libObj)}
        style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          <Text style={styles.option}>
            {libObj.type}
          </Text>
        </View>
      </TouchableHighlight>
    );
  },
  goToLibrary: function(categoryObj) {
    var _this = this;
    this.props.navigator.push({
      name: 'LibraryResults',
      component: LibraryResults,
      passProps: { results: categoryObj.libraries },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={categoryObj.type}
          onBack={() => {
            _this.props.navigator.pop();
          }}
        />
      )
    });
  },
  getLibraries: function(inputGene) {
    var _this = this;
    var resultsApi = 'http://amp.pharm.mssm.edu/Enrichr/genemap?gene=' +
      inputGene + '&setup=true&json=true&_=1442611548980';
    fetch(resultsApi)
      .then((response) => response.json())
      .then((resp) => {
        // Transform response object to array of objects with keys as values in
        // object
        var data = [];
        resp.categories.forEach(function(catObj) {
          var newLib = {
            type: catObj.name,
            libraries: []
          };
          catObj.libraries.forEach(function(categoryObj) {
            for (var libraryName in resp.gene) {
              if (resp.gene.hasOwnProperty(libraryName)) {
                if (categoryObj.name === libraryName) {
                  var name = libraryName.replace(/_/g, ' ');
                  var format = categoryObj.format
                    .replace(/\{1\}/, 'each of the following')
                    .replace(/\{0\}/, _this.props.gene);
                  categoryObj.name = name;
                  categoryObj.genes = resp.gene[libraryName];
                  categoryObj.format = format;
                  newLib.libraries.push(categoryObj);
                }
              }
            }
          });
          if (newLib.libraries.length) {
            data.push(newLib);
          }
        });
        _this.setState({
          libraryDataSrc: this.state.libraryDataSrc.cloneWithRows(data)
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .done();
  }
});

var styles = StyleSheet.create({
  listView: {
    flex: 10,
    backgroundColor: colorLightGray,
  },
  option: {
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowWrapper: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  rowInner: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: colorGray,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30,
  }
});


module.exports = Results;
