import {createContext, useState} from 'react';
import {Cash, CashCategory, CashType} from '../interfaces/cash';

const defaultValue = [
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
];

interface CashListContextValue {
  cashList: Array<Cash>;
  addCash: (value: Cash) => void;
  updateCash: (value: Cash) => void;
  deleteCash: (id: number) => void;
}

const CashListContext = createContext<CashListContextValue>({
  cashList: [],
  addCash: () => {},
  updateCash: () => {},
  deleteCash: () => {},
});

type Props = {
  children: JSX.Element;
};

const CashListProvider = ({children}: Props) => {
  const [cashList, setCashList] = useState<Array<Cash>>(defaultValue);

  const addCash = (cash: Cash) => {
    setCashList([...cashList, cash]);
  };

  const updateCash = (cash: Cash) => {
    setCashList(cashList.map(item => (item.id === cash.id ? cash : item)));
  };

  const deleteCash = (id: number) => {
    setCashList(cashList.filter(item => item.id !== id));
  };

  return (
    <CashListContext.Provider
      value={{
        cashList,
        addCash,
        updateCash,
        deleteCash,
      }}>
      {children}
    </CashListContext.Provider>
  );
};

export {CashListProvider, CashListContext};
