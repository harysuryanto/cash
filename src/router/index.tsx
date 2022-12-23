import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CashFlowScreen, HomeScreen} from '../screens';
import {StatusBar} from 'expo-status-bar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faMoneyBills} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainAppScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: icon => (
            <FontAwesomeIcon
              icon={faHome}
              color={icon.color}
              size={icon.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CashFlowScreen"
        component={CashFlowScreen}
        options={{
          title: 'Cash Flow',
          headerShown: false,
          tabBarIcon: icon => (
            <FontAwesomeIcon
              icon={faMoneyBills}
              color={icon.color}
              size={icon.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="MainAppScreen"
          component={MainAppScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Router;
