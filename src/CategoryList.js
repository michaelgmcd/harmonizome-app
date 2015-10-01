var React = require('react-native');
var LibraryResults = require('./LibraryResults');
var NavBar = require('./NavBar');
var StyleVars = require('./StyleVars');
var {
  colorBackground,
  colorPrimaryDark,
  colorGray,
  fontFamily,
} = StyleVars;

var {
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
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
        contentContainerStyle={styles.listViewContainer}
        automaticallyAdjustContentInsets={false}
      />
    );
  },
  renderLibraries: function(libObj) {
    var icons = {
      'Cell Types': require('image!cell-types'),
      Crowd: require('image!crowd'),
      'Disease/Drugs': require('image!drugs'),
      Legacy: require('image!legacy'),
      Misc: require('image!misc'),
      Ontologies: require('image!ontologies'),
      Pathways: require('image!pathways'),
      Transcription: require('image!dna'),
    };
    return (
      <View style={styles.rowWrapper}>
        <TouchableHighlight onPress={() => this.goToLibrary(libObj)}>
          <View style={styles.rowInner}>
            { icons[libObj.type]
              ? <Image
                  source={icons[libObj.type]}
                  resizeMode={'contain'}
                  style={styles.optionIcon}
                />
              : null
            }
            <Text style={styles.option}>
              {libObj.type}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
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
    backgroundColor: colorBackground,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  listViewContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: colorBackground,
  },
  option: {
    marginTop: 10,
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionIcon: {
    height: 100,
    width: 100,
  },
  rowWrapper: {
    marginTop: 5,
    height: 155,
    width: 175,
    marginBottom: 5,
  },
  rowInner: {
    borderWidth: 1,
    borderColor: colorPrimaryDark,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 10,
  }
});


module.exports = Results;
