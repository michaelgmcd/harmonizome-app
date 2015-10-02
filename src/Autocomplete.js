var React = require('react-native');
var {Icon,} = require('react-native-icons');
var recentSearches = require('./recentSearches');
var StyleVars = require('./StyleVars');
var {
  colorBorderSide,
  colorOrange,
  colorPrimary,
  colorPrimaryDark,
  colorBackground,
  colorDarkGray,
  colorLightGray,
  colorGray,
  fontFamily,
} = StyleVars;

var {
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var AutoComplete = React.createClass({
  propTypes: {
    input: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      networkError: false,
      autocompleteOptions: [],
      geneDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },
  componentWillReceiveProps: function(newProps) {
    this._matchGenes(newProps.input);
  },
  componentWillMount: function() {
    this._matchGenes(this.props.input);
  },
  render: function() {
    var _this = this;
    var numOpts = this.state.networkError
      ? 1
      : this.state.autocompleteOptions.length;
    if (this.state.networkError) {
      return (
        <View style={styles.listViewContainer}>
          <TouchableHighlight
            onPress={() => this._matchGenes(this.props.input)}
            style={styles.rowWrapper}>
            <View style={styles.rowInner}>
              <Text style={[styles.option, styles.error]}>
                You are not connected to the internet.
                <Text style={styles.bold}> Try again?</Text>
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={[
          styles.listViewContainer,
          { height: numOpts > 4 ? 5 * 45 : numOpts * 45 }]}>
          <ListView
            dataSource={this.state.geneDataSrc}
            renderRow={this._renderGenes}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      );
    }
  },
  _renderGenes: function(geneObj) {
    // Make matched section of string bold by spliting it.
    // Don't need to worry about invalid input here because input is already
    // checked when geneObj is generated
    var inpRegEx = new RegExp(this.props.input, 'i');
    var options = geneObj.option.split(inpRegEx);
    var matchExists = options.length === 2 && (!!options[0] || !!options[1]);
    var perfectMatch = options.length === 2 && !options[0] && !options[1];

    return (
      <TouchableHighlight
        onPress={() => this.props.onSelect(geneObj.option)}
        style={styles.rowWrapper}>
        <View style={styles.rowInner}>
          { matchExists
            ? <Text style={styles.option}>
                <Text style={styles.subOption}>
                  {options[0]}
                </Text>
                <Text style={styles.subOptionHighlight}>
                  {this.props.input.toUpperCase()}
                </Text>
                <Text style={styles.subOption}>
                  {options[1]}
                </Text>
              </Text>
            : perfectMatch
            ? <Text style={styles.option}>
                <Text style={styles.subOptionHighlight}>
                  {this.props.input.toUpperCase()}
                </Text>
              </Text>
            : <Text style={styles.option}>
                {geneObj.option}
              </Text>
          }
          { geneObj.recent
            ? <Icon
                name='foundation|clock'
                size={25}
                color={colorGray}
                style={styles.searchIcon}
              />
            : <Icon
                name='foundation|arrow-right'
                size={25}
                color={colorGray}
                style={styles.searchIcon}
              />
          }
        </View>
      </TouchableHighlight>
    );
  },
  _matchGenes: function(input) {
    var _this = this;
    var reqApi = 'http://amp.pharm.mssm.edu/Enrichr/json/' +
      'genemap.json?_=1442798351897';
    var inpRegEx;
    try {
      inpRegEx = new RegExp(input, 'i');
    } catch(e) {
      console.log(e);
    }
    var acOptions = [];
    var names = [];
    var recent = recentSearches.getSearches();
    // Iterate backwards to get most recent searches first
    for (var i = recent.length; i === 0, i--;) {
      // If empty string, or recent search matches and there are no more than
      // two recent searches already added.
      if (!input.length || inpRegEx.test(recent[i]) && acOptions.length < 3) {
        var option = {
          option: recent[i],
          recent: true,
        };
        acOptions.push(option);
        names.push(recent[i]);
      }
    }
    fetch(reqApi)
      .then((response) => response.json())
      .then((genes) => {
        var maxResults = 6;
        for (var i = 0; i < genes.length; i++) {
          var gene = genes[i];
          // If gene matches input, input is not empty, there are no more than 6
          // options already, and gene is not already an option (recent search)
          if (inpRegEx.test(gene) && input.length && names.indexOf(gene) === -1) {
            var option = {
              option: gene,
              recent: false,
            };
            acOptions.push(option);
          }
          // Break if maxResults reached
          if (acOptions.length === maxResults) {
            break;
          }
        }
        _this.setState({
          networkError: false,
          autocompleteOptions: acOptions,
          geneDataSrc: _this.state.geneDataSrc.cloneWithRows(acOptions)
        });
      })
      .catch((err) => {
        console.log(err);
        _this.setState({
          networkError: true,
          autocompleteOptions: acOptions,
          geneDataSrc: _this.state.geneDataSrc.cloneWithRows(acOptions)
        });
      })
      .done();
  }

});

var styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  error: {
    color: colorOrange,
  },
  listViewContainer: {
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colorBorderSide,
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .8,
  },
  iconPlaceholder: {
    height: 25,
  },
  option: {
    color: '#919191',
    fontFamily: fontFamily,
  },
  subOption: {
    color: 'black',
    fontFamily: fontFamily,
  },
  subOptionHighlight: {
    fontFamily: fontFamily,
  },
  rowInner: {
    borderTopWidth: 0,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: colorGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowWrapper: {
  },
  searchIcon: {
    textAlign: 'right',
    height: 25,
    width: 25,
  }
});

module.exports = AutoComplete;
