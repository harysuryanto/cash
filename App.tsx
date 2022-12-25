import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {CashListProvider} from './src/contexts/CashContext';
import Router from './src/router';

export default function App() {
  return (
    <CashListProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Router />
        </View>
      </NavigationContainer>
    </CashListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
