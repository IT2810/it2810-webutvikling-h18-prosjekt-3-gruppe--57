import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';
import {LinearGradient} from 'expo';
import Storage from "../components/Storage.js";
import createStyles from "../styles/CompletedStyle.js";
import color from "../constants/Colors";

const styles = createStyles();

export default class Completed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reminders: [],
        };
    }

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        //refresh list when component is focused, necessary when exiting modal
        this.props.navigation.addListener("willFocus", ()=>{
            Storage.getCompletedRemindersSorted().then((res)=>{
                this.setState({reminders:res});
            });
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f3f3f3', borderRadius: 0}}>
                <ScrollView style={styles.container}>
                    {
                        this.state.reminders.length > 0 ? this.state.reminders.map((l, i) => (
                                <View style={styles.item} key={i}>
                                    <View style={styles.shadow}>
                                        <TouchableHighlight underlayColor={"#f1f1f1"} style={{borderRadius: 10}}
                                        >
                                            <LinearGradient
                                                colors={l.locked ? color.colorPalletError : color.colorPalletGreen}
                                                style={styles.gradient}>
                                                <View style={styles.info1}>
                                                    <Text
                                                        style={l.locked ? styles.reminderTextLocked : styles.reminderText}>
                                                        {l.reminder}
                                                    </Text>
                                                    <Text style={l.locked ? styles.dateTextLocked : styles.dateText}>
                                                        {l.date}
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )) :
                            <View style={styles.emptyTextView}>
                                <Image
                                    source={{uri: 'https://thumbs.gfycat.com/AffectionateDimIberianlynx-small.gif'}}
                                    style={{height: 200, width: 200}}/>
                                <Text style={styles.emptyText}>There's nothing here</Text>
                            </View>
                    }
                </ScrollView>
            </View>
        );
    }
}