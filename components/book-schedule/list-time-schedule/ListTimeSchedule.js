import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Text, View, FlatList, Dimensions } from "react-native";
import ModalSchedule from "../modal-schedule/ModalSchedule";
import ItemListTime from "./item-list-time/ItemListTime";
import { checkTimeCanBook } from "../../../helpers/date/formatDate";

function ListTimeSchedule(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [today, setToday] = useState(true);
  const scrollRef = useRef(null);

  useEffect(
    () => {
      if (props.date.getDate() !== new Date().getDate()) {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
      } else if (props.room.id && props.doctor.id) {
        setToday(false);
        props.listCountSchedule.every((item, index) => {
          if (!checkTimeCanBook(props.datePicker, item.hour, item.minute)) {
            setTimeout(() => {
              scrollRef.current.scrollTo({ x: 0, y: index * 85 });
              setToday(true);
            }, 500);
            return false;
          }
          return true;
        });
      }
    },
    [props.listCountSchedule]
  );

  closeModal = () => {
    setIsOpen(false);
  };

  openModal = time => {
    setTime(time);
    setIsOpen(true);
  };

  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView
      bounces={false}
      bouncesZoom={false}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={event => {
        if (today) {
          props.scrollListTime(event.nativeEvent.contentOffset.y);
        }
      }}
    >
      <View style={{ marginTop: 20, backgroundColor: "white", paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20 }}>
        <View>
          <ModalSchedule
            navigation={props.navigation}
            isOpen={isOpen}
            room={props.room}
            date={props.date}
            doctor={props.doctor}
            time={time}
            closeModal={closeModal}
          />

          <FlatList
            data={props.listCountSchedule}
            keyExtractor={(item, index) => ` ${index}`}
            renderItem={({ item, index }) => (
              <ItemListTime data={item} index={index} datePicker={props.datePicker} openModal={openModal} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ListTimeSchedule;
