import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppBar} from '../../components';
import {colors} from '../../utils/colors';

const CashIn = () => {
  return (
    <View style={styles.container}>
      <CashInListTile cash={4000} dateTime={1666958617333} />
      <CashInListTile cash={4500} dateTime={1666958417333} />
      <CashInListTile cash={6000} dateTime={1666958217333} />
    </View>
  );
};

const CashInListTile = ({cash, dateTime}: {cash: number; dateTime: number}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 30,
        marginBottom: 10,
      }}>
      <View>
        <Text>Rp{cash}</Text>
        <Text>{dateTime}</Text>
      </View>
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

export default CashIn;
