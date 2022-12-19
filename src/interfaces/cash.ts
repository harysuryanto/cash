export enum CashCategory {
  BasicNeeds = 'basic needs',
  Desire = 'desire',
  Investment = 'investment',
}

export enum CashType {
  In = 'in',
  Out = 'out',
}

export interface Cash {
  id: number;
  date: Date;
  type: CashType;
  category: CashCategory | null; // It must be null if type is CashType.In
  amount: number;
  notes?: string;
}
