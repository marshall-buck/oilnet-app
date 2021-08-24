import { createStore } from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import { getDefaultState } from './defaultState';

const state = getDefaultState();

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
