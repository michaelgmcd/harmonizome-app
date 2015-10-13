var React = require('react-native');
var {Icon,} = require('react-native-icons');
var recentSearches = require('./recentSearches');
var AutoComplete = require('./Autocomplete');
var CategoryList = require('./CategoryList');
var NavBar = require('./NavBar');
var StyleVars = require('./StyleVars');

var {
  colorBorderSide,
  colorBorderTop,
  colorBorderBottom,
  colorPrimary,
  colorPrimaryDark,
  colorBackground,
  colorGray,
  colorDarkGray,
  colorLightGray,
  fontFamily,
  titleFontIOS,
  titleFontAndroid,
} = StyleVars;

var {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var windowDim = Dimensions.get('window');
var smallScreen = windowDim.height < 500;

var Home = React.createClass({
  getInitialState: function() {
    return {
      input: '',
      atHome: true
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        { this.state.atHome ?
            <View style={styles.titleContainer}>
              <Image
                source={require('image!logo_lg')}
                resizeMode={'contain'}
                style={styles.titleIcon}
              />
              <Text style={[
                styles.title,
                { fontFamily: this.props.os === 'ios'
                  ? titleFontIOS
                  : titleFontAndroid}
              ]}>
                Harmonizome
              </Text>
            </View>
          :
            <View></View>
        }
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: this.state.atHome ? colorBackground : 'white' },
            { borderWidth: this.state.atHome ? 0 : 1 },
            { flex: this.state.atHome ? 1 : 0 },
            { alignItems: this.state.atHome ? 'flex-start' : 'center' },
            { shadowOpacity: this.state.atHome ? 0 : .8 },
          ]}>
          <TextInput
            ref="geneSearchBar"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            returnKeyType="done"
            style={[
              styles.searchBar,
              { shadowOpacity: this.state.atHome ? .8 : 0 },
            ]}
            onFocus={() => {
              if (smallScreen) {
                this.setState({
                  atHome: false,
                });
              }
            }}
            onChangeText={(input) => {
              this.setState({
                atHome: false,
                input: input,
              });
            }}
            onSubmitEditing={() => {}}
            value={this.state.input}
            placeholder={'Enter Entrez gene symbol, e.g. STAT3...'}
          />
          { !this.state.atHome ?
              <Text
                onPress={() => {
                  this.setState({
                    atHome: true,
                    input: '',
                  });
                }}
                style={styles.cancel}
              >
                Cancel
              </Text>
            :
              <View style={styles.cancelPlaceholder}></View>
          }
        </View>
        { !this.state.atHome ?
            <AutoComplete
              input={this.state.input}
              onSelect={(selectedGene) => {
                this._goToCategories(selectedGene);
              }}
            />
          :
            <View></View>
        }
      </View>
    );
  },
  _goToCategories: function(inputGene) {
    this.refs.geneSearchBar.blur();
    this.props.navigator.push({
      name: 'CategoryList',
      component: CategoryList,
      passProps: { gene: inputGene },
      navigationBar: (
        <NavBar
          gene={inputGene}
        />
      )
    });
    recentSearches.addSearch(inputGene);
  }
});

var styles = StyleSheet.create({
  cancel: {
    color: colorPrimary,
    fontSize: 16,
    fontFamily: fontFamily,
    textAlign: 'center',
    flex: 1,
  },
  cancelPlaceholder: {
    width: 10,
  },
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: colorBackground
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colorPrimary,
    fontSize: 36,
    textAlign: 'center',
  },
  titleIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  searchContainer: {
    borderColor: colorBorderSide,
    borderTopColor: colorBorderTop,
    borderBottomColor: colorBorderBottom,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  },
  searchBar: {
    flex: 3,
    fontFamily: fontFamily,
    marginTop: 5,
    paddingLeft: 15,
    height: 40,
    backgroundColor: 'white',
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  }
});

module.exports = Home;
