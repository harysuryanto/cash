import React from "react";

import NominalTyperView from "./NominalTyper";
import NominalTyperProvider from "./NominalTyperContext";

type NominalTyperProps = {
  initialValue?: number;
};

function NominalTyper({ initialValue }: NominalTyperProps) {
  return (
    <NominalTyperProvider initialValue={initialValue}>
      <NominalTyperView />
    </NominalTyperProvider>
  );
}

export default NominalTyper;
