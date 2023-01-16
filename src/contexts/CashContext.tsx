import {createContext, useEffect, useState} from 'react';
import {Cash, CashCategory, CashType} from '../interfaces/cash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';

type CashProps = {
  type: CashType;
  /** `category` must be undefined if `type: CashType.In` */
  category?: CashCategory;
  amount: number;
  notes?: string;
};

type CashListContextValue = {
  cashList: Cash[];
  addCash: (value: CashProps) => void;
  addCashAll: (value: Cash[]) => void;
  updateCash: (value: CashProps) => void;
  deleteCash: (id: string) => void;
};

const CashListContext = createContext<CashListContextValue>({
  cashList: [],
  addCash: () => {},
  addCashAll: () => {},
  updateCash: () => {},
  deleteCash: () => {},
});

type Props = {
  children: JSX.Element;
};

const CashListProvider = ({children}: Props) => {
  const [cashList, setCashList] = useState<Cash[]>([]);

  const addCash = (cash: CashProps) => {
    const value = {
      id: uuidv4(),
      date: new Date().toISOString(),
      amount: cash.amount,
      type: cash.type,
      category: cash.category,
      notes: cash.notes,
    } satisfies Cash;
    setCashList([...cashList, value]);
  };

  const addCashAll = (newCashList: Cash[]) => {
    setCashList([...cashList, ...newCashList]);
    console.log(`Successfully added ${newCashList.length} item(s)`);
  };

  const updateCash = (cash: CashProps) => {
    const value = {
      id: uuidv4(),
      date: new Date().toISOString(),
      amount: cash.amount,
      type: cash.type,
      category: cash.category,
      notes: cash.notes,
    } satisfies Cash;
    setCashList(cashList.map(item => (item.id === value.id ? value : item)));
  };

  const deleteCash = (id: string) => {
    setCashList(cashList.filter(item => item.id !== id));
  };

  const saveToStorage = async () => {
    if (cashList.length === 0) return;

    try {
      console.log('Menyimpan data...', JSON.stringify(cashList));
      await AsyncStorage.setItem('cashList', JSON.stringify(cashList));
    } catch (e) {
      console.warn('Gagal nyimpen data', e);
    }
  };

  useEffect(() => {
    saveToStorage();
  }, [cashList]);

  return (
    <CashListContext.Provider
      value={{
        cashList,
        addCash,
        addCashAll,
        updateCash,
        deleteCash,
      }}>
      {children}
    </CashListContext.Provider>
  );
};

export {CashListProvider, CashListContext};
