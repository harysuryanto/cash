import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {CashListProvider} from './contexts/CashContext';
import Router from './router';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './utils/themes';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
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
