import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/AppBar';
import {faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';
import {MenuGridTile} from './components/MenuGridTile';
import {useContext, useEffect} from 'react';
import {CashListContext} from '../../contexts/CashContext';
import {Cash, CashType} from '../../interfaces/cash';
import {formatCurrency} from '../../utils/utils/formatter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import Gap from '../../components/Gap';
import * as Updates from 'expo-updates';

const HomeScreen = (props: any) => {
  const theme = useTheme();

  const cashListContext = useContext(CashListContext);

  const getBalance = () => {
    let cashList = cashListContext.cashList;
    let totalCashIn = cashList
      .filter(cash => cash.type === CashType.In)
      .reduce((sum, current) => sum + current.amount, 0);
    let totalCashOut = cashList
      .filter(cash => cash.type === CashType.Out)
      .reduce((sum, current) => sum + current.amount, 0);
    return formatCurrency(totalCashIn - totalCashOut);
  };

  const loadCashListFromStorage = async () => {
    try {
      await AsyncStorage.getItem('cashList').then(value => {
        const savedCashList = JSON.parse(value ?? '[]') as Cash[];

        // Prevent loading already loaded data
        if (cashListContext.cashList.length !== 0) return;

        const formatedCashList = savedCashList.map(value => {
          return {
            ...value,
            id: uuidv4(),
          } satisfies Cash;
        });
        cashListContext.addCashAll(formatedCashList);
      });
    } catch (e) {}
  };

  const handleAppUpdates = async () => {
    Updates.addListener(event => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        Alert.alert(
          'Update available',
          'Please restart your app to apply updates.',
          [
            {
              text: 'Update',
              onPress: () => Updates.reloadAsync(),
            },
            {
              text: 'Not now',
            },
          ],
        );
      }
    });
  };

  useEffect(() => {
    loadCashListFromStorage();
    handleAppUpdates();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <ScrollView>
        <AppBar />
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>{getBalance()}</Text>
          <Text style={styles.title}>Balance</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text>Cash flow charts here.</Text>
          <Text>Has 3 filters: All, Spending, and Earning.</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text>Rp 89000</Text>
          <Text>Most wasted money in a day</Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
          <TouchableRipple
            borderless={true}
            style={{flex: 1, borderRadius: 20}}
            onPress={() => props.navigation.navigate('CashFlowScreen')}>
            <MenuGridTile
              title="Track Cash Flow"
              faIcon={faMoneyBillTransfer}
            />
          </TouchableRipple>
        </View>
        <Gap height={30} />
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
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  balance: {
    fontSize: 36,
  },
  title: {
    fontSize: 14,
  },
});

export default HomeScreen;
