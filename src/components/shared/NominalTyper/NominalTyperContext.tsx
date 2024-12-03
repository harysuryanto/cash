import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

interface NominalTyperContextValue {
  nominal: number;
  setNominal: React.Dispatch<React.SetStateAction<number>>;
  storedValue: number | null;
  setStoredValue: React.Dispatch<React.SetStateAction<number | null>>;
  currentOperation: string | null;
  setCurrentOperation: React.Dispatch<React.SetStateAction<string | null>>;
}

const NominalTyperContext = createContext<NominalTyperContextValue | undefined>(
  undefined
);

export const useNominalTyper = () => {
  const context = useContext(NominalTyperContext);
  if (!context) {
    throw new Error("useNominalTyper must be used within NominalTyperProvider");
  }
  return context;
};

export default function NominalTyperProvider({
  initialValue = 0,
  children,
}: PropsWithChildren & { initialValue?: number }) {
  const [nominal, setNominal] = useState(initialValue);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);

  return (
    <NominalTyperContext.Provider
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
    </NominalTyperContext.Provider>
  );
}
