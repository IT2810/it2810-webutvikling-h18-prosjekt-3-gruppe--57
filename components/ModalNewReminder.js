import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';
import Cam from '../components/Cam.js'
import ActionButton from 'react-native-action-button';
import {Kaede} from 'react-native-textinput-effects';
import createStyles from '../styles/ReminderStyle.js'

const styles = createStyles();
let openModal = false;
let cameraOpen = false;

export default class ModalNewReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            icon: null,
            cameraModalVisible: false,
            hasPermission: props.hasPermission,
        };
        this.setPicture = this.setPicture.bind(this);
        console.log("ModalVisible inside the constructor: "+this.state.modalVisible)
    }


    setNewReminderModalVisible(visible) {
        this.setState({modalVisible: visible});
        openModal = false;
    }

    setCameraModalVisible(visible) {
        this.setState({cameraModalVisible: visible});
        cameraOpen = visible;
        openModal = true;
    }

    setPicture(image, ic){
        this.setState({img:image,icon:ic});
    }

    render() {
        if ((!openModal && !cameraOpen)){
            openModal = true;
        }else{
            openModal = false;
        }
        console.log("The open Modal variable: "+openModal);
        console.log("Render of Modal");
        console.log("ModalVisible inside the render: "+this.props.modalVisible);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={!openModal}
                onRequestClose={() => {
                    this.setNewReminderModalVisible(false);
                }}>
                <View style={{marginTop: 22}}>
                    <ScrollView>
                        <View style={styles.inputChooses}>
                            <Kaede label={'Reminder'}/>
                        </View>
                        <Image
                            style={{width: 200, height: 200 }}
                            source={{isStatic:true, uri: this.state.img }}
                        />
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={() => {
                                    this.setCameraModalVisible(true);
                                }}>
                                <Text style={styles.modalText2}>Add image hint</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonSave}
                                onPress={() => {
                                    this.setNewReminderModalVisible(false);
                                }}>
                                <Text style={styles.modalText2}>Save</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonQuit}
                                onPress={() => {
                                    this.setNewReminderModalVisible(false);
                                }}>
                                <Text style={styles.modalText2}>Quit</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.cameraModalVisible}
                    onRequestClose={() => { this.setCameraModalVisible(!this.state.cameraModalVisible);}}>
                    <View style={{flex:1,alignItems:"center"}}>
                        <View style={styles.camera}>
                            <Cam hasPermission={this.state.hasPermission}
                                 setPicture={this.setPicture}
                                 hide={() => {this.setCameraModalVisible(!this.state.cameraModalVisible);}}/>
                        </View>
                    </View>
                </Modal>
            </Modal>
        );
    }
}

