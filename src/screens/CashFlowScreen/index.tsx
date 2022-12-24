import {useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Cash, CashCategory, CashType} from '../../interfaces/cash';
import {colors} from '../../utils/colors';
import {SelectList} from 'react-native-dropdown-select-list';
import CashListTile from './components/CashListTile';
import Gap from '../../components/Gap';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

const CashFlowScreen = () => {
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
  const [selectedType, setSelectedType] = useState<CashType>();
  const [selectedCategory, setSelectedCategory] = useState<CashCategory>();
  const [notes, setNotes] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    let temp = [...cashInList];
    temp.push({
      id: new Date().getMilliseconds(),
      date: new Date(),
      type: selectedType!,
      category: selectedCategory ?? null,
      amount: Number.parseFloat(cashAmount),
      notes: notes,
    });
    setCashInList(temp);

    toggleBottomNavigationView();
    setCashAmount('');
    setSelectedType(CashType.In);
    setSelectedCategory(CashCategory.BasicNeeds);
    setNotes('');
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        data={cashInList}
        renderItem={({item}) => (
          <CashListTile
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
      <TouchableOpacity
        onPress={toggleBottomNavigationView}
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: 50,
          right: 20,
          bottom: 20,
          borderRadius: 25,
          backgroundColor: '#007bff',
        }}>
        <FontAwesomeIcon icon={faAdd} color="white" />
      </TouchableOpacity>
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
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            />
            <Gap height={10} />
            <Text>Type</Text>
            <SelectList
              defaultOption={{
                key: selectedType,
                value: selectedType,
              }}
              data={[
                {key: CashType.In, value: 'In'},
                {key: CashType.Out, value: 'Out'},
              ]}
              setSelected={setSelectedType}
              save="key"
            />
            <Gap height={10} />
            {selectedType === CashType.Out && (
              <>
                <Text>Category</Text>
                <SelectList
                  defaultOption={{
                    key: selectedCategory,
                    value: selectedCategory,
                  }}
                  data={[
                    {key: 'basic needs', value: 'Basic needs'},
                    {key: 'desire', value: 'Desire'},
                    {key: 'investment', value: 'Investment'},
                  ]}
                  setSelected={setSelectedCategory}
                  save="key"
                />
              </>
            )}
            <Gap height={10} />
            <Text>Notes</Text>
            <TextInput
              placeholder="Notes (optional)"
              value={notes}
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={text => setNotes(text)}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
            />
            {cashAmount !== '' &&
              (selectedType === CashType.In ||
                (selectedType === CashType.Out &&
                  selectedCategory !== undefined)) && (
                <>
                  <Gap height={20} />
                  <Button title="Save" onPress={handleSubmit} />
                </>
              )}
          </ScrollView>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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

export default CashFlowScreen;
