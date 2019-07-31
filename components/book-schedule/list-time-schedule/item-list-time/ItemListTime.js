import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { checkTimeCanBook } from "../../../../helpers/date/formatDate";

function ItemListTime(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.openModal(props.data)} disabled={checkTimeCanBook()}>
      <View
        style={{
          ...styles.listHour,
          marginTop: 15,

          borderColor: checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute)
            ? styles.listHourDisabled.borderColor
            : props.data.count < 1
            ? styles.listHourSuccess.borderColor
            : styles.listHourFail.borderColor
        }}
      >
        <View
          style={[
            styles.textTime,
            props.data.count < 1 ? styles.textTimeSuccess : styles.textTimeFail,
            checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute) ? styles.textTimeDisabled : null
          ]}
        >
          <Text style={{ letterSpacing: 1, color: "white" }}>
            {props.data.hour}:{props.data.minute}
          </Text>
        </View>
        <View style={{ marginLeft: 40 }}>
          <Text style={{ color: checkTimeCanBook(props.datePicker, props.data.hour, props.data.minute) ? "#F4F4F4" : "black" }}>
            Đã có {props.data.count} người đặt
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  listHour: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5
  },
  listHourSuccess: {
    borderColor: "#61d42c"
  },
  listHourFail: {
    borderColor: "#f0473e"
  },
  listHourDisabled: {
    borderColor: "#F4F4F4"
  },
  textTime: {
    width: 70,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  textTimeSuccess: {
    backgroundColor: "#61d42c"
  },
  textTimeFail: {
    backgroundColor: "#f0473e"
  },
  textTimeDisabled: {
    backgroundColor: "#F4F4F4"
  }
});

export default ItemListTime;
