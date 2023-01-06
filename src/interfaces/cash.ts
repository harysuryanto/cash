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
  id: string;
  date: string;
  type: CashType;
  /** `category` must be null if `type: CashType.In` */
  category: CashCategory | null;
  amount: number;
  notes?: string;
}
