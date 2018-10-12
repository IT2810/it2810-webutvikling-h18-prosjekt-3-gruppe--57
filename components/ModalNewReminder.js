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

const styles = createStyles();

export default class ModalNewReminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            icon: null,
            modalVisible: false,
            cameraModalVisible: false,
            hasPermission: props.hasPermission,
        };
        this.setPicture = this.setPicture.bind(this);
        console.log("ModalVisible inside the constructor: " + this.state.modalVisible)
    }

    componentWillReceiveProps(props) {
        this.setState({modalVisible: props.modalVisible})
    }


    setNewReminderModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setCameraModalVisible(visible) {
        this.setState({cameraModalVisible: visible});
    }

    setPicture(image, ic) {
        this.setState({img: image, icon: ic});
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
                            <Kaede label={'Reminder'}/>
                        </View>
                        <ScrollView style={{height:200}}>
                            <Image
                                style={styles.image}
                                source={{isStatic: true, uri: this.state.img}}
                            />
                        </ScrollView>
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
                                    this.props.setClose(false);
                                }}>
                                <Text style={styles.modalText2}>Save</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.inputChooses}>
                            <TouchableHighlight
                                style={styles.buttonQuit}
                                onPress={() => {
                                    this.props.setClose(false);
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
                    onRequestClose={() => {
                        this.setCameraModalVisible(!this.state.cameraModalVisible);
                    }}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={styles.camera}>
                            <Cam hasPermission={this.state.hasPermission}
                                 setPicture={this.setPicture}
                                 hide={() => {
                                     this.setCameraModalVisible(!this.state.cameraModalVisible);
                                 }}/>
                        </View>
                    </View>
                </Modal>
            </Modal>
        );
    }
}

