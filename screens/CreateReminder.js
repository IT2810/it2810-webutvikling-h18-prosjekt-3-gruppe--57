import React from 'react';
import { ScrollView, StyleSheet, TextInput, Text,View,TouchableOpacity} from 'react-native';

export default class CreateReminder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: 'hello'
        };
    }

    static navigationOptions = {
        title: 'Create',
    };


    render() {
        return(
            <View>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({ text })}
                />
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}