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

export default class ModalExample extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        if ((!openModal)){
            openModal = true;
        }else{
            openModal = false;
        }
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}