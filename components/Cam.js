import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import{Container,Content,Header,Item,Icon,Input,Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, Permissions } from 'expo';

const whiteList = ['auto','sunny','cloudy','shadow','fluorescent','incandescent'];
let index = 0;
export default class Cam extends React.Component {
    //Waiting for permission will cause the camera to just display a black screen
    //because of this we need to ask for permissions elsewhere and pass them as props
    constructor(props){
        super(props);
        this.state = {
            hasPermission: props.hasPermission,
            type: Camera.Constants.Type.back,
            mode: whiteList[0],
            img: null,
        }
    }

    snap = async () => {
        if (this.camera) {
            const { uri } = await this.camera.takePictureAsync({skipProcessing:true});
            return uri;
        }
    };

    render() {
        const hasPermission = this.state.hasPermission;
        if (hasPermission === null) {
            return <Text> Awaiting permissions...</Text>
        }
        else if (hasPermission === false) {
            return <Text> No access to camera or camera roll</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={styles.container} type={this.state.type} ref={ref => this.camera = ref} whiteBalance={this.state.mode}>
                        <View style={styles.content}>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    this.setState({
                                        mode: whiteList[index++ % whiteList.length]
                                    });
                                }}
                                name="cannabis" style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
                            </MaterialCommunityIcons>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    this.snap().then((res) => {
                                        this.props.setPicture(res);
                                        this.props.hide(); //return after taking picture
                                    })
                                }}
                                name="circle-outline"
                                style={styles.mainButton}>
                            </MaterialCommunityIcons>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back ?
                                            Camera.Constants.Type.front :
                                            Camera.Constants.Type.back
                                    })
                                }}
                                name="camera-party-mode" style={styles.sideButtons}>
                            </MaterialCommunityIcons>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    content:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 120,
    },
    sideButtons:{
        color:'white',
        fontWeight:'bold',
        fontSize:50,
        marginBottom:5,
    },
    mainButton:{
        fontSize:100,
        color:'white',
        marginBottom:30,
        marginHorizontal:30,
    }
});
