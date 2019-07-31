import React, { Component } from "react";
import { AsyncStorage, Platform, View } from "react-native";
import ActionButtonApoint from "./action-button/ActionButtonApoint";
import TabAppointment from "./tab-appointment/TabAppointment";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import BookSchedule from "../book-schedule/BookSchedule";
import moment from "moment";
import appointmentApi from '../../api/appointment-api/appointmentApi';
class Appointment extends Component {
  static navigationOptions = {
      title: "Danh sách lịch hẹn",
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.loadData();
  }
  loadData = async () => {
    let token = await AsyncStorage.getItem("token");
    let idPatient = JSON.parse(token).id;
    // let allAppointment = await appointmentApi.getListAppointmentById(idPatient, 0);
    // let oldAppointment = await appointmentApi.getListAppointmentById(idPatient, 1);
    let allAppointment = await appointmentApi.getListAppointmentById(idPatient);

    let oldAppointment = allAppointment.filter(item => item.state == 1);

    let cancelAppointment = allAppointment.filter(item => {
      return (Date.parse(moment(item.start).format("YYYY/MM/DD")) < new Date().getTime() && (item.state == 0))
    });
    let newAppointment = allAppointment.filter(item => {
      return (Date.parse(moment(item.start).format("YYYY/MM/DD")) > new Date().getTime() && (item.state == 0))
    });
    // if (route == "new") data = newAppointment;
    // if (route == "old") data = oldAppointment;
    // if (route == "cancel") data = cancelAppointment;
    let data = {
      newAppointment,
      oldAppointment,
      cancelAppointment
    }
    this.setState({
      data: data
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EAEAEA" }}>
        <TabAppointment data={this.state.data} />
        <ActionButtonApoint navigation={this.props.navigation} />
      </View>
    );
  }
}

// const AppointmentStack = createStackNavigator(
//   {
//     BookSchedule: {
//       screen: BookSchedule
//     },
//     Appointment: {
//       screen: Appointment,
//       navigationOptions: ({ navigation }) => ({
//         //don't forget parentheses around the object notation
//         title: "Danh sách lịch hẹn",
//         headerLeft: (
//           <HeaderBackButton
//             tintColor="white"
//             onPress={() => {
//               if (navigation.getParam("from") == "book-schedule") {
//                 navigation.navigate("Dashboard");
//               } else {
//                 navigation.goBack(null);
//               }
//             }}
//           />
//         )
//       })
//     }
//   },
//   {
//     initialRouteName: "Appointment",
//     navigationOptions: {
//       header: null
//     },
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#17B890",
//         height: 45,
//         ...Platform.select({
//           android: {
//             shadowColor: "transparent",
//             shadowOpacity: 0,
//             shadowRadius: 0,
//             shadowOffset: {
//               height: 0,
//               width: 0
//             },
//             elevation: 0
//           }
//         })
//       },
//       headerTintColor: "white"
//     }
//   }
// );

// export default AppointmentStack;
export default Appointment;
