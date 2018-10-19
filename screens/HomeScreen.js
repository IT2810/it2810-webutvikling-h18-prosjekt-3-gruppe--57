import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import {LinearGradient} from 'expo';
import createStyles from '../styles/HomeScreenStyle.js'
import AnimateNumber from 'react-native-countup'
import {StackedAreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import color from '../constants/Colors'
import layout from '../constants/Layout'
import Storage from '../components/Storage';
import util from '../components/Util'

import {
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

const styles = createStyles();
const chartWidth = 0.9 * layout.window.width;
const chartHeight = 0.2 * layout.window.height;
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
const data = [
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
];
const keys =['apples', 'bananas', 'cherries', 'dates'];

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            activeReminders: 0,
            percentage: 0,
            points: 0,
            allReminderDates: [],
            setClose: function (visible) {
                this.setState({modalVisible: visible});
            },
        };
    }

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            Storage.getStatisticsForUser().then((res)=>{
                this.setState({
                    points: res.score,
                    activeReminders: res.activeReminders,
                    percentage: res.percentage,
                    allReminderDates: res.allReminderDates,
                });
            });
        });
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
                    data={data}
                    keys={keys}
                    colors={color.colorGradientR}
                    curve={shape.curveNatural}
                />
            </ScrollView>
        );
    }
}