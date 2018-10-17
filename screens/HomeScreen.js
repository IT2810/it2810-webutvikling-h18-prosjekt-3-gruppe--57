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
const rightBoxWidth = chartWidth * 0.55;

const chartConfig = {
    backgroundGradientFrom: color.backgroundGradientFrom,
    backgroundGradientTo: color.backgroundGradientTo,
    color: (opacity = 1) => `rgba(30,41,35, ${opacity})`
};

const contributionChartConfig = {
    backgroundGradientFrom: color.backgroundGradientFrom2,
    backgroundGradientTo: color.backgroundGradientTo2,
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
            allReminderDates: [],
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
            var allReminderDates = this.formatDatesForChart(user);
            if (!isNaN(user.successful.length / (user.successful.length + user.failed.length))) {
                percentage = user.successful.length / (user.successful.length + user.failed.length)
            }
            this.setState({
                points: user.score,
                activeReminders: user.reminders.length,
                percentage: percentage - 0.00001,
                allReminderDates: allReminderDates,
            });
        });
    }

    formatDatesForChart(user) {
        var allReminderDates = [];
        var stringArray = [];
        var uniqueArray = [];
        var uniqueDateArray = [];
        user.reminders.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        user.failed.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        user.successful.forEach(element => {
            allReminderDates.push(new Date(element.dateMilliseconds));
        });
        allReminderDates.forEach(element => {
            stringArray.push(JSON.stringify(element).split("T")[0].replace('"',''));
        });
        stringArray.forEach(element => {
            if (!uniqueArray.includes(element)){
                uniqueArray.push(element);
                uniqueDateArray.push({date: element,count:1})
            }else{
                var counter = uniqueDateArray[uniqueArray.indexOf(element)].count+1;
                uniqueDateArray[uniqueArray.indexOf(element)] = {date: element,count:counter}
            }
        });
        console.log(uniqueDateArray);
        return uniqueDateArray;
    }

    render() {
        return (
            <ScrollView style={styles.container} alignItems={'center'}>
                <View style={styles.item}>
                    <View style={styles.shadow}>
                        <LinearGradient
                            colors={color.colorPalletGray}
                            style={styles.gradient}
                            start={[1, 0]}
                            end={[0, 1]}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>Score Points</Text>
                                </View>
                                <View style={{width: rightBoxWidth}}>
                                    <LinearGradient
                                        start={[1, 0]}
                                        end={[0, 1]}
                                        colors={color.colorPalletGreen}
                                        style={styles.dataGradient}>
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
                            style={styles.gradient}
                            start={[1, 0]}
                            end={[0, 1]}>
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
                            style={styles.gradient}
                            start={[1, 0]}
                            end={[0, 1]}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>
                                        Active Reminders
                                    </Text>
                                </View>
                                <View style={{width: rightBoxWidth}}>
                                    <LinearGradient
                                        colors={color.colorPalletGreen}
                                        style={styles.dataGradient}
                                        start={[1, 0]}
                                        end={[0, 1]}>
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
                            style={styles.gradient}
                            start={[1, 0]}
                            end={[0, 1]}>
                            <View style={styles.rightBoxContainer}>
                                <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
                                    <Text style={styles.getStartedText}>Activity last 30 days</Text>
                                </View>
                                <ContributionGraph
                                    values={this.state.allReminderDates}
                                    endDate={new Date()}
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