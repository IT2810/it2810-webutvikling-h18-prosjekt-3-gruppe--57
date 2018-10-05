import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import{Container,Content,Header,Item,Icon,Input,Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, Permissions, MediaLibrary } from 'expo';

export default class Cam extends React.Component {
    //Waiting for permission will cause the camera to just display a black screen
    //because of this we need to ask for permissions elsewhere and pass them as props
    constructor(props){
        super(props);
        this.state = {
            hasPermission: true,
            type: Camera.Constants.Type.back,
            img: null,
        }
    }
    

/*     async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({ hasPermission: status === 'granted', mounted:true});
    }


    componentWillUnmount() {
        this.setState({mounted: false});
    } */

    snap = async () => {
        if (this.camera) {
            const { uri } = await this.camera.takePictureAsync();
            console.log(uri);
            const asset = await MediaLibrary.createAssetAsync(uri);
            MediaLibrary.createAlbumAsync('Remindr', asset)
                .then(() => {
                    console.log('Album created!');
                })
                .catch(error => {
                    console.log('err', error);
                });
            //this.setState({img:photo});
        }
    };

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
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => { this.camera = ref; }} style={styles.container} type={this.state.type}>
                        <View style={styles.content}>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    alert("PARTY TIME");
                                }}
                                name="cannabis" style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
                            </MaterialCommunityIcons>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    this.snap();
                                }}
                                name="circle-outline"
                                style={{ color: 'white', fontSize: 100 }}
                            ></MaterialCommunityIcons>
                            <MaterialCommunityIcons
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back ?
                                            Camera.Constants.Type.front :
                                            Camera.Constants.Type.back
                                    })
                                }}
                                name="camera-party-mode" style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>
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
        borderColor:'blue',
        borderWidth: 10,
    },
    content:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 25,
        maxHeight: 120,
    }
});
