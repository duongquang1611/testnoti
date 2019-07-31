import React from "react";
import {
    Text,
    View,
    Button,
    Platform,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import firebase from "firebase";
import firebaseConfig from "../../../share/firebase/firebaseConfig";
// firebase.initializeApp(firebaseConfig);
let YOUR_PUSH_TOKEN = "";
export default class PushNotification extends React.Component {
    static navigationOptions = {
        title: "Push Notification",
    };
    state = {
        notification: {},
        message: "",
        currentUser: {},
    };

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Không được cấp quyền thông báo!");
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            YOUR_PUSH_TOKEN = token;
            console.log(token);
            // firebase.database.ref("users/" + this.state.currentUser.uid).set({
            //     getExpoPushToken: token
            // });
        } else {
            alert("Bạn cần sử dụng thiết bị thật để test thông báo");
        }
    };

    async componentDidMount() {
        if (Platform.OS === "android") {
            Notifications.createChannelAndroidAsync("lich-hen", {
                name: "lich-hen",
                sound: true,
                vibrate: [0, 250, 250, 250],
                priority: "max",
            });
        }
        // this.setState({
        //     currentUser: await firebase.auth().currentUser
        // })

        await this.registerForPushNotificationsAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }

    _handleNotification = notification => {
        // console.log(notifications);

        this.setState({ notification: notification });
        // alert(JSON.stringify(notification.data));
    };
    _handleMessage = text => {
        this.setState({ message: text });
    };
    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
        let message = {
            to: YOUR_PUSH_TOKEN,
            title: "Thông báo quang",
            body: "Em yêu anh",
            sound: "default",
            subtitle: "kpop",
            _displayInForeground: true,
            channelId: "lich-hen",
            priority: "high",
            data: { data: "Đã nhận thông báo" },
        };
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
        const data = response._bodyInit;
        // console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
    };
    sendLocalNotification = async () => {
        let localNotification = {
            title: "Local Noti",
            body: this.state.message,
            android: {
                channelId: "lich-hen",
            },
            _displayInForeground: true,
            subtitle: "kpop",
            sound: "default",
            ttl: 10,
            data: { pornhub: "data local" },
        };
        Notifications.presentLocalNotificationAsync(localNotification);
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Text>Origin: {this.state.notification.origin}</Text>
                    <Text>
                        Data: {JSON.stringify(this.state.notification.data)}
                    </Text>
                </View>
                <Button
                    title={"Send noti to server expo"}
                    onPress={() => this.sendPushNotification()}
                />
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled={true}
                    keyboardVerticalOffset={150}
                >
                    <TextInput
                        value={this.state.message}
                        onChangeText={this._handleMessage}
                        placeholder="Nhập nội dung thông báo"
                        style={{
                            height: 50,
                            width: 300,
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    />
                    <Button
                        title={"Send noti to local"}
                        onPress={() => this.sendLocalNotification()}
                    />
                </KeyboardAvoidingView>
            </View>
        );
    }
}
