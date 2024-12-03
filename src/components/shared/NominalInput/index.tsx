import React from "react";

import NominalInputView from "./NominalInput";
import NominalInputProvider from "./NominalInputContext";

type NominalInputProps = {
  initialValue?: number;
};

function NominalInput({ initialValue }: NominalInputProps) {
  return (
    <NominalInputProvider initialValue={initialValue}>
      <NominalInputView />
    </NominalInputProvider>
  );
}

export default NominalInput;
