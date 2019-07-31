import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, View, FlatList, StyleSheet } from 'react-native';
import ItemNotification from './item-notification/ItemNotification';
import dataNotification from './data-notification';
export default class ListNotification extends Component {
    static navigationOptions = {
        title: "Danh sách thông báo"
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        let data = [];
        for (let i = 0; i < 30; i++) {
            data.push(dataNotification);
        }
        this.setState({
            dataList: data,
            isLoading: false,
            refreshing: false
        })
    }

    onRefresh() {
        this.setState({ refreshing: true }, () => {
            this.loadData();
        });
    }

    render() {

        if (this.state.isLoading) {
            return <View style={styles.containerLoading}>
                <ActivityIndicator style={{ color: 'red', size: 'large' }} />
            </View>;
        }
        return (
            <View style={{ backgroundColor: "#EAEAEA" }}>
                {/* <StatusBar backgroundColor="#BCF6DA" barStyle="light-content" /> */}
                <FlatList
                    data={this.state.dataList}
                    renderItem={({ item }) => {
                        return <ItemNotification item={item} />
                    }}

                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)} />
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerLoading: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    }
})