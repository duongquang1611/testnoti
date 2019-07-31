import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Entypo } from "@expo/vector-icons";

function RoomDoctor(props) {
  const { width, height } = Dimensions.get("window");
  const scrollDoctorRef = useRef(null);
  const [activeDoctor, setActiveDoctor] = useState(0);
  const [doctor, setDoctor] = useState({});
  const [offsetScroll, setOffsetScroll] = useState(0);
  const [roomSelect, setRoomSelect] = useState({});
  const [animationHeight, setAnimationHeight] = useState(new Animated.Value(95));
  const [animationScale, setAnimationScale] = useState(new Animated.Value(1));

  useEffect(
    () => {
      if (props.zoomOut) {
        Animated.parallel([
          Animated.timing(animationScale, { toValue: 0.01, duration: 100 }),
          Animated.timing(animationHeight, { toValue: 0.01, duration: 300 })
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(animationScale, { toValue: 1, duration: 100 }),
          Animated.timing(animationHeight, { toValue: 95, duration: 100 })
        ]).start();
      }
    },
    [props.zoomOut]
  );

  handleOnScrollDoctor = offsetX => {
    setOffsetScroll(offsetX.x);
  };

  handleNextScrollDoctor = () => {
    scrollDoctorRef.current.scrollTo({ x: offsetScroll + 100, y: 0, animated: true });
  };
  handlePrevScrollDoctor = () => {
    scrollDoctorRef.current.scrollTo({ x: offsetScroll - 100, y: 0, animated: true });
  };
  const roomConvert = props.rooms.map(room => {
    return { label: room.Name, value: room };
  });

  handleSelectDoctor = (doctor, active) => () => {
    setDoctor(doctor);
    setActiveDoctor(active);
    props.getDoctor(doctor);
  };
  return (
    <View style={{ padding: 15, paddingTop: 0, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginHorizontal: 9 }}>Khoa: </Text>
        <View style={{ width: width - 120 }}>
          <RNPickerSelect
            placeholder={{
              label: "--Chọn khoa phòng--",
              value: {}
            }}
            onValueChange={value => {
              if (Platform.OS === "android") {
                props.getRoom(value);
              } else {
                setRoomSelect(value);
              }
            }}
            onDonePress={() => {
              props.getRoom(roomSelect);
            }}
            items={roomConvert}
            style={{
              ...(Platform.OS === "ios" ? pickerSelectStyles.inputIOS : pickerSelectStyles.inputAndroid),
              iconContainer: {
                top: Platform.OS === "ios" ? 5 : 20,
                right: 10
              },
              placeholder: {
                fontSize: 12,
                fontWeight: "bold"
              }
            }}
            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: "transparent",
                    borderTopWidth: 5,
                    borderTopColor: "gray",
                    borderRightWidth: 5,
                    borderRightColor: "transparent",
                    borderLeftWidth: 5,
                    borderLeftColor: "transparent",
                    width: 0,
                    height: 0
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ marginLeft: 9, marginTop: Platform.OS === "ios" ? 10 : 0 }}>Bác sĩ: </Text>

        <Text style={{ marginLeft: 5 }}>{doctor.name}</Text>
      </View>
      <Animated.View style={{ transform: [{ scale: animationScale }], height: animationHeight }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <TouchableWithoutFeedback onPress={handlePrevScrollDoctor}>
            <Entypo name="chevron-left" size={40} />
          </TouchableWithoutFeedback>

          {!props.doctor ? (
            <ScrollView
              // showsHorizontalScrollIndicator={false}
              horizontal={true}
              onScroll={event => handleOnScrollDoctor(event.nativeEvent.contentOffset)}
              ref={scrollDoctorRef}
              style={{ paddingVertical: 10 }}
            >
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lị" }, 1)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25, padding: 5, zIndex: 1 }}
                    opacity={activeDoctor === 1 ? 1 : 0.3}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lị</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 2)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 2 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 3)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 3 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 4)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 4 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 5)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 5 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 6)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 6 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleSelectDoctor({ id: "asd", name: "BS. Nguyễn Thị Lịu" }, 7)}>
                <View style={{ marginHorizontal: 5, alignItems: "center" }}>
                  <Image
                    opacity={activeDoctor === 7 ? 1 : 0.3}
                    source={require("../../../assets/blurbgdb.jpeg")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 10, marginTop: Platform.OS === "ios" ? 5 : 0 }}>BS. Nguyễn Thị Lịu</Text>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          ) : (
            <View>
              <Text>Hãy chọn khoa để chọn bác sĩ</Text>
            </View>
          )}
          <TouchableWithoutFeedback onPress={handleNextScrollDoctor}>
            <Entypo name="chevron-right" size={40} />
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default RoomDoctor;
