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
import createStyles from '../styles/HomeScreenStyle.js'
import AnimateNumber from 'react-native-countup'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


const styles = createStyles();


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 1200,
            activeReminders:46,
            data :[
                {
                    month: new Date(2015, 0, 1),
                    apples: 3840,
                    bananas: 1920,
                    cherries: 960,
                    dates: 400,
                },
                {
                    month: new Date(2015, 1, 1),
                    apples: 1600,
                    bananas: 1440,
                    cherries: 960,
                    dates: 400,
                },
                {
                    month: new Date(2015, 2, 1),
                    apples: 640,
                    bananas: 960,
                    cherries: 3640,
                    dates: 400,
                },
                {
                    month: new Date(2015, 3, 1),
                    apples: 3320,
                    bananas: 480,
                    cherries: 640,
                    dates: 400,
                },
            ],
            colors : [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ],
            colorGradient:['#00F5A6','#06EA95','#0CDF84','#12D474','#19CA63','#1FBF53','#25B442','#2CAA31','#329F21','#389410','#3F8A00'],
            colorGradientR:['#19CA63','#12D474','#0CDF84','#06EA95','#00F5A6'],
            colorPallet:[['#17cf94', '#14bf69', '#17cf94'],
                ['#1FBF53', '#00EA9E', '#1FBF53'],
                ['#0CDF84', '#19CA63', '#0CDF84'],
                ['#17cf94', '#14bf69', '#17cf94']],
            keys: [ 'apples', 'bananas', 'cherries', 'dates' ],
            svgs: [
                { onPress: () => console.log('apples') },
                { onPress: () => console.log('bananas') },
                { onPress: () => console.log('cherries') },
                { onPress: () => console.log('dates') },]
        };
    }

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
>>>>>>> 71d3f564... Merge fix and addition to the double modal. #3
