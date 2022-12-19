import {useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Cash, CashCategory, CashType} from '../../interfaces/cash';
import {colors} from '../../utils/colors';
import {SelectList} from 'react-native-dropdown-select-list';

const CashInScreen = () => {
  const [cashInList, setCashInList] = useState<Array<Cash>>([
    {
      id: 1,
      date: new Date('2022/10/26'),
      type: CashType.In,
      category: null,
      amount: 3000,
      notes: 'Gajian',
    },
    {
      id: 2,
      date: new Date(),
      type: CashType.Out,
      category: CashCategory.BasicNeeds,
      amount: 4000,
    },
    {
      id: 3,
      date: new Date(),
      type: CashType.Out,
      category: CashCategory.Desire,
      amount: 5000,
      notes: 'Donation',
    },
    {
      id: 4,
      date: new Date(),
      type: CashType.Out,
      category: CashCategory.Investment,
      amount: 6000,
      notes: 'Deposit Ajaib',
    },
  ]);
  const [cashAmount, setCashAmount] = useState('');
  const [selectedType, setSelectedType] = useState<CashType>(CashType.In);
  const [selectedCategory, setSelectedCategory] = useState<CashCategory>(
    CashCategory.BasicNeeds,
  );
  const [notes, setNotes] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    let temp = [...cashInList];
    temp.push({
      id: new Date().getMilliseconds(),
      date: new Date(),
      type: selectedType,
      category: selectedCategory,
      amount: Number.parseFloat(cashAmount),
    });
    setCashInList(temp);

    toggleBottomNavigationView();
    setCashAmount('');
    setSelectedType(CashType.In);
    setSelectedCategory(CashCategory.BasicNeeds);
    setNotes('');

    alert(cashInList);
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={cashInList}
        renderItem={({item}) => (
          <CashInListTile
            id={item.id}
            date={item.date}
            type={item.type}
            category={item.category}
            amount={item.amount}
            notes={item.notes}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Add" onPress={toggleBottomNavigationView} />
      <Button
        title="Show JSON"
        onPress={() => alert(JSON.stringify(cashInList))}
      />
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bottomNavigationView}>
          <ScrollView>
            <Text>Amount</Text>
            <TextInput
              placeholder="Insert cash amount"
              value={cashAmount}
              onChangeText={text => setCashAmount(text)}
              keyboardType="number-pad"
              style={{borderWidth: 1, borderColor: 'blue'}}
            />
            <Text>Type</Text>
            <SelectList
              data={[
                {key: CashType.In, value: 'In'},
                {key: CashType.Out, value: 'Out'},
              ]}
              setSelected={setSelectedType}
              save="key"
            />
            <Text>Category</Text>
            <SelectList
              data={[
                {key: 'basic needs', value: 'Basic needs'},
                {key: 'desire', value: 'Desire'},
                {key: 'investment', value: 'Investment'},
              ]}
              setSelected={setSelectedCategory}
              save="key"
            />
            <Text>Notes</Text>
            <TextInput
              placeholder="Notes (optional)"
              value={notes}
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={text => setNotes(text)}
              style={{borderWidth: 1, borderColor: 'blue'}}
            />
            <Button
              title="Save"
              onPress={() => {
                handleSubmit();
              }}
            />
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const CashInListTile = (cash: Cash) => {
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
  bottomNavigationView: {
    backgroundColor: '#fff',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});

export default CashInScreen;
