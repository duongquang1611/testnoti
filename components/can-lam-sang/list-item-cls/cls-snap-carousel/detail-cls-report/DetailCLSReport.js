import React, { Component } from "react";
import { Platform, StyleSheet, View, WebView, Dimensions } from "react-native";
import { cutScript } from "../../../../../helpers/cutScript/cutScript";
export default class DetailClsReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { htmlContent } = this.props;
    const { height, width } = Dimensions.get('window');
    htmlContent = cutScript(htmlContent);
    // htmlContent = "https://api.instagram.com/oauth/authorize/?client_id={CLIENT_ID}e&redirect_uri=https://www.google.com&response_type=token";
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
        <WebView
          style={styles.container}
          startInLoadingState={true}
          scalesPageToFit={false}
          injectedJavaScript={
            Platform.OS === "ios"
              ? (width > height)
                ? `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = "scaleX(0.73)translateX(-125px)"`
                : `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(150px)scaleX(1.2)'`
              : (width < height)
                ? `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(10px)'`
                : `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.38, maximum-scale=1, user-scalable=2'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);document.getElementsByTagName('body')[0].style.transform = 'translateX(30px)'`
          }
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={Platform.OS === "ios" ? { html: htmlContent } : { html: htmlContent, baseUrl: "" }}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.1 }]
  },

});
