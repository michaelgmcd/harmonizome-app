var React = require('react-native');
var {Icon,} = require('react-native-icons');
var recentSearches = require('./recentSearches');
var StyleVars = require('./StyleVars');
var {
  colorPrimary,
  colorPrimaryDark,
  colorBackground,
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

var autocomplete = React.createClass({
  propTypes: {
    input: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      autocompleteOptions: [],
      geneDataSrc: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },
  componentWillReceiveProps: function(newProps) {
    this.findGenes(newProps.input);
  },
  componentWillMount: function() {
    this.findGenes(this.props.input);
  },
  render: function() {
    var numOpts = this.state.autocompleteOptions.length;
    return (
      <View
        style={[
          styles.listViewContainer,
          { height: numOpts > 4 ? 5 * 45.5 : numOpts * 45.5 },
        ]}>
        <ListView
          dataSource={this.state.geneDataSrc}
          renderRow={this.renderGenes}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  },
  renderGenes: function(geneObj) {
    // Make matched section of string bold by spliting it.
    // Don't need to worry about invalid input here because input is already
    // checked when geneObj is generated
    var inpRegEx = new RegExp(this.props.input, 'i');;
    var options = geneObj.option.split(inpRegEx);;
    var matchExists = options.length === 2 && !!options[0] || !!options[1];

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
            : <Text style={styles.option}>
                {geneObj.option}
              </Text>
          }
          { geneObj.recent
            ? <Icon
                name='foundation|clock'
                size={25}
                color={colorLightGray}
                style={styles.searchIcon}
              />
            : <Icon
                name='foundation|arrow-right'
                size={25}
                color={colorLightGray}
                style={styles.searchIcon}
              />
          }
        </View>
      </TouchableHighlight>
    );
  },
  findGenes: function(input) {
    // Possibly change this to database queries for speed instead of
    // downloading all genes and iterating/filtering
    var _this = this;
    var reqApi = 'http://amp.pharm.mssm.edu/Enrichr/json/' +
      'genemap.json?_=1442798351897';
    var inpRegEx;
    try {
      inpRegEx = new RegExp(input, 'i');
    } catch(e) {
      console.log(e);
    }
    if (inpRegEx) {
      fetch(reqApi)
        .then((response) => response.json())
        .then((resp) => {
          var acOptions = [];
          var recent = recentSearches.getSearches();
          // Iterate backwards to get most recent searches first
          for (var i = recent.length; i === 0, i--;) {
            if (!input.length ||
              inpRegEx.test(recent[i]) && acOptions.length < 3) {
              var option = {
                option: recent[i],
                recent: true,
              };
              acOptions.push(option);
            }
          }
          resp.forEach(function(gene) {
            if (inpRegEx.test(gene) && input.length && acOptions.length < 6) {
              var option = {
                option: gene,
                recent: false,
              };
              acOptions.push(option);
            }
          });
          _this.setState({
            autocompleteOptions: acOptions,
            geneDataSrc: this.state.geneDataSrc.cloneWithRows(acOptions)
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .done();
    }
  }

});

var styles = StyleSheet.create({
  listViewContainer: {
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colorGray,
    shadowColor: colorPrimaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .8,
  },
  iconPlaceholder: {
    flex: 1,
    height: 25,
  },
  option: {
    flex: 4,
    fontFamily: fontFamily,
  },
  subOption: {
    fontFamily: fontFamily,
  },
  subOptionHighlight: {
    fontWeight: 'bold',
    fontFamily: fontFamily,
  },
  rowInner: {
    borderTopWidth: 0,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: colorGray,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchIcon: {
    textAlign: 'right',
    flex: 1,
    height: 25,
    width: 25,
  }
});

module.exports = autocomplete;
