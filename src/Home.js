var React = require('react-native');
var {Icon,} = require('react-native-icons');
var recentSearches = require('./recentSearches');
var AutoComplete = require('./Autocomplete');
var CategoryList = require('./CategoryList');
var NavBar = require('./NavBar');
var StyleVars = require('./StyleVars');

var {
  colorPrimary,
  colorPrimaryDark,
  colorBackground,
  colorGray,
  colorDarkGray,
  colorLightGray,
  fontFamily,
  titleFont,
} = StyleVars;

var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var home = React.createClass({
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
                source={require('image!logo-lg')}
                resizeMode={'contain'}
                style={styles.titleIcon}
              />
              <Text style={styles.title}>
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
            { shadowOpacity: this.state.atHome ? 0 : .8 },
          ]}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            clearButtonMode={'always'}
            returnKeyType={'search'}
            style={[
              styles.searchBar,
              { shadowOpacity: this.state.atHome ? .8 : 0 },
            ]}
            onChangeText={(input) => {
              this.setState({
                atHome: false,
                input: input,
              });
            }}
            onSubmitEditing={() => {
              this._goToResults(this.state.input);
            }}
            value={this.state.input}
            placeholder={'Search...'}
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
                this._goToResults(selectedGene);
              }}
            />
          :
            <View></View>
        }
      </View>
    );
  },
  _goToResults: function(inputGene) {
    var _this = this;
    this.props.navigator.push({
      name: 'CategoryList',
      component: CategoryList,
      passProps: { gene: inputGene },
      navigationBar: (
        <NavBar
          gene={inputGene}
          onBack={() => {
            _this.props.navigator.popToTop();
          }}
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
    paddingTop: 20,
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
    fontFamily: titleFont,
    fontSize: 36,
    textAlign: 'center',
  },
  titleIcon: {
    width: 100,
    marginBottom: 10,
  },
  searchContainer: {
    borderColor: colorGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  },
  searchBar: {
    flex: 4,
    fontFamily: fontFamily,
    marginTop: 5,
    paddingLeft: 5,
    height: 40,
    backgroundColor: 'white',
    shadowColor: colorDarkGray,
    shadowOffset: { width: 0, height: 0 },
  }
});

module.exports = home;
