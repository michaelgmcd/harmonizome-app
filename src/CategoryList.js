var React = require('react-native');
var LibraryList = require('./LibraryList');
var NavBar = require('./NavBar');
var StyleVars = require('./StyleVars');

var {
  colorBackground,
  colorBorderTop,
  colorBorderSide,
  colorBorderBottom,
  colorPrimaryDark,
  colorGray,
  colorGrayDark,
  fontFamily,
} = StyleVars;

var {
  ActivityIndicatorIOS,
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var lastResult = [];
var windowDim = Dimensions.get('window');
var smallHeight = windowDim.width < 325;

var Results = React.createClass({
  propTypes: {
    gene: React.PropTypes.string,
    useLastResult: React.PropTypes.bool,
  },
  getInitialState: function() {
    return {
      networkError: false,
      resultsLoaded: false,
      categoryDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    };
  },
  componentWillMount: function() {
    if (this.props.useLastResult) {
      this.setState({
        resultsLoaded: true,
        categoryDataSrc: this.state.categoryDataSrc.cloneWithRows(lastResult)
      });
    } else {
      this._getGSLibraries(this.props.gene);
    }
  },
  render: function() {
    if (this.state.networkError) {
      return (
        <View style={styles.centerWrapper}>
          <Image
            source={require('image!hazard')}
            resizeMode={'contain'}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>No Network Connection</Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => { this._getGSLibraries(this.props.gene); }}>
            <Text style={styles.bold}>Try Again?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (!this.state.resultsLoaded) {
      return (
        <View style={styles.centerWrapper}>
          <ActivityIndicatorIOS
            animating={true}
            color='#808080'
            size='large' />
        </View>
      );
    } else {
      return (
        <ListView
          dataSource={this.state.categoryDataSrc}
          renderRow={this._renderCategories}
          style={styles.listView}
          contentContainerStyle={styles.listViewContainer}
          automaticallyAdjustContentInsets={false}
        />
      );
    }
  },
  _renderCategories: function(catObj) {
    var icons = {
      'Cell Types': require('image!cell_types'),
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
        <TouchableHighlight onPress={() => this._goToLibraries(catObj)}>
          <View style={styles.rowInner}>
            <Image
                source={icons[catObj.type]}
                resizeMode={'contain'}
                style={styles.optionIcon}
              />
            <Text style={styles.option}>
              {catObj.type}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  _goToLibraries: function(categoryObj) {
    this.props.navigator.push({
      name: 'Library List',
      component: LibraryList,
      passProps: {
        gene: this.props.gene,
        categoryObj: categoryObj
      },
      navigationBar: (
        <NavBar
          gene={this.props.gene}
          category={categoryObj.type}
        />
      )
    });
  },
  _getGSLibraries: function(inputGene) {
    var _this = this;
    var termsUrl = 'http://amp.pharm.mssm.edu/ha-libraries/results?' +
      'gene=' + inputGene;
    fetch(termsUrl)
      .then((tResponse) => tResponse.json())
      .then((response) => {
        lastResult = response;
        _this.setState({
          networkError: false,
          resultsLoaded: true,
          categoryDataSrc: this.state.categoryDataSrc.cloneWithRows(response)
        });
      })
      .catch((err) => {
        console.log(err);
        _this.setState({ networkError: true });
      })
      .done();
  }
});

var styles = StyleSheet.create({
  bold: {
    fontFamily: fontFamily,
    fontWeight: 'bold',
  },
  errorIcon: {
    height: 42,
    width: 60,
  },
  centerWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorButton: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
  },
  errorText: {
    fontFamily: fontFamily,
    marginTop: 5,
  },
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
    width: (windowDim.width - 11) / 2,
    marginBottom: 10,
  },
  rowInner: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  }
});


module.exports = Results;
