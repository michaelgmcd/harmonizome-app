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
  colorSecondary,
} = StyleVars;

var Button = React.createClass({
  getInitialState: function() {
    return {
      active: false,
    };
  },
  _onHighlight: function() {
    this.setState({active: true});
  },

  _onUnhighlight: function() {
    this.setState({active: false});
  },

  render: function() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor={colorSecondary}>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fontFamily,
    margin: 5,
    textAlign: 'center',
  },
});

module.exports = Button;
