import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {CashListProvider} from './src/contexts/CashContext';
import Router from './src/router';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import theme from './src/utils/themes';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CashListProvider>
        <PaperProvider theme={theme}>
          <Router />
        </PaperProvider>
      </CashListProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
