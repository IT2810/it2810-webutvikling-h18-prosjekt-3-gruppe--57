import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {LinearGradient} from 'expo';
import { Icon } from 'react-native-elements'


const list = [
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock-open',
        color: ['#17cf94','#14bf69','#17cf94'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock-open',
        color: ['#17cf94','#14bf69','#17cf94'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#ff5a4b','#CF2A39','#ff5a4b'],
        img: require('../assets/images/schwarzenegger.png')
    }
];



export default class Reminders extends React.Component{
    static navigationOptions = {
        title: 'Reminders'
    };

    render(){
        return(
            <ScrollView style={styles.container}>
                {
                    list.map((l, i) => (
                        <View style={styles.item} key={i}>
                            <View style={styles.shadow}>
                                <LinearGradient
                                    colors={l.color}
                                    style={styles.gradient}>
                                    <View style={styles.lock} >
                                        <Icon name={l.lock} />
                                    </View>
                                    <View style={styles.info1}>
                                        <Text style={styles.dateText}>
                                            {l.date}
                                        </Text>
                                    </View>
                                    <Image style={styles.img} source={l.img}/>
                                </LinearGradient>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

styles = StyleSheet.create({
    lock:{
        paddingHorizontal:20,
    },
    img:{
        width: 70,
        height:70,
        margin: 10,
        marginHorizontal:20,
    },
    info1:{
        flex: 1,
        flexDirection: 'column',
    },
    item:{
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
    },
    shadow:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginHorizontal: 50,
        width:400,
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    dateText: {
        margin: 10,
        fontSize: 27,
        color: '#ffffff',
        textAlign: 'center',
    },
});
