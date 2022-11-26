import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Router from './src/router';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Router />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
