import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import{Container,Content,Header,Item,Icon,Input,Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, Permissions, MediaLibrary } from 'expo';

export default class Cam extends React.Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
        img: null
    }
    _mounted = false;

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({ hasPermission: status === 'granted'});
        mounted = true;
    }


    componentWillUnmount() {
        this._mounted = false;
    }

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
        const hasCameraPermission = this.state.hasCameraPermission;
        const hasCameraRollPermission = this.state.hasCameraRollPermission;

        if (hasCameraPermission === null || hasCameraRollPermission === null) {
            return <Text> Awaiting permissions...</Text>
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else if (hasCameraRollPermission === false) {
            return <Text> No access to storage</Text>
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
