var React = require('react-native');
var {
  ActivityIndicatorIOS,
  Dimensions,
  LinkingIOS,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var StyleVars = require('./StyleVars');
var {
  colorGray,
  colorLightGray,
  colorTeal,
  colorUrl,
  fontFamily,
} = StyleVars;

var Button = require('./Button');

var BGWASH = 'rgba(255,255,255,0.8)';
var windowDim = Dimensions.get('window');

var GeneModal = React.createClass({
  propTypes: {
    gene: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func,
  },
  getInitialState: function() {
    return {
      resultsLoaded: false,
      resultsFound: true,
      geneModalDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      geneSymbol: '',
    };
  },
  componentWillReceiveProps(newProps) {
    this._getGeneInfo(newProps.gene);
  },
  componentDidMount: function() {
    this._getGeneInfo(this.props.gene);
  },
  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    var tranparentStyle = { backgroundColor: '#fff', padding: 20 };
    return (
      <View style={[styles.container, modalBackgroundStyle]}>
        <View style={[styles.innerContainer, tranparentStyle]}>
          { this.state.resultsLoaded && this.state.resultsFound
            ? <View>
                <View style={styles.title}>
                  <Text style={styles.innerTitle}>{this.state.geneSymbol}</Text>
                </View>
                <ListView
                  dataSource={this.state.geneModalDataSrc}
                  renderRow={this._renderInfo}
                  style={styles.listView}
                  automaticallyAdjustContentInsets={false}
                />
              </View>
            : this.state.resultsLoaded
            ? <View>
                <View style={styles.title}>
                  <Text style={styles.innerTitle}>{this.props.gene}</Text>
                </View>
                <View style={styles.infoPlaceholder}>
                  <Text style={styles.text}>
                    Sorry, additional information for this gene is
                    currently not available.
                  </Text>
                </View>
              </View>
            : <View>
                <View style={styles.title}>
                  <Text style={styles.innerTitle}>{this.props.gene}</Text>
                </View>
                <View style={styles.infoPlaceholder}>
                  <ActivityIndicatorIOS size="large" />
                </View>
              </View>
          }
          <Button
            onPress={() => { this.props.onClose(); }}
            style={styles.modalButton}>
            <Text style={styles.buttonText}>Close</Text>
          </Button>
        </View>
      </View>
    );
  },
  _renderInfo: function(infoObj) {
    var rowTitle = infoObj.title || '';
    var rowContent = infoObj.content;
    return (
      <View>
        { rowContent.length
          ? <View style={styles.row}>
              <Text style={[styles.innerRow, styles.bold]}>{rowTitle}</Text>
              { infoObj.containsUrl
                ? <Text
                    style={[styles.innerRow, styles.url]}
                    onPress={() => LinkingIOS.openURL(rowContent)}>
                    {rowContent}
                  </Text>
                : <Text style={styles.innerRow}>{rowContent}</Text>
              }
            </View>
          : <View></View>
        }
      </View>
    );
  },
  _getGeneInfo: function(inputGene) {
    var _this = this;
    var geneApi = 'http://amp.pharm.mssm.edu/Harmonizome/api/1.0/gene/' +
      inputGene + '?min=true';
    fetch(geneApi)
      .then((response) => response.json())
      .then((resp) => {
        var info = [
          {
            title: 'Synonyms',
            content: resp.synonyms.join(',') || '',
          },
          {
            title: 'Full Name',
            content: resp.name || '',
          },
          {
            title: 'Description',
            content: resp.description || '',
          },
          {
            title: 'NCBI Entrez Gene ID',
            content: resp.ncbiEntrezGeneId.toString() || '',
          },
          {
            title: 'NCBI Entrez Gene URL',
            content: resp.ncbiEntrezGeneUrl || '',
            containsUrl: true,
          }
        ];
        if (resp.status !== 404) {
          _this.setState({
            geneSymbol: resp.symbol || _this.props.gene,
            geneModalDataSrc: this.state.geneModalDataSrc.cloneWithRows(info),
            resultsLoaded: true,
          });
        } else {
          _this.setState({
            resultsFound: false,
            resultsLoaded: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .done();
  }
});

var MODAL_PADDING = 20;
var LISTVIEW_HEIGHT = windowDim.height - MODAL_PADDING * 12;
var LISTVIEW_WIDTH = windowDim.width - MODAL_PADDING * 3;

var styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontFamily: fontFamily,
  },
  container: {
    flex: 1,
    position: 'absolute',
    height: windowDim.height,
    width: windowDim.width,
    top: 0,
    left: 0,
    padding: MODAL_PADDING,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  innerTitle: {
    fontFamily: fontFamily,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  innerRow: {
    fontSize: 14,
    fontFamily: fontFamily,
  },
  listView: {
    height: LISTVIEW_HEIGHT,
    width: LISTVIEW_WIDTH,
  },
  modalButton: {
    width: LISTVIEW_WIDTH,
    backgroundColor: colorTeal,
    marginTop: 10,
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: colorLightGray,
    paddingTop: 5,
    paddingBottom: 5,
  },
  infoPlaceholder: {
    alignItems: 'center',
    height: LISTVIEW_HEIGHT,
    width: LISTVIEW_WIDTH,
    marginLeft: 10,
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontFamily,
  },
  title: {
    width: windowDim.width - MODAL_PADDING * 2,
    borderBottomWidth: 1,
    borderColor: colorGray,
    paddingBottom: 10,
  },
  url: {
    color: colorUrl,
  }
});

module.exports = GeneModal;
