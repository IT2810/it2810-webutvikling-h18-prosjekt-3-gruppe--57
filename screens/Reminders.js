import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
    TextInput,
} from 'react-native';
import {LinearGradient, Permissions, Font} from 'expo';
import Cam from '../components/Cam.js'
import {Icon} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import {Kaede} from 'react-native-textinput-effects';


const colorUnlocked = ['#14bf69', '#17cf94'];
const colorLocked = ['#CD3F31', '#F2686B'];


const list = [
    {
        reminder: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock-open',
        locked: false,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '03-10-18',
        time: '10:15',
        lock: 'lock-open',
        locked: false,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '07-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        locked: true,
        img: require('../assets/images/something.jpg')
    },
];


export default class Reminders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            cameraModalVisible: false,
            hasPermission: null,
            img: null,
            icon: null
        };
        this.setPicture = this.setPicture.bind(this);
    }

    static navigationOptions = {
        header: null
    }; 

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({hasPermission: status === 'granted'});
    }

    setNewModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setCameraModalVisible(visible) {
        this.setState({cameraModalVisible: visible});
    }

    setPicture(image, ic){
        this.setState({img:image,icon:ic});
    }

    render() {
        const hasPermission = this.state.hasPermission;
        console.log(hasPermission);
        if (hasPermission === null) {
            return <Text> Awaiting permissions...</Text>
        }
        else if (hasPermission === false) {
            return <Text> No access to camera or camera roll</Text>
        }
        else {
            return (
                <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
                    <ScrollView style={styles.container}>
                        {/*new Modal*/}
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setNewModalVisible(!this.state.modalVisible);
                            }}>
                            <View style={{marginTop: 22}}>
                                <View>
                                    <Kaede
                                        label={'Reminder'}
                                    />
                                    <Image
                                        style={{ width: 200, height: 200 }}
                                        source={{isStatic:true, uri: this.state.img }}
                                    />
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setCameraModalVisible(true);
                                        }}>
                                        <Text style={styles.modalText}>Add a image hint</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setNewModalVisible(!this.state.modalVisible, ["#000", "#000"]);
                                        }}>
                                        <Text style={styles.modalText}>Hide Modal</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <Modal
                                animationType="fade"
                                transparent={false}
                                visible={this.state.cameraModalVisible}
                                onRequestClose={() => { this.setCameraModalVisible(!this.state.cameraModalVisible);}}>
                                <View style={styles.camera}>
                                    <Cam hasPermission={this.state.hasPermission} setPicture={this.setPicture} hide={()=>{this.setCameraModalVisible(!this.state.cameraModalVisible);}}></Cam>
                                </View>
                            </Modal>
                        </Modal>
                        {
                            list.map((l, i) => (
                                <View style={styles.item} key={i}>
                                    <View style={styles.shadow}>
                                        <TouchableHighlight
                                            onPress={() => {
                                                console.log("You pressed an item.");
                                            }}>
                                            <LinearGradient
                                                start={{x: 0, y: 1}}
                                                end={{x: 1, y: 1}}
                                                colors={l.locked ? colorLocked : colorUnlocked}
                                                style={styles.gradient}>
                                                <View style={styles.lock}>
                                                    <Icon name={l.locked ? "lock" : "lock-open"}/>
                                                </View>
                                                <View style={styles.info1}>
                                                    <Text style={styles.dateText}>
                                                        {l.date}
                                                    </Text>
                                                </View>
                                                {/*<Image style={styles.img} source={l.img} blurRadius={50}/>*/}
                                            </LinearGradient>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    <ActionButton buttonColor="#000" onPress={() => {
                        this.setNewModalVisible(!this.state.modalVisible);
                    }}></ActionButton>
                </View>
            );
        }
    }
}

styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    camera: {
        flex: 1
    },
    lock: {
        paddingHorizontal: 20,
    },
    img: {
        width: 70,
        height: 70,
        margin: 0,
        marginHorizontal: 0,
        borderRadius: 10,
    },
    info1: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
        paddingHorizontal: 10,
    },
    input: {
        height: 30
    },
    shadow: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 30},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'stretch',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    dateText: {
        margin: 10,
        fontSize: 27,
        color: '#ffffff',
        textAlign: 'center',
    },
    modalText: {
        margin: 10,
        fontSize: 27,
        color: '#000',
        textAlign: 'center',
    }
});
