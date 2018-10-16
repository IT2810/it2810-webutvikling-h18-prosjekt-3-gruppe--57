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
import {StackedAreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import color from '../constants/Colors'
import Storage from '../components/Storage';

import {
    LineChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

const styles = createStyles();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const chartWidth = 0.9 * screenWidth;
const chartHeight = 0.2 * screenHeight;
const rightBoxWidth = chartWidth*0.55;


const chartConfig = {
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    color: (opacity = 1) => `rgba(30,41,35, ${opacity})`
};

const contributionChartConfig = {
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    color: (opacity = 1) => `rgba(30,41,35, ${opacity})`
};

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            activeReminders: 0,
            percentage: 0,
            points: 0,
            data: [
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
                {date: '2017-01-02', count: 1},
                {date: '2017-01-03', count: 2},
                {date: '2017-01-04', count: 3},
                {date: '2017-01-05', count: 4},
                {date: '2017-01-06', count: 5},
                {date: '2017-01-30', count: 2},
                {date: '2017-01-31', count: 3},
                {date: '2017-03-01', count: 2},
                {date: '2017-04-02', count: 4},
                {date: '2017-03-05', count: 2},
                {date: '2017-02-30', count: 4}
            ],
            keys: ['apples', 'bananas', 'cherries', 'dates'],
            svgs: [
                {onPress: () => console.log('apples')},
                {onPress: () => console.log('bananas')},
                {onPress: () => console.log('cherries')},
                {onPress: () => console.log('dates')},],
            setClose: function (visible) {
                this.setState({modalVisible: visible});
            },
        };
        this.getItems = this.getItems.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

    async componentWillMount() {
        this.props.navigation.addListener("willFocus", this.getItems);
    }

    getItems() {
        Storage.getItem(Expo.Constants.installationId).then((user) => {
            var percentage = 0;
            /*var allReminderDates = this.formatDatesForChart(user);*/
            if (!isNaN(user.successful.length / (user.successful.length + user.failed.length))) {
                percentage = user.successful.length / (user.successful.length + user.failed.length)
            }
            this.setState({
                points: user.score,
                activeReminders: user.reminders.length,
                percentage: percentage - 0.00001,
            });
        });
    }

    /*formatDatesForChart(user){
        var allReminderDates = {};
        user.reminders.forEach(element => {
            allReminderDates.push(element.date);
        });
        user.failed.forEach(element => {
            allReminderDates.push(element.date);
        });
        user.successful.forEach(element => {
            allReminderDates.push(element.date);
        });
        console.log(JSON.stringify(allReminderDates));
        return allReminderDates;
    }*/

    render() {
        return (
            <ScrollView style={styles.container} alignItems={'center'}>
                <View style={styles.item}>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPalletGray}
                            style={styles.gradient}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>Score Points</Text>
                                </View>
                                <View style={{width:rightBoxWidth}}>
                                    <LinearGradient
                                        colors={color.colorPalletGreen}
                                        style={styles.gradient}>
                                        <Text style={styles.scorePointText}>
                                            {this.state.points}
                                            {/*{<AnimateNumber value={this.state.points}
                                               countBy={50}
                                               timing={(interval, progress) => {
                                                   // slow start, slow end
                                                   return interval * (1 - Math.sin(Math.PI*progress) )*10
                                               }}/>}*/}
                                        </Text>
                                    </LinearGradient>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPalletGray}
                            style={styles.gradient}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>Success Percentage</Text>
                                </View>
                                <ProgressChart
                                    data={[this.state.percentage]}
                                    width={rightBoxWidth}
                                    height={chartHeight}
                                    chartConfig={chartConfig}
                                    style={{borderRadius: 10}}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPalletGray}
                            style={styles.gradient}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>
                                        Active Reminders
                                    </Text>
                                </View>
                                <View style={{width:rightBoxWidth}}>
                                    <LinearGradient
                                        colors={color.colorPalletGreen}
                                        style={styles.gradient}>
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
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPalletGray}
                            style={styles.gradient}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>Activity last 30 days</Text>
                                </View>
                                <ContributionGraph
                                    values={this.state.commitsData}
                                    endDate={new Date('2018-10-18')}
                                    numDays={30}
                                    width={rightBoxWidth}
                                    height={220}
                                    chartConfig={contributionChartConfig}
                                    style={{borderRadius: 10,}}
                                />
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                <StackedAreaChart
                    style={{height: 200,}}
                    data={this.state.data}
                    keys={this.state.keys}
                    colors={color.colorGradientR}
                    curve={shape.curveNatural}
                    showGrid={true}
                    svgs={this.state.svgs}
                />
            </ScrollView>
        );
    }
}