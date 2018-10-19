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
import { Overlay } from 'react-native-elements';
import { MapView } from 'expo';
import createStyles from '../styles/ModalInspectStyle.js';
import Storage from '../components/Storage';
import Score from '../components/Score';
import layout from '../constants/Layout';
import { Marker } from 'react-native-maps';

const styles = createStyles();

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
            location: null,
            displayImage: 1,
            displayMap:'none',
        };
    }

    componentWillReceiveProps(props){
        this.setState({modalVisible: props.modalVisible,
                        id:props.id})
    }

    setImage(){
        Storage.getReminder(this.state.id).then((reminder) => {
            if(reminder.img != null){
                Score.updatePenalties(this.state.id, 'imgHint');
                this.setState({ img: reminder.img, displayImage: 200 });
            }else{
                alert("Sorry, no image was provided to this reminder");
            }
        });
    }

    setLocation(){
        Storage.getReminder(this.state.id).then((reminder)=>{
            if(reminder.location != null){
                Score.updatePenalties(this.state.id, "mapHint");
                this.setState({ location: reminder.location, displayMap:'flex'});
            }else{
                alert("No location was recorded for this reminder, you probably haven't given us permission to use the gps");
            }
        })
    }
    
    deleteItem(){
        Storage.deleteReminder(this.state.id).then(() => { 
            this.props.refresh();
            this.props.setClose(false)
        });
    }

    updateScore(failed=false){
        Score.updateScore(this.state.id,failed).then(()=>{
            this.setState({id:false, img:null, textValue:null, result:null, displayImage: 1, displayMap: 'none'});
            this.props.refresh();
            this.props.setClose(false);
        });
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
                    <ScrollView style={{ height: this.state.displayImage }}>
                        <Image
                            style={{flex: 1,aspectRatio: 4 / 5}}
                            source={{ isStatic: true, uri: this.state.img }}
                        />
                    </ScrollView>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.setLocation()
                            }}>
                            <Text style={styles.modalText2}>View location Hint</Text>
                        </TouchableHighlight>
                    </View>
                    <MapView
                        style={{ flex: 1, width: layout.window.width, height: 200, display:this.state.displayMap }}
                        region={this.state.location}
                    >
                        {this.state.location === null ? <View /> : <Marker
                            key={this.state.id}
                            title={"Hello"}
                            description={"Recorded location"}
                            coordinate={this.state.location}
                        /> }
                    </MapView>
                    <View style={styles.inputChooses}>
                        <TouchableHighlight
                            style={styles.buttonSave}
                            onPress={() => {
                                if(!this.state.textValue) alert("Input field is empty");
                                else{
                                    this.compareInput(this.state.textValue).then((res) => {
                                        if (res) {
                                            alert("Correct!");
                                            this.setState({ displayMap: 'none' });
                                            this.updateScore();
                                        } else {
                                            alert("Incorrect!");
                                            Score.incrementAttempts(this.state.id); 
                                        }
                                    });
                                }         
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
                                this.setState({displayMap:'none', img: null, displayImage: 1});
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