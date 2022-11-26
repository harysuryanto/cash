import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CashInScreen, HomeScreen} from '../pages';
import {StatusBar} from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainAppScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CashInScreen"
        component={CashInScreen}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen name="CashOut" component={CashOut} /> */}
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
