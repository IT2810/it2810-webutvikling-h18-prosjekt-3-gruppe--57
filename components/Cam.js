import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import{Container,Content,Header,Item,Icon,Input,Button} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, Permissions, ImageManipulator, MediaLibrary} from 'expo';

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
            const { uri } = await this.camera.takePictureAsync();
            const icon = await ImageManipulator.manipulate(uri, [{ resize: { width: 50, height: 50 } }]);
            const img = await ImageManipulator.manipulate(uri,[],{compress:0.2});
            console.log("creating assets...");
            const assetIcon = await MediaLibrary.createAssetAsync(icon.uri);
            const assetImg = await MediaLibrary.createAssetAsync(img.uri);

            MediaLibrary.createAlbumAsync('Remindr',assetIcon,false)
                .then((album) => {
                    console.log('Creating album...');
                    MediaLibrary.addAssetsToAlbumAsync(assetImg,album.id,false)
                        .then(() => {
                            console.log('Album created, adding assets...');
                        })
                        .catch(error => {
                            console.log('An error occured adding assets: ', error);
                        });
                })
                .catch(error => {
                    console.log('An error occured creating album: ', error);
                });
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
                    <Camera style={styles.container} type={this.state.type} ref={ref => this.camera = ref}>
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
                                    this.snap();
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
        borderColor:'blue',
        borderWidth: 10,
    },
    content:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    }
});
