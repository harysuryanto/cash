export interface Cash {
  id: number;
  date: Date;
  type: 'in' | 'out';
  category: 'basic needs' | 'desire' | 'investment' | null; // It is null if type is 'in'
  amount: number;
  notes?: string;
}
