import {createContext, useEffect, useState} from 'react';
import {Cash} from '../interfaces/cash';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CashListContextValue {
  cashList: Cash[];
  addCash: (value: Cash) => void;
  addCashAll: (value: Cash[]) => void;
  updateCash: (value: Cash) => void;
  deleteCash: (id: string) => void;
}

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

  const addCash = (cash: Cash) => {
    setCashList([...cashList, cash]);
  };

  const addCashAll = (newCashList: Cash[]) => {
    setCashList([...cashList, ...newCashList]);
    console.log(`Successfully added ${newCashList.length} item(s)`);
  };

  const updateCash = (cash: Cash) => {
    setCashList(cashList.map(item => (item.id === cash.id ? cash : item)));
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
