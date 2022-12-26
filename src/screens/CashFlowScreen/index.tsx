import {useContext, useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
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
import Gap from '../../components/Gap';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {CashListContext} from '../../contexts/CashContext';
import CashListTile from './components/CashListTile';

const CashFlowScreen = () => {
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
      id: new Date().getMilliseconds(),
      date: new Date(),
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          data={cashListContext.cashList}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                setSelectedCash(item);
                setLongPressModalVisible(true);
              }}>
              <CashListTile
                id={item.id}
                date={item.date}
                type={item.type}
                category={item.category}
                amount={item.amount}
                notes={item.notes}
              />
            </TouchableOpacity>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={longPressModalVisible}
          style={{backgroundColor: 'grey', justifyContent: 'center'}}
          onRequestClose={() => setLongPressModalVisible(false)}>
          <View style={{backgroundColor: 'white', justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteCash}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
      </View>
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
