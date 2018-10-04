import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    AppRegistry,
    Animated,
    TouchableWithoutFeedback,
    Alert,
    Modal,
    TouchableHighlight,
} from 'react-native';
import {LinearGradient} from 'expo';
import { Icon } from 'react-native-elements'


const list = [
    {
        reminder: 'workout',
        date: '02-10-18',
        time: '10:15',
        lock: 'lock-open',
        color: ['#14bf69','#17cf94'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '03-10-18',
        time: '10:15',
        lock: 'lock-open',
        color: ['#14bf69','#17cf94'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '07-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
    {
        reminder: 'workout',
        date: '10-10-18',
        time: '10:15',
        lock: 'lock',
        color: ['#CF2A39','#ff5a4b'],
        img: require('../assets/images/something.jpg')
    },
];



export default class Reminders extends React.Component{
    static navigationOptions = {
        title: 'Reminders',
    };

    state = {
        modalVisible: false,
        cameraModalVisible: false,
    };

    setModalVisible(visible,color) {
        if(color === ['#14bf69','#17cf94']){
            /*Alert.alert('Are u shure MATE',""+color);*/
        }else{
            /*Alert.alert('U are shure MATE',"DON'T");*/
            this.setState({modalVisible: visible});
        }
    }

    setCameraModalVisible(visible){
        this.setState({cameraModalVisible: visible});
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setCameraModalVisible(true);
                                }}>
                                <Text style={styles.modalText}>Camera</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible,["#000","#000"]);
                                }}>
                                <Text style={styles.modalText}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.cameraModalVisible}
                        onRequestClose={() => {
                            this.setCameraModalVisible(!this.state.cameraModalVisible);
                        }}>
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text style={styles.modalText}>Hello Camera!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setCameraModalVisible(!this.state.cameraModalVisible,["#000","#000"]);
                                    }}>
                                    <Text style={styles.modalText}>Hide second Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </Modal>
                {
                    list.map((l, i) => (
                        <View style={styles.item} key={i}>
                            <View style={styles.shadow}>
                                <TouchableHighlight
                                    onPress={() => {this.setModalVisible(true,l.color);}}>
                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={l.color}
                                        style={styles.gradient}>
                                        <View style={styles.lock} >
                                            <Icon name={l.lock} />
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
        );
    }
}

styles = StyleSheet.create({
    lock:{
        paddingHorizontal:20,
    },
    img:{
        width: 70,
        height:70,
        margin: 0,
        marginHorizontal:0,
        borderRadius:10,
    },
    info1:{
        flex: 1,
        flexDirection: 'column',
    },
    item:{
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
    },
    shadow:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        marginLeft: 5,
        marginRight: 5,
        marginHorizontal: 50,
        width:400,
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
    modalText:{
        margin: 10,
        fontSize: 27,
        color: '#000',
        textAlign: 'center',
    }
});
