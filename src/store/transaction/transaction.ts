import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { MutationTypes } from './mutation-types';
import { ActionTypes } from './action-types';
import listOfRecentTransaction from '@/data/transactions.json';
import {
  CreditDebitIndicator,
  ListOfRecentTransaction,
  RecentTransaction
} from '@/interfaces/transaction';

const state = {
  transactions: {} as ListOfRecentTransaction,
  remittersBalance: 5824.76
};

type State = typeof state;

type Mutations<State> = {
  [MutationTypes.SET_TRANSACTION](state: State, transactions: ListOfRecentTransaction): void;
  [MutationTypes.ADD_TRANSFER](state: State, transfer: RecentTransaction): void;
  [MutationTypes.DECREASE_BALANCE](state: State, amount: number): void;
}

const mutations: MutationTree<State> & Mutations<State> = {
  [MutationTypes.SET_TRANSACTION] (state, transactions: ListOfRecentTransaction) {
    state.transactions = transactions;
  },
  [MutationTypes.ADD_TRANSFER] (state, transfer: RecentTransaction) {
    // decrease remitter balance
    state.remittersBalance -= transfer.transaction.amountCurrency.amount;
    // recalculate debit credit indicator
    if (state.remittersBalance < 0) {
      transfer.transaction.creditDebitIndicator = CreditDebitIndicator.CREDIT;
    }
    const listOfTransaction = Object.assign([], state.transactions.data);
    listOfTransaction.unshift(transfer);
    state.transactions.data = listOfTransaction;
  },
  [MutationTypes.DECREASE_BALANCE] (state, amount) {
    state.remittersBalance -= amount;
  }
};

const actions: ActionTree<State, RootState> = {
  /**
   * load list of recent transaction from Json File
   * @param commit
   */
  [ActionTypes.LOAD_TRANSACTION] ({ commit }) {
    commit(MutationTypes.SET_TRANSACTION, listOfRecentTransaction as ListOfRecentTransaction);
  },
  /**
   * Adding a transaction to list
   * @param commit
   * @param transfer
   */
  [ActionTypes.ADD_TRANSFER] ({ commit }, transfer: RecentTransaction) {
    commit(MutationTypes.ADD_TRANSFER, transfer);
  },
  /**
   * Decrease remitters balance
   * @param commit
   * @param amount
   */
  [ActionTypes.DECREASE_BALANCE] ({ commit }, amount: number) {
    commit(MutationTypes.DECREASE_BALANCE, amount);
  }
};

type Getters = {
  getTransactions(state: State): Array<RecentTransaction>;
  getRemittersBalance(state: State): number;
}

const getters: GetterTree<State, RootState> & Getters = {
  /**
   * return list of recent transaction.
   * @param state
   * @return {Array<RecentTransaction>>}
   */
  getTransactions (state: State): Array<RecentTransaction> {
    return state.transactions.data;
  },
  /**
   * return current remitters balance.
   * @param state
   * @return {number}
   */
  getRemittersBalance (state: State): number {
    return state.remittersBalance;
  }
};

const namespaced = true;

export const transaction: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced
};
