import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, ActivityIndicator } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
// import Medicine from './share/modal-healthy-book/medicine/Medicine'
class App extends Component {
  constructor(props) {
    super(props);
    this.loadInitialData();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="green" size="large" />
      </View>
      // <Medicine />
    );
  }

  loadInitialData = async () => {
    let tokenS = await AsyncStorage.getItem("token");
    const tokenO = await JSON.parse(tokenS);
    // console.log(new Date(tokenO[".expires"]))
    var tomorow = new Date();
    tomorow.setDate(tomorow.getDate() + 1);
    if (tokenO != null && tomorow < new Date(tokenO[".expires"])) {
      let times = await AsyncStorage.getItem("times");
      await AsyncStorage.setItem("times", `${parseInt(times) + 1}`);
      this.props.navigation.navigate("Dashboard");
    } else {
      this.props.navigation.navigate("Login");
    }
    this.props.navigation.navigate(tokenO !== null && tomorow < new Date(tokenO[".expires"]) ? "Dashboard" : "Login");
  };
}

// const LoginStack = createStackNavigator(
//   {
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         header: null
//       }
//     }
//   }
// )

// const DashboardStack = createStackNavigator(
//   {
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         header: null
//       }
//     }
//   }
// )

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: App,
      Dashboard: Dashboard,
      Login: Login
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
