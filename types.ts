
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
}

export interface Card {
  id: string;
  lastFour: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  type: 'Credit' | 'Debit';
  limit: number;
  used: number;
}

export interface UserAccount {
  name: string;
  balance: number;
  savings: number;
  accountNumber: string;
  agency: string;
}
