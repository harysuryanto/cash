import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/AppBar';
import {faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';
import {MenuGridTile} from './components/MenuGridTile';
import {useContext} from 'react';
import {CashListContext} from '../../contexts/CashContext';
import {CashType} from '../../interfaces/cash';

const HomeScreen = (props: any) => {
  const cashListContext = useContext(CashListContext);
  const getBalance = () => {
    let cashList = cashListContext.cashList;
    let totalCashIn = cashList
      .filter(cash => cash.type === CashType.In)
      .reduce((sum, current) => sum + current.amount, 0);
    let totalCashOut = cashList
      .filter(cash => cash.type === CashType.Out)
      .reduce((sum, current) => sum + current.amount, 0);
    return totalCashIn - totalCashOut;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppBar />
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>{`Rp ${getBalance()}`}</Text>
          <Text style={styles.title}>Saldo</Text>
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: 30}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => props.navigation.navigate('CashFlowScreen')}>
            <MenuGridTile
              title="Catat Aliran Uang"
              faIcon={faMoneyBillTransfer}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
