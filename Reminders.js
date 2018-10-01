import React from 'react';
import {ScrollView,StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';


const list = [
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('./assets/images/schwarzenegger.png')
    }
]
export default class Reminders extends React.Component{
    static navigationOptions = {
        title: 'Reminders'
    };

    render(){
        return(
            <ScrollView>
                {
                    list.map((l, i) => (
                        <ListItem 
                            style={styles.subtitleView}
                            scaleProps={{
                                friction: 70,
                                tension: 100,
                                activeScale: 0.95,
                            }}
                            linearGradientProps={{
                                colors: ['#471F1F', '#E61919'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            key={i}
                            leftAvatar={{ size: 'small', source: require('./assets/images/schwarzenegger.png')  }}
                            title={l.title}
                            subtitle={l.date}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            chevronColor="black"
                            chevron 
                        />
                    )) 
                }
            </ScrollView>
        );
    }
}

styles = StyleSheet.create({
    subtitleView: {
        paddingLeft: 10,
        paddingRight:10,
        paddingTop: 10,
        paddingBottom:10,
        borderRadius: 50,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        overflow: 'hidden'
    },
})
