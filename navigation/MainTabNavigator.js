import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RemindersScreen from '../screens/Reminders';
import CompletedScreen from '../screens/Completed';

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
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
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
                ? `ios-list${focused ? '' : '-outline'}`
                : 'md-list'}
        />
    ),
};

const CompletedStack = createStackNavigator({
    Completed: CompletedScreen,
});

CompletedStack.navigationOptions = {
    tabBarLabel: 'Completed',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios'
                ? `ios-checkmark-circle-outline${focused ? '' : '-outline'}`
                : 'md-checkmark-circle-outline'}
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    RemindersStack,
    CompletedStack
});
