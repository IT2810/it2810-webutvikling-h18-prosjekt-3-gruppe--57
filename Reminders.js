import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient' 


const list = [
    {
        title: 'Buy groceries',
        date: '01-10-18',
        time: '08:00',
        img: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
    },
    {
        title: 'deliver handin',
        date: '10-10-18',
        time: '23:59',
        img: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
    }
]   
export default class Reminders extends React.Component{
    static navigationOptions = {
        title: 'Reminders'
    };

    render(){
        return(
            <View>
                {
                    list.map((l, i) => (
                        <ListItem
                            scaleProps={{
                                friction: 90,
                                tension: 100,
                                activeScale: 0.95,
                            }}
                            linearGradientProps={{
                                colors: ['#FF9800', '#F44336'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            ViewComponent={LinearGradient}
                            key={i}
                            avatar={{ size:'small', source: { uri: l.img } }}
                            title={l.title}
                            subtitle={l.date}
                            titleStyle={{ color: 'red', fontWeight: 'bold' }}
                            subtitleStyle={{ color: 'gray' }}
                            chevronColor="red"
                        />
                    )) 
                }
            </View>
        );
    }
}
