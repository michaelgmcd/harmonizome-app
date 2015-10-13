var React = require('react-native');
var {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var StyleVars = require('./StyleVars');
var {
  fontFamily,
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
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableOpacity>
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
