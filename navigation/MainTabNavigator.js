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
    tabBarLabel: 'Active',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios'
                ? `ios-options${focused ? '' : '-outline'}`
                : 'md-options'}
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
                ? `ios-options${focused ? '' : '-outline'}`
                : 'md-options'}
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    RemindersStack,
    CompletedStack
});
