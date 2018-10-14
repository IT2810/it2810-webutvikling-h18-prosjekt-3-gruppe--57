import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import {LinearGradient} from 'expo';
import createStyles from '../styles/HomeScreenStyle.js'
import AnimateNumber from 'react-native-countup'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import color from '../constants/Colors'

import {
    LineChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

const styles = createStyles();
const screenWidth = Dimensions.get('window').width;
const chartConfig = {
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    color: (opacity = 1) => `rgba(30,41,35, ${opacity})`
};

const lineChartConfig ={
    backgroundColor: '#fff',
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 0) => `rgba(30,41,35, ${opacity})`,
    style: {
        borderRadius: 10,
    }
};
const contributionChartConfig =  {
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    color: (opacity = 1) => `rgba(30,41,35, ${opacity})`
};


const chartWidth = screenWidth-(screenWidth/13.5);

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 120,
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
            commitsData: [
                { date: '2017-01-02', count: 1 },
                { date: '2017-01-03', count: 2 },
                { date: '2017-01-04', count: 3 },
                { date: '2017-01-05', count: 4 },
                { date: '2017-01-06', count: 5 },
                { date: '2017-01-30', count: 2 },
                { date: '2017-01-31', count: 3 },
                { date: '2017-03-01', count: 2 },
                { date: '2017-04-02', count: 4 },
                { date: '2017-03-05', count: 2 },
                { date: '2017-02-30', count: 4 }
            ],
            keys: [ 'apples', 'bananas', 'cherries', 'dates' ],
            svgs: [
                { onPress: () => console.log('apples') },
                { onPress: () => console.log('bananas') },
                { onPress: () => console.log('cherries') },
                { onPress: () => console.log('dates') },],
            modalVisible:false,
            setClose: function(visible) {
                this.setState({modalVisible:visible});
            },
        };
    }
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPallet[1]}
                            style={styles.gradient}>
                            <Text style={styles.getStartedText}>Score Points</Text>
                            <Text style={styles.scorePointText}>
                                {this.state.points}
                                {/*<AnimateNumber value={this.state.points}
                                               countBy={14}
                                               timing={(interval, progress) => {
                                                   // slow start, slow end
                                                   return interval * (1 - Math.sin(Math.PI*progress) )*10
                                               }}/>*/}
                            </Text>
                        </LinearGradient>
                    </View>
                    <View style={styles.shadow}>
                        <ProgressChart
                            data={[0.4, 0.6, 0.8]}
                            width={chartWidth}
                            height={220}
                            chartConfig={chartConfig}
                            style={{borderRadius:10}}
                        />
                    </View>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPallet[1]}
                            style={styles.gradient}>
                            <Text style={styles.getStartedText}>
                                Active Reminders
                            </Text>
                            <Text style={styles.scorePointText}>
                                {this.state.activeReminders}
                                {/*<AnimateNumber value={this.state.points}
                                               countBy={14}
                                               timing={(interval, progress) => {
                                                   // slow start, slow end
                                                   return interval * (1 - Math.sin(Math.PI*progress) )*10
                                               }}/>*/}
                            </Text>
                        </LinearGradient>
                    </View>

                    <View style= {styles.shadowChart}>
                        <LineChart
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [{
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }]
                            }}
                            width={chartWidth} // from react-native
                            height={220}
                            chartConfig={lineChartConfig}
                            bezier
                            style={{borderRadius: 10,}}
                        />
                    </View>
                    <View style={styles.shadow}>
                        <ContributionGraph
                            values={this.state.commitsData}
                            endDate={new Date('2017-04-01')}
                            numDays={105}
                            width={chartWidth}
                            height={220}
                            chartConfig={contributionChartConfig}
                            style={{borderRadius: 10,}}
                        />
                    </View>
                </View>
                <StackedAreaChart
                    style={ { height: 200, } }
                    data={ this.state.data }
                    keys={ this.state.keys }
                    colors={ color.colorGradientR }
                    curve={ shape.curveNatural }
                    showGrid={ true }
                    svgs={ this.state.svgs }
                />
            </ScrollView>
        );
    }
}