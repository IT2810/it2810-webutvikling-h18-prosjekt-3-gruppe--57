import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { LinearGradient, Permissions, Font } from 'expo';
import ModalInspectReminder from "../components/ModalInspectReminder.js";
import { Icon, Overlay } from 'react-native-elements'
import Storage from "../components/Storage.js";
import Icons from "react-native-vector-icons/Ionicons";
import createStyles from "../styles/CompletedStyle.js";

const styles = createStyles();

const colorUnlocked = ["#14bf69", "#17cf94"];
const colorLocked = ["#CD3F31", "#F2686B"];

export default class Completed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reminders: [],
        };
        this.getItems = this.getItems.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    async componentWillMount() {
        this.props.navigation.addListener("willFocus", this.getItems); //refresh list when component is focused, necessary when exiting modal
    }

    //Retrieve all reminders from storage
    getItems() {
        Storage.getItem(Expo.Constants.installationId).then((user) => {
            const completed = user.successful.concat(user.failed);
            completed.sort(function (a, b) {
                return a.dateMilliseconds - b.dateMilliseconds;
            });
            this.setState({ reminders: completed });
        });
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderRadius: 0 }}>
            <ScrollView style={styles.container}>
                {
                    this.state.reminders.map((l, i) => (
                        <View style={styles.item} key={i}>
                            <View style={styles.shadow}>
                                <TouchableHighlight underlayColor={"#f1f1f1"} style={{ borderRadius: 10 }}
                                    onPress={() => {
                                        alert("hei");
                                    }}>
                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={l.locked ? colorLocked : colorUnlocked}
                                        style={styles.gradient}>
                                        <View style={styles.info1}>
                                            <Text style={styles.reminderText}>
                                                {l.reminder}
                                            </Text>
                                            <Text style={styles.dateText}>
                                                {l.date}
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableHighlight>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            </View>
        );
    }
}