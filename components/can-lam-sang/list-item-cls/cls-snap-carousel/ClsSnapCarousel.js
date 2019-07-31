import React, { Component } from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";
import Carousel from "react-native-snap-carousel";
import DetailCLSReport from "./detail-cls-report/DetailCLSReport";
import Entypo from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
class ClsSnapCarousel extends Component {
  static navigationOptions = {
    title: "Chi tiết cận lâm sàng"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }


    render() {
        let dataHtml = this.props.navigation.getParam('data');
        let index = this.props.navigation.getParam('index');
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


                <Carousel
                    data={dataHtml}
                    loop={true}
                    ref={(c) => { this._carousel = c; }}
                    renderItem={({ item, index }) => <DetailCLSReport htmlContent={item} />}
                    sliderWidth={width}
                    itemWidth={width}
                    sliderHeight={height - 50}
                    itemHeight={height - 60}
                    layout='stack'
                    firstItem={index}
                />


                {/* <TouchableWithoutFeedback onPress={() => this._carousel.snapToPrev()}>
                    <View
                        style={{
                            position: "absolute",
                            top: height / 2,
                            left: 10,
                            zIndex: 2100,
                            backgroundColor: "rgba(22, 22, 23,0.3)",
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Entypo name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this._carousel.snapToNext()}>
                    <View
                        style={{
                            position: "absolute",
                            top: height / 2,
                            right: 10,
                            zIndex: 2100,
                            backgroundColor: "rgba(22, 22, 23,0.3)",
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Entypo name="chevron-right" size={24} color="white" />
                    </View>
                </TouchableWithoutFeedback> */}
      </View>
    );
  }
}

export default ClsSnapCarousel;
