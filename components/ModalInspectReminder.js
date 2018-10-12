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
import createStyles from '../styles/ModalInspectStyle.js'

const styles = createStyles();
let openModal = false;

export default class ModalInspectReminder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            id:false,
        };
    }

    componentWillReceiveProps(props){
        this.setState({modalVisible: props.modalVisible,
                        id:props.id})
    }

    setImage(){
        alert("Find image! This element id: "+this.state.id);
    }

    render() {
        console.log("on render inside ModalInspect id: "+this.state.id);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.props.setClose(false);
                }}>
                <ScrollView style={{marginTop: 22}}>
                    <View style={styles.inputChooses}>
                        <Kaede label={'Remember your reminder?'}/>
                    </View>
                    <Image
                        style={{width: 200, height: 200 }}
                        source={{isStatic:true, uri: this.state.img }}
                    />
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.setImage()
                            }}>
                            <Text style={styles.modalText2}>View Image Hint</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonSave}
                            onPress={() => {
                                this.props.setClose(false);
                            }}>
                            <Text style={styles.modalText2}>Check</Text>
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
            </Modal>
        );
    }
}