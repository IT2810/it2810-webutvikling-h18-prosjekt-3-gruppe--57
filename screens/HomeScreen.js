import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Storage from '../components/Storage';

const list = [
  {
    id: '1',
    reminder: 'workout',
    date: '02-10-18',
    time: '10:15',
    lock: 'lock-open',
    locked: false,
    img: require('../assets/images/something.jpg')
  },
  {
    id: '2',
    reminder: 'workout',
    date: '03-10-18',
    time: '10:15',
    lock: 'lock-open',
    locked: false,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'3',
    reminder: 'workout',
    date: '07-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'4',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'5',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id: '6',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'7',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'8',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'9',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'10',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
  {
    id:'11',
    reminder: 'workout',
    date: '10-10-18',
    time: '10:15',
    lock: 'lock',
    locked: true,
    img: require('../assets/images/something.jpg')
  },
];

var reminders = [];

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {reminders: []}
    this.testLocalStorage = this.testLocalStorage.bind(this);
    this.deleteStorage= this.deleteStorage.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  testLocalStorage() {
    var tmp = [];
    list.forEach(element => {
      tmp.push([element.id,JSON.stringify(element)]);
    });
    Storage.setItems(tmp).then(() =>{
      Storage.getAll().then((res) => {
        this.setState({reminders: res});
      })
    });
  }

  deleteStorage(){
    Storage.deleteAll().then(() =>{
      Storage.getAll().then((res) => {
        this.setState({reminders:res});
      })
    })
  }

  render() {
    return (
      <View>
        {
          this.state.reminders.map((l, i) => (
            <View key={i}>
              <Text> {l[1]} </Text>
            </View>
          ))
        }
        <Button onPress={this.testLocalStorage} title="Touch Me"></Button>
        <Button onPress={this.deleteStorage} title="I want to feel your body" color="red"></Button>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
