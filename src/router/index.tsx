import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CashInPage, HomePage} from '../pages';
import {StatusBar} from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainAppPage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CashInPage"
        component={CashInPage}
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
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="MainAppPage"
          component={MainAppPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Router;
