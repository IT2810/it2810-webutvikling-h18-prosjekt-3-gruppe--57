import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {LinearGradient, Permissions, Font} from 'expo';
import Cam from '../components/Cam.js'
import ModalNewReminder from '../components/ModalNewReminder.js'
import ModalInspectReminder from '../components/ModalInspectReminder.js'
import {Icon} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import createStyles from '../styles/ReminderStyle.js'

const styles = createStyles();

const colorUnlocked = ['#14bf69', '#17cf94'];
const colorLocked = ['#CD3F31', '#F2686B'];

const list = [
    {
        reminder: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock-open',
        locked: false,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '03-10-18',
        time: '10:15',
        lock: 'lock-open',
        locked: false,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '07-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
];


export default class Reminders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            modalVisible: false,
            modalInspectVisible: false,
            setClose: function(visible) {
                this.setState({modalVisible:visible});
            },
            setInspectClose: function(visible){
                this.setState({modalInspectVisible:visible});
            }
        };
    }

    static navigationOptions = {
        header: null
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({hasPermission: status === 'granted'});
    }

    safetySwitch(lock){
        if(!lock){
            this.setState({modalInspectVisible:true})
        }else{
            alert("This reminder is locked.") //This reminder is locked, by proceeding you will loose points. Continue?
        }
    }

    render() {
        const hasPermission = this.state.hasPermission;
        console.log(hasPermission);
        console.log("The value of modalVisible in Reminders: "+this.state.modalVisible);
        if (hasPermission === null) {
            return <Text> Awaiting permissions...</Text>
        }
        else if (hasPermission === false) {
            return <Text> No access to camera or camera roll</Text>
        }
        else {
            return (
                <View style={{flex: 1, backgroundColor: '#f3f3f3',borderRadius:0}}>
                    <ScrollView style={styles.container}>
                        <ModalNewReminder hasPermission={this.state.hasPermission} modalVisible={this.state.modalVisible} setClose={this.state.setClose.bind(this)}/>
                        <ModalInspectReminder modalVisible={this.state.modalInspectVisible} setClose={this.state.setInspectClose.bind(this)}/>
                        {
                            list.map((l, i) => (
                                <View style={styles.item} key={i}>
                                    <View style={styles.shadow}>
                                        <TouchableHighlight underlayColor={"#f1f1f1"} style={{borderRadius: 10}}
                                            onPress={() => {
                                                console.log("hallo: "+l.locked);
                                                this.safetySwitch(l.locked);
                                            }}>
                                            <LinearGradient
                                                start={{x: 0, y: 1}}
                                                end={{x: 1, y: 1}}
                                                colors={l.locked ? colorLocked : colorUnlocked}
                                                style={styles.gradient}>
                                                <View style={styles.lock}>
                                                    <Icon name={l.locked ? "lock" : "lock-open"}/>
                                                </View>
                                                <View style={styles.info1}>
                                                    <Text style={styles.dateText}>
                                                        {l.date}
                                                    </Text>
                                                </View>
                                                {/*<Image style={styles.img} source={l.img} blurRadius={50}/>*/}
                                            </LinearGradient>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    <ActionButton buttonColor="#000" onPress={() => {this.setState({modalVisible:true})}}/>
                </View>
            );
        }
    }
}
