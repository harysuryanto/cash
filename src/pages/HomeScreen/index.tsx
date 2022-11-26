import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppBar} from '../../components';
import {colors} from '../../utils/colors';
import CashInScreen from '../CashInScreen';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <AppBar />
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>Rp230.000</Text>
        <Text style={styles.title}>Saldo</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 30,
        }}>
        <MenuItem title="Catat Uang Masuk" />
        <View style={{width: 20}} />
        <MenuItem title="Catat Uang Keluar" />
      </View>
      <CashInScreen />
    </ScrollView>
  );
};

const MenuItem = ({title}: {title: string}) => {
  return (
    <TouchableOpacity
      onPress={() => alert('hai')}
      style={{
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        padding: 40,
      }}>
      <View
        style={{
          backgroundColor: colors.yellow,
          height: 50,
          marginBottom: 15,
          width: 50,
        }}></View>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceContainer: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 30,
    marginHorizontal: 30,
    padding: 50,
  },
  balance: {
    fontSize: 36,
  },
  title: {
    fontSize: 14,
  },
});

export default HomeScreen;
