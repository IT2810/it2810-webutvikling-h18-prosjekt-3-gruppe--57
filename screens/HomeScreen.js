import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {WebBrowser} from 'expo';
import {LinearGradient} from 'expo';
import * as Progress from 'react-native-progress';

const list = [
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    }
];

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {
                    list.map((l, i) => (
                        <View style={styles.item} key={i}>
                            <View style={styles.shadow}>
                                <LinearGradient
                                    colors={['#17cf94', '#14bf69', '#17cf94']}
                                    style={styles.gradient}>
                                    <Text style={styles.getStartedText}>
                                        {l.title}
                                    </Text>
                                    <View styles={styles.diagram}>
                                        <Progress.Circle color={'#fff'} size={150} borderWidth={1} progress={0.4}
                                                         showsText={true} thickness={5}/>
                                    </View>
                                    <Text style={styles.getStartedText}>
                                        {l.date}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    diagram: {
        alignItems: 'center',
        paddingBottom: 20,
        borderWidth: 2,
        borderColor: '#1ada00',
    },
    shadow: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 70,
        marginHorizontal: 50,
        alignSelf: 'stretch',
    },
    gradient: {
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    getStartedText: {
        margin: 10,
        fontSize: 27,
        color: '#ffffff',
        textAlign: 'center',
        /*borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1ada00',*/
    },
});
