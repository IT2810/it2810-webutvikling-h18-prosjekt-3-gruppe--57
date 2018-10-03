import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text} from 'react-native';
/* import Camera from 'react-native-camera';
 */
export default class CreateReminder extends React.Component {
    constructor(props){
        super(props);
        this.state = {text: 'hello'};
    }

    static navigationOptions = {
        title: 'Create',
    };

    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type a reminder"
                    onChangeText={(text) => this.setState({ text })}
                />

                <Text>{this.state.text} </Text>
             {/*    <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera> */}
            </View>
        );
    }
    
   /*  takePicture() {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    } */
}

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    });

