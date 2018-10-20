import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';
import Cam from '../components/Cam.js'
import {Kaede} from 'react-native-textinput-effects';
import createStyles from '../styles/ModalNewReminderStyle.js'
import { ImageManipulator, MediaLibrary, Notifications, Location} from "expo";
import DateTimePicker from "react-native-modal-datetime-picker";
import util from './Util';


const styles = createStyles();

export default class ModalNewReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            icon: null,
            textValue:null,
            dateValue:null,
            dateValueMilliseconds: null,
            location:null,
            modalVisible: false,
            cameraModalVisible: false,
            hasCameraPermission: null,
            hasLocationPermission: null,
            hasNotificationPermission: null,
            displayImage: 1,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        /*this._handleLocation();*/  //<--  Not allowed anymore
        if (nextProps.modalVisible !== prevState.modalVisible
            || nextProps.hasCameraPermission !== prevState.hasCameraPermission
            || nextProps.hasNotificationPermission !== prevState.hasNotificationPermission
            || nextProps.location !== prevState.location) {
            return ({ modalVisible: nextProps.modalVisible,
                hasCameraPermission: nextProps.hasCameraPermission,
                hasNotificationPermission: nextProps.hasNotificationPermission,
                location: nextProps.location})
        }
        return (prevState);
    }

    _setNewReminderModalVisible = (visible) => this.setState({modalVisible: visible});

    _setCameraModalVisible = (visible) => this.setState({cameraModalVisible: visible});

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handlePictureTaken = async (uri) => this.setState({ img: await util.savePicture(uri), displayImage: 200});

    _createReminder = () => util.createReminder(this.state.textValue,this.state.dateValue,this.state.dateValueMilliseconds,this.state.img,this.state.location,this.state.hasNotificationPermission).then(() => this._handleExit());

    _handleExit = () => { 
        this.setState({ img: null, icon: null, textValue: null, dateValue: null, dateValueMilliseconds: null, location: null });
        this.props.refresh();
        this.props.setClose(false);
    }

    _handleDatePicked = (date) => {
        this.setState({dateValue: date.toString().split('GMT')[0].replace(/([0-9]{4})/g, ''), dateValueMilliseconds:date.getTime()});
        this._hideDateTimePicker();
    };

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.props.setClose(false);
                }}>
                <View style={{marginTop: 22}}>
                    <ScrollView>
                        <View style={styles.inputChooses}>
                            <Kaede onChangeText={(text) => { this.setState({textValue:text})} } label={'Reminder'}/>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => {
                                    this._showDateTimePicker();
                                }}>
                                <Text style={styles.modalText2}>Pick date</Text>
                            </TouchableHighlight>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                                mode='datetime'
                                minimumDate={new Date()}
                        />
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => {
                                    if (this.state.hasCameraPermission) this._setCameraModalVisible(true);
                                    else alert("You haven't given us permission to use the camera :(");
                                }}>
                                <Text style={styles.modalText2}>Add image hint</Text>
                            </TouchableHighlight>
                        </View>
                        <ScrollView style={{ height: this.state.displayImage }}>
                            <Image
                                style={{ flex: 1, aspectRatio: 4 / 5 }}
                                source={{isStatic: true, uri: this.state.img}}
                            />
                        </ScrollView>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonSave}
                                onPress={() => {
                                    if(!this.state.textValue) alert("Reminder field cannot be empty!");
                                    else if(!this.state.dateValue) alert("Please choose a date");
                                    else this._createReminder();
                                }}>
                                <Text style={styles.modalText2}>Save</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonQuit}
                                onPress={() => this._handleExit()}
                            >
                                <Text style={styles.modalText2}>Go back</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.cameraModalVisible}
                    onRequestClose={() => {
                        this._setCameraModalVisible(!this.state.cameraModalVisible);
                    }}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={styles.camera}>
                            <Cam hasPermission={this.state.hasCameraPermission}
                                 setPicture={this._handlePictureTaken}
                                 hide={() => {
                                     this._setCameraModalVisible(!this.state.cameraModalVisible);
                                 }}/>
                        </View>
                    </View>
                </Modal>
            </Modal>
        );
    }
}

