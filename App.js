import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        list: [
            {
                reminder: 'workout',
                date: '02-10-18',
                time: '10:15',
                lock: 'lock-open',
                color: ['#14bf69','#17cf94'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '03-10-18',
                time: '10:15',
                lock: 'lock-open',
                color: ['#14bf69','#17cf94'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '07-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },
            {
                reminder: 'workout',
                date: '10-10-18',
                time: '10:15',
                lock: 'lock',
                color: ['#CF2A39','#ff5a4b'],
                img: require('./assets/images/something.jpg')
            },],
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
            return (
                <View style={styles.container}>
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
