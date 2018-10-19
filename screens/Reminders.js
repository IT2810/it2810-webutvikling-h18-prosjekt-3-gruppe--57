import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';
import {LinearGradient, Permissions, Font} from 'expo';
import ModalNewReminder from '../components/ModalNewReminder.js';
import ModalInspectReminder from '../components/ModalInspectReminder.js';
import {Icon, Overlay} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import createStyles from '../styles/ReminderStyle.js';
import Storage from '../components/Storage.js';
import color from "../constants/Colors";
import Icons from "react-native-vector-icons/Ionicons";

const styles = createStyles();

export default class Reminders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            hasNotificationPermission: null,
            hasLocationPermission: null,
            chosenItemId: null,
            modalVisible: false,
            reminders: [],
            overlayVisible: false,
            modalInspectVisible: false,
            setClose: function (visible) {
                this.setState({modalVisible: visible});
            },
            setInspectClose: function (visible) {
                this.setState({modalInspectVisible: visible});
            }
        };
        this.getItems =this.getItems.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    async componentDidMount() {
        //refresh list when component is focused, necessary when exiting modal
        this.props.navigation.addListener("willFocus",this.getItems); 
        const {statusCamera} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        const { statusNotifications } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        const { statusLocation } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({hasCameraPermission: statusCamera === 'granted', hasLocationPermission: statusLocation === 'granted', hasNotificationPermission: statusNotifications === 'granted'});
    }

    safetySwitch(item) {
        if (!item.locked) {
            this.setState({modalInspectVisible: true, chosenItemId: item.id});
        } else {
            this.setState({overlayVisible: true, chosenItemId: item.id});
        }
    }

    getItems(){
        Storage.getActiveRemindersSorted().then((res) => {
            this.setState({ reminders: res });
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f3f3f3', borderRadius: 0}}>
                <ScrollView style={styles.container}>
                    <ModalNewReminder hasCameraPermission={this.state.hasCameraPermission}
                                        hasNotificationPermission={this.state.hasNotificationPermission}
                                        hasLocationPermission={this.state.hasLocationPermission}
                                        modalVisible={this.state.modalVisible}
                                        setClose={this.state.setClose.bind(this)}
                                        refresh={this.getItems}/>
                    <ModalInspectReminder modalVisible={this.state.modalInspectVisible}
                                            setClose={this.state.setInspectClose.bind(this)}
                                            refresh={this.getItems}
                                            id={this.state.chosenItemId}/>
                    {
                        this.state.reminders.length > 0 ? this.state.reminders.map((l, i) => (
                                <View style={styles.item} key={i}>
                                    <View style={styles.shadow}>
                                        <TouchableHighlight underlayColor={"#f1f1f1"} style={{borderRadius: 10}}
                                                            onPress={() => {
                                                                this.safetySwitch(l);
                                                            }}>
                                            <LinearGradient
                                                colors={l.locked ? color.colorPalletError : color.colorPalletGreen}
                                                style={styles.gradient}>
                                                <View style={styles.lock}>
                                                    <Icon name={l.locked ? "lock" : "lock-open"}/>
                                                </View>
                                                <View style={styles.info1}>
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
                                <Text style={styles.emptyText}>You don't seem to have any reminders</Text>
                            </View>
                    }
                </ScrollView>
                <ActionButton buttonColor={color.plussButton} title="New Reminder"
                                onPress={() => this.setState({modalVisible: true})}>
                    <Icons name="md-create" style={styles.actionButtonIcon}/>
                </ActionButton>
                <Overlay
                    isVisible={this.state.overlayVisible}
                    windowBackgroundColor="rgba(255, 255, 255, .8)"
                    height="auto">
                    <View>
                        <Text style={styles.modalText}>This Reminder is locked, by proceeding you will lose 500 points</Text>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonSave}
                                onPress={() => {
                                    this.setState({modalInspectVisible: true, overlayVisible: false});
                                }}>
                                <Text style={styles.modalText2}>Continue</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonQuit}
                                onPress={() => {
                                    this.setState({overlayVisible: false});
                                }}>
                                <Text style={styles.modalText2}>Take me back</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Overlay>
            </View>
        );
    }
}
