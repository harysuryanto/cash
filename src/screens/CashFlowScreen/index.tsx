import {useContext, useReducer, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Cash, CashCategory, CashType} from '../../interfaces/cash';
import {colors} from '../../utils/colors';
import {SelectList} from 'react-native-dropdown-select-list';
import Gap from '../../components/Gap';
import {CashListContext} from '../../contexts/CashContext';
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
import {
  formatCurrency,
  formatDateRelatively,
} from '../../utils/utils/formatter';

interface Form {
  amount: string;
  type: CashType;
  category?: CashCategory;
  notes: string;
}

const CashFlowScreen = () => {
  const theme = useTheme();

  const cashListContext = useContext(CashListContext);

  const [selectedCash, setSelectedCash] = useState<Cash | undefined>();

  const [form, updateForm] = useReducer<
    React.Reducer<
      Form,
      | {
          id?: number;
        }
      | {
          amount: string;
        }
      | {
          type: CashType;
        }
      | {
          category?: CashCategory;
        }
      | {
          notes: string;
        }
    >
  >((data, partialData) => ({...data, ...partialData}), {
    amount: '',
    type: CashType.In,
    category: undefined,
    notes: '',
  });

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [longPressModalVisible, setLongPressModalVisible] = useState(false);

  const addCash = () => {
    cashListContext.addCash({
      amount: Number.parseInt(form.amount),
      category: form.category,
      type: form.type,
      notes: form.notes,
    });
  };

  const updateCash = () => {
    cashListContext.updateCash({
      id: selectedCash!.id,
      amount: Number.parseInt(form.amount),
      type: form.type,
      category: form.category,
      notes: form.notes,
    });
  };

  const deleteCash = () => {
    cashListContext.deleteCash(selectedCash!.id);
    setLongPressModalVisible(false);
  };

  const cleanForm = () => {
    updateForm({
      amount: '',
      type: CashType.In,
      category: undefined,
      notes: '',
    });
  };

  const handleOpenAddForm = () => {
    setIsInEditMode(false);
    setFormModalVisible(true);
  };

  const handleOpenEditForm = () => {
    setIsInEditMode(true);
    setLongPressModalVisible(false);
    setFormModalVisible(true);

    updateForm({
      amount: selectedCash!.amount.toString(),
      type: selectedCash!.type,
      category:
        selectedCash?.type === CashType.Out
          ? selectedCash!.category
          : undefined,
      notes: selectedCash!.notes,
    });
  };

  const handleCloseForm = () => {
    setSelectedCash(undefined);
    cleanForm();
    setFormModalVisible(false);
  };

  const handleSubmit = () => {
    if (isInEditMode) {
      updateCash();
    } else {
      addCash();
    }
    handleCloseForm();
    cleanForm();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Appbar.Header>
        <Appbar.Content title="Cash Flow" />
      </Appbar.Header>
      {cashListContext.cashList.length === 0 && (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          No cash flow.
        </Text>
      )}
      {cashListContext.cashList.length > 0 && (
        <FlatList
          style={{flex: 1}}
          data={cashListContext.cashList}
          renderItem={({item}) => (
            <List.Item
              title={`${formatCurrency(item.amount)}${
                item.category ? ' - ' + item.category : ''
              }`}
              description={`${formatDateRelatively(new Date(item.date))}${
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
        onPress={handleOpenAddForm}
        style={{position: 'absolute', right: 16, bottom: 16}}
      />

      <Portal>
        <Dialog
          visible={longPressModalVisible}
          onDismiss={() => setLongPressModalVisible(false)}>
          <Dialog.Content>
            <Button onPress={handleOpenEditForm}>Edit</Button>
            <Button onPress={deleteCash}>Delete</Button>
          </Dialog.Content>
        </Dialog>
        <Dialog visible={formModalVisible} onDismiss={handleCloseForm}>
          <Dialog.Content>
            <Dialog.Title>
              {isInEditMode ? 'Edit Cash' : 'Add Cash'}
            </Dialog.Title>
            <Gap height={10} />
            <TextInput
              label="Amount"
              value={form.amount}
              onChangeText={text => updateForm({amount: text})}
              keyboardType="number-pad"
              mode="outlined"
            />
            <Gap height={10} />
            <SelectList
              placeholder="Type"
              defaultOption={{
                key: form.type,
                value: form.type,
              }}
              data={[
                {key: CashType.In, value: 'In'},
                {key: CashType.Out, value: 'Out'},
              ]}
              setSelected={(value: CashType) => updateForm({type: value})}
              save="key"
            />
            {form.type === CashType.Out && (
              <>
                <Gap height={10} />
                <SelectList
                  placeholder="Category"
                  defaultOption={{
                    key: form.category,
                    value: form.category,
                  }}
                  data={[
                    {key: 'basic needs', value: 'Basic needs'},
                    {key: 'desire', value: 'Desire'},
                    {key: 'investment', value: 'Investment'},
                  ]}
                  setSelected={(value: CashCategory) =>
                    updateForm({category: value})
                  }
                  save="key"
                />
              </>
            )}
            <Gap height={10} />
            <TextInput
              label="Notes (optional)"
              value={form.notes}
              numberOfLines={3}
              onChangeText={value => updateForm({notes: value})}
              mode="outlined"
            />
            {form.amount !== '' &&
              (form.type === CashType.In ||
                (form.type === CashType.Out &&
                  form.category !== undefined)) && (
                <>
                  <Gap height={20} />
                  <Button onPress={handleSubmit}>
                    {isInEditMode ? 'Update' : 'Save'}
                  </Button>
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
