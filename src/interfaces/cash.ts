export enum CashCategory {
  BasicNeeds = 'basic needs',
  Desire = 'desire',
  Investment = 'investment',
}

export enum CashType {
  In = 'in',
  Out = 'out',
}

export type Cash = {
  id: string;
  date: string;
  type: CashType;
  /** `category` must be undefined if `type: CashType.In` */
  category?: CashCategory;
  amount: number;
  notes?: string;
};
