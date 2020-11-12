import { createStore } from 'vuex';
import { transaction } from '@/store/transaction/transaction';

const state = {};

export type RootState = typeof state;

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    transaction
  }
});
