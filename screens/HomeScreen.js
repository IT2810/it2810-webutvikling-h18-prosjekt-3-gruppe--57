import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {WebBrowser} from 'expo';
import {LinearGradient} from 'expo';
import * as Progress from 'react-native-progress';

const list = [
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    },
    {
        title: 'workout',
        date: '02-10-18',
        time: '10:15',
        img: require('../assets/images/schwarzenegger.png')
    }
];

export default class HomeScreen extends React.Component {
<<<<<<< HEAD
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>
=======
    static navigationOptions = {
        header: null,
    };
>>>>>>> e1b8dfbfdf87dd1438cd94b14f467343f2de497a

    render() {
        return (
            <ScrollView style={styles.container}>
                {
                    list.map((l, i) => (
                        <View style={styles.itemss} key={i}>
                            <View style={styles.shadow}>
                                <LinearGradient
                                    colors={['#17cf94', '#14bf69','#17cf94']}
                                    style={styles.gradient}>
                                    <Text style={styles.getStartedText} >
                                        {l.title}
                                    </Text>
                                    <View styles={styles.diagram}>
                                        <Progress.Circle color={'#fff'} size={150} borderWidth={1} progress={0.4} showsText={true} thickness={5}/>
                                    </View>
                                    <Text style={styles.getStartedText}>
                                        {l.date}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

const styles = StyleSheet.create({
    itemss:{
        alignItems: 'center',
        marginBottom: 30,
    },
    diagram:{
        alignItems: 'center',
        paddingBottom:20,
        borderWidth: 2,
        borderColor: '#1ada00',
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
        marginTop: 70,
        marginHorizontal: 50,
        width:400,
    },
    gradient: {
        borderRadius: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    getStartedText: {
        margin: 10,
        fontSize: 27,
        color: '#ffffff',
        textAlign: 'center',
        /*borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1ada00',*/
    },
});
