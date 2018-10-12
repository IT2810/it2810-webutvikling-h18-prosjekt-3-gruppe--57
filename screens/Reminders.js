import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {LinearGradient, Permissions, Font} from 'expo';
import ModalNewReminder from '../components/ModalNewReminder.js'
import ModalInspectReminder from '../components/ModalInspectReminder.js'
import {Icon, Overlay} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import createStyles from '../styles/ReminderStyle.js'
import Storage from '../components/Storage.js';
import Icons from "react-native-vector-icons/Ionicons";

const styles = createStyles();

const colorUnlocked = ['#14bf69', '#17cf94'];
const colorLocked = ['#CD3F31', '#F2686B'];
export default class Reminders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            chosenItemId: null,
            modalVisible: false,
            reminders: [],
            overlayVisible: false,
            modalInspectVisible: false,
            setClose: function(visible) {
                this.setState({modalVisible:visible});
            },
            setInspectClose: function(visible){
                this.setState({modalInspectVisible:visible});
            }
        };
        this.getItems = this.getItems.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    async componentWillMount() {
        this.props.navigation.addListener("willFocus", this.getItems);
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({hasPermission: status === 'granted'});
    }

    safetySwitch(item){
        if(!item.locked){
            //this.setState({modalInspectVisible:true, chosenItemId:item.id});
            this.setState({ overlayVisible: true, chosenItemId: item.id });
        }else{
            this.setState({overlayVisible:true});
            //alert("This reminder is locked.") //This reminder is locked, by proceeding you will loose points. Continue?
        }
    }

    getItems(){
        Storage.getAll().then((res)=>{
            this.setState({ reminders: res });
        }); 
        
    }

    deleteItems(){
        Storage.deleteAll().then(() => this.getItems()); //use this to reset asyncstorage
    }

    render() {
        console.log(this.state.reminders);
        const hasPermission = this.state.hasPermission;
        console.log("Render of reminders!");
        console.log("id: "+this.state.chosenItemId);
        if (hasPermission === null) {
            return <View style={{flex: 1, backgroundColor: '#f3f3f3',borderRadius:0}}/>
        }
        else if (hasPermission === false) {
            return <Text> No access to camera or camera roll</Text>
        }
        else {
            return (
                <View style={{flex: 1, backgroundColor: '#f3f3f3',borderRadius:0}}>
                    <ScrollView style={styles.container}>
                        <ModalNewReminder hasPermission={this.state.hasPermission}
                                          modalVisible={this.state.modalVisible}
                                          setClose={this.state.setClose.bind(this)}
                                          refresh={this.getItems}/>
                        <ModalInspectReminder modalVisible={this.state.modalInspectVisible}
                                              setClose={this.state.setInspectClose.bind(this)}
                                              id={this.state.chosenItemId}/>
                        {
                            this.state.reminders.map((l, i) => (
                                <View style={styles.item} key={i}>
                                    <View style={styles.shadow}>
                                        <TouchableHighlight underlayColor={"#f1f1f1"} style={{borderRadius: 10}}
                                            onPress={() => {
                                                this.safetySwitch(l);
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
                    <ActionButton buttonColor="#17cf94">
                        <ActionButton.Item buttonColor='#9b59b6' title="New Reminder" onPress={() => this.setState({ modalVisible: true })}>
                            <Icons name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#F2686B' title="Remove Reminders" onPress={() => {this.deleteItems()}}>
                            <Icons name="md-trash" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                    {/* <ActionButton>
                        <ActionButton.Item buttonColor="red" onPress={() => { this.deleteItems }} />
                        <ActionButton.Item buttonColor="#000" onPress={() => { this.setState({ modalVisible: true }) }} />
                    </ActionButton> */}
                    <Overlay 
                        isVisible={this.state.overlayVisible} 
                        windowBackgroundColor="rgba(255, 255, 255, .8)" 
                        height="auto"
                       >
                        <View>
                            <Text style={styles.modalText}>This Reminder is locked, by proceeding you will lose 100 points</Text>
                            <View style={styles.inputChooses}>
                                <TouchableHighlight
                                    style={styles.buttonSave}
                                    onPress={() => {
                                        this.setState({})
                                    }}>
                                    <Text style={styles.modalText2}>Continue</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.inputChooses}>
                                <TouchableHighlight
                                    style={styles.buttonQuit}
                                    onPress={() => {
                                        this.setState({ overlayVisible: false });
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
}
