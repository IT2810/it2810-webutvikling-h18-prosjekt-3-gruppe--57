import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    Modal,
    Dimensions,
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
                <ScrollView>
                    <Text style={styles.titleT}>Welcome to</Text>
                    <Text style={styles.titleB}>ReMind</Text>
                    <Text style={styles.textT}>Our mission is not to be your ordinary TODO app.
                        By using known methods such as visual clues to bind memories, we are aiming for improving your ability to remember tasks.
                        We will help you structure you daily tasks and your mind.</Text>
                    <Text style={styles.titleT}>First:</Text>
                    <Text style={styles.textT}>Add a reminder in the Reminders tab. In the process you will be able to add a visual clue. The Image will become a hint on revisiting a reminder.</Text>
                    <View style={styles.imgView}>
                        <Image
                            style={styles.img}
                            source={require('../assets/images/ReminderTab.jpg')}
                        />
                    </View>
                    <Text style={styles.titleT}>Second:</Text>
                    <Text style={styles.textT}>For challenging your mind we give you a score incentive to avoid opening the Reminder before the do-date. As the date arrives you will be able to open the reminder and test your memory. You will resive a score depending on your performance.</Text>
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