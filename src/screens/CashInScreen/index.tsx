import {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {Cash} from '../../interfaces/cash';
import {colors} from '../../utils/colors';

const CashInScreen = () => {
  const [cashInList, setCashInList] = useState<Array<Cash>>([
    {
      id: 1,
      date: new Date('2022/10/26'),
      type: 'in',
      category: null,
      amount: 3000,
      notes: 'Gajian',
    },
    {
      id: 2,
      date: new Date(),
      type: 'out',
      category: 'basic needs',
      amount: 4000,
    },
    {
      id: 3,
      date: new Date(),
      type: 'out',
      category: 'desire',
      amount: 5000,
      notes: 'Donation',
    },
    {
      id: 4,
      date: new Date(),
      type: 'out',
      category: 'investment',
      amount: 6000,
      notes: 'Deposit Ajaib',
    },
  ]);
  const [inputAmount, setInputAmount] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    let temp = [...cashInList];
    temp.push({
      id: new Date().getMilliseconds(),
      date: new Date(),
      type: 'in',
      category: null,
      amount: Number.parseFloat(inputAmount),
    });
    setCashInList(temp);
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={cashInList}
        renderItem={({item}) => (
          <CashInListTile
            id={item.id}
            amount={item.amount}
            date={item.date}
            category={item.category}
            type={item.type}
            notes={item.notes}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Add" onPress={toggleBottomNavigationView} />
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <Text>Insert cash amount</Text>
          <TextInput
            autoFocus={true}
            placeholder="Insert cash amount"
            value={inputAmount.toString()}
            onChangeText={text => setInputAmount(text)}
            onSubmitEditing={() => {
              handleSubmit();
              toggleBottomNavigationView();
              setInputAmount('');
            }}
            keyboardType="number-pad"
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const CashInListTile = ({id, date, type, category, amount, notes}: Cash) => {
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
          backgroundColor: type === 'out' ? 'lightblue' : 'lightgreen',
          borderRadius: 16,
        }}>
        <Text>{type.toUpperCase()}</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Rp{amount}</Text>
          {type === 'out' && (
            <Text
              style={{
                marginStart: 12,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
                backgroundColor: '#ddd',
                borderRadius: 16,
              }}>
              {category}
            </Text>
          )}
        </View>
        <Text>
          {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()},{' '}
          {date.getHours()}:{date.getMinutes()}
          {notes && ' • ' + notes}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
  },
});

export default CashInScreen;
