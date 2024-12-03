import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

interface NominalInputContextValue {
  nominal: number;
  setNominal: React.Dispatch<React.SetStateAction<number>>;
  storedValue: number | null;
  setStoredValue: React.Dispatch<React.SetStateAction<number | null>>;
  currentOperation: string | null;
  setCurrentOperation: React.Dispatch<React.SetStateAction<string | null>>;
}

const NominalInputContext = createContext<NominalInputContextValue | undefined>(
  undefined
);

export const useNominalInput = () => {
  const context = useContext(NominalInputContext);
  if (!context) {
    throw new Error("useNominalInput must be used within NominalInputProvider");
  }
  return context;
};

export default function NominalInputProvider({
  initialValue = 0,
  children,
}: PropsWithChildren & { initialValue?: number }) {
  const [nominal, setNominal] = useState(initialValue);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);

  return (
    <NominalInputContext.Provider
      value={{
        nominal,
        setNominal,
        storedValue,
        setStoredValue,
        currentOperation,
        setCurrentOperation,
      }}
    >
      {children}
    </NominalInputContext.Provider>
  );
}
