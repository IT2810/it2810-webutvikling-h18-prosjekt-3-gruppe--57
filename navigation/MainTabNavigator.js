import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RemindersScreen from '../screens/Reminders';
import CameraScreen from '../components/Cam';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};


const RemindersStack = createStackNavigator({
    Reminders: RemindersScreen,
});

RemindersStack.navigationOptions = {
    tabBarLabel: 'Reminders',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios'
                ? `ios-options${focused ? '' : '-outline'}`
                : 'md-options'}
        />
    ),
};

const CameraStack = createStackNavigator({
    Camera: CameraScreen,
});


export default createBottomTabNavigator({
    HomeStack,
    RemindersStack,
});
