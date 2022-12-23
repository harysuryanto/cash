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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMoneyBillTransfer,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Gap from '../../components/Gap';
import {MenuGridTile} from './components/MenuGridTile';

const HomeScreen = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppBar />
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>Rp230.000</Text>
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
