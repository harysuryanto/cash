import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CashFlowScreen, HomeScreen} from '../screens';
import {adaptNavigationTheme} from 'react-native-paper';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Router = () => {
  const {LightTheme} = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CashFlowScreen"
          component={CashFlowScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
