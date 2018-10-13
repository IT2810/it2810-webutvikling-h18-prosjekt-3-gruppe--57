import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';
import {Kaede} from 'react-native-textinput-effects';
import createStyles from '../styles/ModalWelcomeStyle.js';
import Storage from "../components/Storage.js";

const styles = createStyles();
let openModal = false;

export default class ModalWelcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    componentWillReceiveProps(props){
        this.setState({modalVisible: props.modalVisible})
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
                <ScrollView style={{marginTop: 22}}>
                    <Text style={styles.titleT}>Welcome to</Text>
                    <Text style={styles.titleB}>ReMind</Text>
                    <Text style={styles.textT}>     Our mission is not to be your ordinary TODO app.
                                                    We are aiming for improving your ability to remember tasks.
                                                    By using known methods of skill enhancers, such as using visual clues to bind memories.
                                                    We will help you structure you daily tasks and your mind.</Text>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonSave}
                            onPress={() => {
                                this.props.setClose(false);
                            }}>
                            <Text style={styles.modalText2}>Enter</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </Modal>
        );
    }
}