export interface TransactionHistoryData {
  date: string | number;
  icon: string;
  merchantName: string;
  type: string;
  amount: string;
  currencyCode: string;
  creditDebitIndicator: string;
  categoryCode: string;
}

export interface RecentTransaction {
  'categoryCode': string;
  'dates': {
    'valueDate': number;
  };
  'transaction': {
    'amountCurrency': {
      'amount': number;
      'currencyCode': string;
    };
    'type': string;
    'creditDebitIndicator': string;
  };
  'merchant': {
    'name': string;
    'accountNumber': string;
  };
}

export interface ListOfRecentTransaction {
  data: Array<RecentTransaction>;
}

export interface SortingInfo {
  type: SortingType;
  order: SortingOrder;
}

export interface TransferInformation {
  fromAccount: string;
  toAccount: string;
  amount: number;
}

export enum SortingOrder {
  ASC='ASC',
  DESC='DESC',
}

export enum SortingType {
  DATE='DATE',
  BENEFICIARY='BENEFICIARY',
  AMOUNT='AMOUNT',
}

export enum CreditDebitIndicator {
  CREDIT = 'CRDT',
  DEBIT = 'DBIT'
}
