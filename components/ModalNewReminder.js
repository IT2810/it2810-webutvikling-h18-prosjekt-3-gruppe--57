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
            modalVisible: false,
            cameraModalVisible: false,
            hasPermission: props.hasPermission,
        };
        this.setPicture = this.setPicture.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({modalVisible: props.modalVisible})
        this.getLocation();
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
        const assetIcon = await MediaLibrary.createAssetAsync(icon.uri);
        const assetImg = await MediaLibrary.createAssetAsync(img.uri);
        MediaLibrary.createAlbumAsync('Remindr', assetIcon)
            .then((album) => {
                MediaLibrary.addAssetsToAlbumAsync(assetImg, album.id)
                    .catch(error => {
                        console.log('An error occured adding assets: ', error);
                    });
            })
            .catch(error => {
                console.log('An error occured creating album: ', error);
            });

        this.setState({img: assetImg.uri, icon: assetIcon.uri});
    }

    async getLocation(){
        if(this.props.hasLocationPermission){
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            const coord = {
                "latitude": location.coords.latitude, "longitude": location.coords.longitude, "latitudeDelta": 0.04,
                "longitudeDelta": 0.05
            };
            this.setState({ location: coord });
        }else{
            this.setState({location:null});
        }
        
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
                                    if(!this.props.hasCameraPermission) alert("You haven't given us permission to use the camera :(");
                                    else this._setCameraModalVisible(true);
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
                                        util.createReminder(this.state.textValue, this.state.dateValue, this.state.dateValueMilliseconds, this.state.img, this.state.location)
                                            .then(() => {
                                                this.setState({ img: null, icon: null, textValue: null, dateValue: null, dateValueMilliseconds: null, location: null });
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
                                    this.setState({img:null, icon:null, textValue: null, dateValue: null, dateValueMilliseconds: null, cameraModalVisible:false, location: null});
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

