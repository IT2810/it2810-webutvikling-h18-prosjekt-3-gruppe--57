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

  componentWillMount(){
    Storage.getAll().then((res) => {
      this.setState({reminders: res});
    })
  }
  
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
}

