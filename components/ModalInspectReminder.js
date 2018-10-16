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
import { Icon, Overlay } from 'react-native-elements';
import createStyles from '../styles/ModalInspectStyle.js';
import Storage from '../components/Storage';
import Score from '../components/Score';

const styles = createStyles();
let openModal = false;

export default class ModalInspectReminder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            id:false,
            img: null,
            textValue: null,
            result: null,
            overlayVisible: false,
        };
    }

    componentWillReceiveProps(props){
        this.setState({modalVisible: props.modalVisible,
                        id:props.id})
    }

    setImage(){
        if(this.state.img){
            Storage.getReminder(this.state.id).then((reminder) => {
                Score.updatePenalties(this.state.id, 'imgHint');
                this.setState({ img: reminder.img });
            });
        }else{
            alert("Sorry, no image was provided for this reminder");
        }
        
    }
    
    deleteItem(){
        Storage.deleteReminder(this.state.id).then(() => { 
            this.props.refresh();
            this.props.setClose(false)
        });
    }

    updateScore(failed=false){
        Score.updateScore(this.state.id,failed).then(()=>{
            this.props.refresh();
            this.props.setClose(false);
        });
    }

    updateAttempts(){
        Score.incrementAttempts(this.state.id); 
    }

    async compareInput(input){
        const reminder = await Storage.getReminder(this.state.id);
        //Apparently localeCompare does not work properly in react native, reverted to simple uppercase comparison
        //reminder.reminder.localeCompare(input, 'en', { sensitivity: 'base', caseFirst: false});
        if(reminder.reminder.toUpperCase() === input.toUpperCase()) return true;
        return false;
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
                    <View style={styles.inputChooses}>
                        <Kaede onChangeText={(text) => { this.setState({ textValue: text }) }} label={'Remember your reminder?'}/>
                    </View>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.setImage()
                            }}>
                            <Text style={styles.modalText2}>View Image Hint</Text>
                        </TouchableHighlight>
                    </View>
                    <ScrollView style={{ height: 200 }}>
                        <Image
                            style={styles.image}
                            source={{ isStatic: true, uri: this.state.img }}
                        />
                    </ScrollView>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonSave}
                            onPress={() => {
                                this.compareInput(this.state.textValue).then((res)=>{
                                    if(res){
                                        alert("Correct!");
                                        this.updateScore();
                                    }else{
                                        alert("Incorrect!");
                                        this.updateAttempts();
                                    }
                                });
                            }}>
                            <Text style={styles.modalText2}>Check</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonQuit}
                            onPress={() => {
                                this.setState({overlayVisible:true});
                            }}>
                            <Text style={styles.modalText2}>Give up</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonQuit}
                            onPress={() => {
                                this.props.setClose(false);
                            }}>
                            <Text style={styles.modalText2}>Go back</Text>
                        </TouchableHighlight>
                    </View>
                    <Overlay
                        isVisible={this.state.overlayVisible}
                        windowBackgroundColor="rgba(255, 255, 255, .8)"
                        height="auto"
                    >
                        <View>
                            <Text style={styles.modalText}>By proceeding you will lose 1000 points, continue?</Text>
                            <View style={styles.inputChooses}>
                                <TouchableHighlight
                                    style={styles.buttonSave}
                                    onPress={() => {
                                        this.setState({ overlayVisible: false });
                                        this.updateScore(true);
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
                </ScrollView>
            </Modal>
        );
    }
}