var React = require('react-native');
var {
  Modal,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var StyleVars = require('./StyleVars');
var {
  fontFamily,
  colorLightGray,
} = StyleVars;

var Button = require('./Button');

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
      symbol: '',
      synonyms: [],
      name: '',
      description: '',
      entrezId: 0,
      entrezUrl: '',
    };
  },
  componentDidMount: function() {
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
      <Modal
        animated={this.props.animated}
        transparent={this.props.transparent}
        visible={this.props.modalVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text style={styles.innerTitle}>{this.state.symbol}</Text>
            <Text style={styles.innerRow}>{this.state.synonyms.join(', ')}</Text>
            <Text style={styles.innerRow}>Full Name: {this.state.geneFullName}</Text>
            <Text style={styles.innerRow}>Description: {this.state.geneDesc}</Text>
            <Text style={styles.innerRow}>NCBI Entrez GeneID: {this.state.entrezId}</Text>
            <Button
              onPress={() => {
                this.props.onClose();
              }}
              style={styles.modalButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    );
  },
  _getGeneInfo: function() {
    var _this = this;
    var geneApi = 'http://amp.pharm.mssm.edu/Harmonizome/api/1.0/gene/' +
      this.props.gene;
    fetch(geneApi)
      .then((response) => response.json())
      .then((resp) => {
        _this.setState({
          symbol: resp.symbol,
          synonyms: resp.synonyms,
          name: resp.name,
          description: resp.description,
          entrezId: resp.ncbiEntrezGeneId,
          entrezUrl: resp.ncbiEntrezGeneUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .done();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  innerTitle: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: colorLightGray,
    fontSize: 18,
    fontFamily: fontFamily,
    paddingBottom: 5,
    marginBottom: 5
  },
  innerRow: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: colorLightGray,
    fontSize: 14,
    fontFamily: fontFamily,
    paddingBottom: 5,
    marginBottom: 5
  },
  modalButton: {
    marginTop: 10,
  },
});

module.exports = GeneModal;
