var React = require('react-native');

var {
  StyleSheet,
  WebView,
} = React;

var WebV = React.createClass({

  render: function() {
    return (
      <WebView
        automaticallyAdjustContentInsets={true}
        javaScriptEnabledAndroid={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        style={styles.webView}
        url={this.props.url}
      />
    );
  }
});

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  }
});

module.exports = WebV;
