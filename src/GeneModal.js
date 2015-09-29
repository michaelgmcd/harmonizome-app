var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Modal,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var StyleVars = require('./StyleVars');
var {
  colorLightGray,
  colorSecondary,
  fontFamily,
} = StyleVars;

var Button = require('./Button');

var BGWASH = 'rgba(255,255,255,0.8)';

var GeneModal = React.createClass({
  propTypes: {
    animated: React.PropTypes.bool,
    modalVisible: React.PropTypes.bool,
    transparent: React.PropTypes.bool,
    gene: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      animated: false,
      modalVisible: false,
      transparent: true,
    };
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
    console.log(newProps);
    this._getGeneInfo();
  },
  componentDidMount: function() {
    console.log(this.props);
    this._getGeneInfo();
  },
  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.props.transparent ? 'rgba(0, 0, 0, 0.5)' : 'white',
    };
    var innerContainerTransparentStyle = this.props.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <View>
        <Modal
          animated={this.props.animated}
          transparent={this.props.transparent}
          visible={this.props.modalVisible}>
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
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
                ? <View style={styles.title}>
                      <Text style={styles.innerTitle}>{this.props.gene}</Text>
                      <Text>
                        Sorry, additional information for this gene is not available
                      </Text>
                    </View>
                : <View>
                    <View style={styles.title}>
                      <Text style={styles.innerTitle}>{this.props.gene}</Text>
                    </View>
                    <View style={styles.spinner}>
                      <ActivityIndicatorIOS size="large" />
                    </View>
                  </View>
              }
              <Button
                onPress={() => {
                  this.props.onClose();
                }}
                style={styles.modalButton}>
                <Text style={styles.buttonText}>Close</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
  _renderInfo: function(infoObj) {
    var rowTitle = infoObj.title || '';
    var rowContent = infoObj.content instanceof Array
    ? infoObj.content.join(', ')
    : infoObj.content;
    return (
      <View>
        { rowContent.length
          ? <View style={styles.row}>
              <Text style={[styles.innerRow, styles.bold]}>{rowTitle}</Text>
              <Text style={styles.innerRow}>{rowContent}</Text>
            </View>
          : <View></View>
        }
      </View>
    );
  },
  _getGeneInfo: function() {
    var _this = this;
    var geneApi = 'http://amp.pharm.mssm.edu/Harmonizome/api/1.0/gene/' +
      this.props.gene;
    fetch(geneApi)
      .then((response) => response.json())
      .then((resp) => {
        var info = [
          {
            title: 'Synonyms',
            content: resp.synonyms || [],
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
            content: resp.ncbiEntrezGeneId || '',
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

var LISTVIEW_HEIGHT = 300;

var styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  innerTitle: {
    fontFamily: fontFamily,
    fontSize: 18,
    textAlign: 'center',
  },
  innerRow: {
    fontSize: 14,
    fontFamily: fontFamily,
  },
  listView: {
    height: LISTVIEW_HEIGHT,
  },
  modalButton: {
    backgroundColor: colorSecondary,
    marginTop: 10,
  },
  row: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: colorLightGray,
    marginBottom: 5,
    paddingBottom: 5,
  },
  spinner: {
    alignItems: 'center',
    height: LISTVIEW_HEIGHT,
    justifyContent: 'center',
  },
  title: {
    borderBottomWidth: 1,
    borderColor: colorLightGray,
    marginBottom: 5,
    paddingBottom: 5,
  },
});

module.exports = GeneModal;
