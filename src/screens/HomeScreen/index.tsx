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
            <MenuItem title="Catat Aliran Uang" faIcon={faMoneyBillTransfer} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

type MenuItemProp = {title: string; faIcon: IconDefinition};

const MenuItem = (prop: MenuItemProp) => {
  return (
    <View
      style={{
        alignItems: 'center',
        borderColor: colors.border,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        padding: 40,
      }}>
      <FontAwesomeIcon icon={prop.faIcon} style={{width: 60, height: 60}} />
      <Gap height={15} />
      <Text>{prop.title}</Text>
    </View>
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
