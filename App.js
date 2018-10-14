import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Modal} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Storage from './components/Storage';
import ModalWelcome from './components/ModalWelcome'

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        modalVisible: false,
        setClose: function(visible) {
            this.setState({modalVisible:visible});
        },
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            Storage.getItem(Expo.Constants.installationId).then((res)=>{
                if(res != null) return
                this.setState({ modalVisible: true});
                Storage.setItem(Expo.Constants.installationId,{
                    id: Expo.Constants.installationId,
                    score: 0, 
                    reminders: [],
                    successful: [],
                    failed: [],
                });
            });
            return (
                <View style={styles.container}>
                    <ModalWelcome modalVisible={this.state.modalVisible} setClose={this.state.setClose.bind(this)}/>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    <AppNavigator/>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'Arial': require('./assets/fonts/arial.ttf')
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
