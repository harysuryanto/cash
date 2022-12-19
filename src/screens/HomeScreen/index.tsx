import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconPaths} from '../../constants';
import {colors} from '../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/AppBar';

const HomeScreen = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => props.navigation.navigate('CashInScreen')}>
            <MenuItem title="Catat Uang Masuk" iconPath={IconPaths.cashIn} />
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity style={{flex: 1}}>
            <MenuItem title="Catat Uang Keluar" iconPath={IconPaths.cashOut} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({
  title,
  iconPath: icon,
}: {
  title: string;
  iconPath: IconPaths;
}) => {
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
      <Image
        style={{width: 50, height: 50, marginBottom: 15}}
        source={{uri: icon}}
      />
      <Text>{title}</Text>
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
