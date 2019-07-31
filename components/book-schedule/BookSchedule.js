import React from "react";
import { View, ActivityIndicator } from "react-native";
import Calendar from "./calendar/Calendar";
import ListTimeSchedule from "./list-time-schedule/ListTimeSchedule";
import { ScheduleApi } from "../../api/schedule-api/scheduleApi";
import { addDate } from "../../helpers/date/formatDate";
import RoomDoctor from "./room-doctor/RoomDoctor";

class BookSchedule extends React.Component {
  static navigationOptions = {
    title: "Đặt lịch"
  };
  constructor(props) {
    super(props);
    this.state = {
      datePicker: new Date(),
      listCountSchedule: [],
      rooms: [],
      roomSelect: {},
      doctorSelect: {},
      isLoading: true,
      zoomOut: false
    };
  }

  countPatientFormTimeSchedule = (hour, listSchedule) => {
    let countWithHour = [{ hour, minute: "00", count: 0 }, { hour, minute: "30", count: 0 }];
    listSchedule.forEach(schedule => {
      let time = new Date(schedule.start);

      if (time.getHours() - 7 == hour && time.getMinutes() < 30) {
        countWithHour[0].count++;
      }
      if (time.getHours() - 7 == hour && time.getMinutes() >= 30) {
        countWithHour[1].count++;
      }
    });
    return countWithHour;
  };

  updateDatePicker = async date => {
    let nextDate = addDate(date, 1);
    let from = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let to = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}-${nextDate.getDate()}`;

    let listSchedule = await ScheduleApi.getScheduleByDate(from, to, -1);
    let listCountSchedule = [];
    for (let i = 7; i < 18; i++) {
      listCountSchedule = [...listCountSchedule, ...this.countPatientFormTimeSchedule(i, listSchedule.data)];
    }
    let rooms = await ScheduleApi.getRoom();

    this.setState({
      datePicker: date,
      listCountSchedule: listCountSchedule,
      rooms: rooms.data,
      isLoading: false
    });
  };

  handleGetRoom = room => {
    this.setState({
      roomSelect: { id: room.Id, name: room.Name }
    });
  };
  handleGetDoctor = doctor => {
    this.setState({
      doctorSelect: { id: doctor.id, name: doctor.name }
    });
  };

  handleScrollListTime = offsetY => {
    if (offsetY > 100 && !this.state.zoomOut) {
      this.setState({ zoomOut: true });
    }
    if (offsetY < 100 && this.state.zoomOut) {
      this.setState({ zoomOut: false });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
        <Calendar updateDatePicker={this.updateDatePicker} zoomOut={this.state.zoomOut} />

        {this.state.isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 50
            }}
          >
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <>
            <RoomDoctor
              rooms={this.state.rooms}
              getRoom={this.handleGetRoom}
              getDoctor={this.handleGetDoctor}
              zoomOut={this.state.zoomOut}
            />
            <ListTimeSchedule
              navigation={this.props.navigation}
              date={this.state.datePicker}
              room={this.state.roomSelect}
              doctor={this.state.doctorSelect}
              datePicker={this.state.datePicker}
              listCountSchedule={this.state.listCountSchedule}
              scrollListTime={this.handleScrollListTime}
            />
          </>
        )}
      </View>
    );
  }
}

export default BookSchedule;
