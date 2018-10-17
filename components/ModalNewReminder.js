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
import Storage from './Storage.js';
import { ImageManipulator, MediaLibrary, Notifications} from 'expo';
import DateTimePicker from "react-native-modal-datetime-picker";


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
            modalVisible: false,
            cameraModalVisible: false,
            hasPermission: props.hasPermission,
        };
        this.setPicture = this.setPicture.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({modalVisible: props.modalVisible})
    }

    _setNewReminderModalVisible = (visible) => this.setState({modalVisible: visible});

    _setCameraModalVisible = (visible) => this.setState({cameraModalVisible: visible});

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({dateValue: date.toString().split('GMT')[0].replace(/([0-9]{4})/g, ''), dateValueMilliseconds:date.getTime()});
        this._hideDateTimePicker();
    };

    async setPicture(uri) {
        const icon = await ImageManipulator.manipulate(uri, [{ resize: { width: 50, height: 50 } }]);
        const img = await ImageManipulator.manipulate(uri, [], { compress: 0.2 });
        console.log("creating assets");
        const assetIcon = await MediaLibrary.createAssetAsync(icon.uri);
        const assetImg = await MediaLibrary.createAssetAsync(img.uri);

        console.log('Creating album...');
        MediaLibrary.createAlbumAsync('Remindr', assetIcon)
            .then((album) => {
                console.log('Adding assets...');
                MediaLibrary.addAssetsToAlbumAsync(assetImg, album.id)
                    .then(() => {
                        console.log('Done');
                    })
                    .catch(error => {
                        console.log('An error occured adding assets: ', error);
                    });
            })
            .catch(error => {
                console.log('An error occured creating album: ', error);
            });

        this.setState({img: assetImg.uri, icon: assetIcon.uri});
    }

    async createReminder(reminder,date,time,img){
        const localNotification = { title: "Hello", body: "You have scheduled a reminder for "+date, ios: { sound: true }, android: { sound: true, //icon (optional) (string) — URL of icon to display in notification drawer.
            //color (optional) (string) — color of the notification icon in notification drawer.
            priority: "high", sticky: false, vibrate: true } };
        let notificationID = null;
        if(time - new Date().getTime() > 3600000){
            const when = time - 3600000;
            notificationID = await Notifications.scheduleLocalNotificationAsync(localNotification, { time: when }); //schedules a notification two hours before reminder
        }     
        let bourne_identity = await Storage.generateID();
        let obj = {
            id: bourne_identity,
            reminder: reminder,
            date: date,
            dateMilliseconds: time,
            locked: true,
            img: img,
            imgHint: false,
            textHint: false,
            attempts: 0,
            notification: notificationID,
        }
        let rtr = await Storage.setReminder(obj);
    }

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
                                    this._setCameraModalVisible(true);
                                }}>
                                <Text style={styles.modalText2}>Add image hint</Text>
                            </TouchableHighlight>
                        </View>
                        <ScrollView style={{height:200}}>
                            <Image
                                style={styles.image}
                                source={{isStatic: true, uri: this.state.img}}
                            />
                        </ScrollView>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonSave}
                                onPress={() => {
                                    if(!this.state.textValue) alert("Reminder field cannot be empty!");
                                    else if(!this.state.dateValue) alert("Please choose a date");
                                    else{
                                        this.createReminder(this.state.textValue, this.state.dateValue, this.state.dateValueMilliseconds, this.state.img)
                                            .then(() => {
                                                this.setState({ img: null, icon: null, textValue: null, dateValue: null, dateValueMilliseconds: null });
                                                this.props.refresh();
                                                this.props.setClose(false);
                                            });
                                    }
                                }}>
                                <Text style={styles.modalText2}>Save</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonQuit}
                                onPress={() => {
                                    this.setState({img:null, icon:null, textValue: null, dateValue: null, dateValueMilliseconds: null});
                                    this.props.setClose(false);
                                }}>
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
                            <Cam hasPermission={this.state.hasPermission}
                                 setPicture={this.setPicture}
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

