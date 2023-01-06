import {useContext, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Cash, CashCategory, CashType} from '../../interfaces/cash';
import {colors} from '../../utils/colors';
import {SelectList} from 'react-native-dropdown-select-list';
import Gap from '../../components/Gap';
import {CashListContext} from '../../contexts/CashContext';
import CashListTile from './components/CashListTile';
import {
  FAB,
  Appbar,
  List,
  Portal,
  Dialog,
  Button,
  TextInput,
  Text,
  useTheme,
} from 'react-native-paper';
import formatDate from '../../utils/utils/format_date';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';

const CashFlowScreen = () => {
  const theme = useTheme();

  const cashListContext = useContext(CashListContext);
  const [selectedCash, setSelectedCash] = useState<Cash | null>(null);

  const [cashAmount, setCashAmount] = useState('');
  const [selectedType, setSelectedType] = useState<CashType>();
  const [selectedCategory, setSelectedCategory] = useState<CashCategory>();
  const [notes, setNotes] = useState('');

  const [visible, setVisible] = useState(false);
  const [longPressModalVisible, setLongPressModalVisible] = useState(false);

  const handleSubmit = () => {
    cashListContext.addCash({
      id: uuidv4(),
      date: new Date().toISOString(),
      type: selectedType!,
      category: selectedCategory ?? null,
      amount: Number.parseFloat(cashAmount),
      notes: notes,
    });

    toggleBottomNavigationView();
    setCashAmount('');
    setSelectedType(CashType.In);
    setSelectedCategory(CashCategory.BasicNeeds);
    setNotes('');
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const handleDeleteCash = () => {
    cashListContext.deleteCash(selectedCash!.id);
    setLongPressModalVisible(false);
  };

  const handleLoadCashList = async () => {
    try {
      await AsyncStorage.getItem('cashList').then(value => {
        const savedCashList = JSON.parse(value ?? '[]') as Cash[];
        if (savedCashList.length == 0) {
          Alert.alert('', 'No data in storage.');
        } else {
          const formatedCashList = savedCashList.map(value => {
            return {
              ...value,
              id: uuidv4(),
            } satisfies Cash;
          });
          cashListContext.addCashAll(formatedCashList);
        }
      });
    } catch (e) {
      console.error('Gagal ngeload data', e);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Appbar.Header>
        <Appbar.Content title="Cash Flow" />
      </Appbar.Header>
      <Button onPress={handleLoadCashList}>Load data from storage</Button>
      {cashListContext.cashList.length === 0 && <Text>No cash flow.</Text>}
      {cashListContext.cashList.length > 0 && (
        <FlatList
          style={{flex: 1}}
          data={cashListContext.cashList}
          renderItem={({item}) => (
            <List.Item
              title={`${item.amount}${
                item.category ? ' - ' + item.category : ''
              }`}
              description={`${formatDate(new Date(item.date))}${
                item.notes ? ' • ' + item.notes : ''
              }`}
              left={props => (
                <View
                  {...props}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      item.type === CashType.Out ? 'lightblue' : 'lightgreen',
                    borderRadius: 16,
                  }}>
                  <Text>{item.type.toUpperCase()}</Text>
                </View>
              )}
              style={{paddingHorizontal: 16}}
              onPress={e => {
                setSelectedCash(item);
                setLongPressModalVisible(true);
              }}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <FAB
        icon="plus"
        onPress={toggleBottomNavigationView}
        style={{position: 'absolute', right: 16, bottom: 16}}
      />

      <Portal>
        <Dialog
          visible={longPressModalVisible}
          onDismiss={() => setLongPressModalVisible(false)}>
          <Dialog.Content>
            <Button onPress={() => {}}>Edit</Button>
            <Button onPress={handleDeleteCash}>Delete</Button>
          </Dialog.Content>
        </Dialog>
        <Dialog visible={visible} onDismiss={toggleBottomNavigationView}>
          <Dialog.Content>
            <Dialog.Title>Add Cash</Dialog.Title>
            <Gap height={10} />
            <TextInput
              label="Amount"
              value={cashAmount}
              onChangeText={text => setCashAmount(text)}
              keyboardType="number-pad"
              mode="outlined"
            />
            <Gap height={10} />
            <SelectList
              placeholder="Type"
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
            {selectedType === CashType.Out && (
              <>
                <Gap height={10} />
                <SelectList
                  placeholder="Category"
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
            <TextInput
              label="Notes (optional)"
              value={notes}
              numberOfLines={3}
              onChangeText={text => setNotes(text)}
              mode="outlined"
            />
            {cashAmount !== '' &&
              (selectedType === CashType.In ||
                (selectedType === CashType.Out &&
                  selectedCategory !== undefined)) && (
                <>
                  <Gap height={20} />
                  <Button onPress={handleSubmit}>Save</Button>
                </>
              )}
          </Dialog.Content>
        </Dialog>
      </Portal>
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

export default CashFlowScreen;
