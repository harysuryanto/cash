import {Text, View} from 'react-native';
import {Cash, CashType} from '../../../interfaces/cash';

const CashListTile = (cash: Cash) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          marginEnd: 12,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          backgroundColor:
            cash.type === CashType.Out ? 'lightblue' : 'lightgreen',
          borderRadius: 16,
        }}>
        <Text>{cash.type.toUpperCase()}</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Rp{cash.amount}</Text>
          {cash.type === CashType.Out && (
            <Text
              style={{
                marginStart: 12,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
                backgroundColor: '#ddd',
                borderRadius: 16,
              }}>
              {cash.category}
            </Text>
          )}
        </View>
        <Text>
          {cash.date.getDate()}/{cash.date.getMonth() + 1}/
          {cash.date.getFullYear()}, {cash.date.getHours()}:
          {cash.date.getMinutes()}
          {cash.notes && ' • ' + cash.notes}
        </Text>
      </View>
    </View>
  );
};

export default CashListTile;
