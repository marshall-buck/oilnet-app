import { createStore } from 'vuex';
export const store = createStore({
  state() {
    return {
      count: 0,
      color: 'red',
    };
  },
  mutations: {
    increase(state) {
      state.count++;
    },
    decrease(state) {
      state.count--;
    },
    setColor(state, value) {
      state.color = value;
    },
  },

  getters: {
    count(state) {
      return state.count;
    },
    color(state) {
      return state.color;
    },
  },

  actions: {
    increase: ({ commit }) => commit('increase'),
    decrease: ({ commit }) => commit('decrease'),
    color: ({ commit }, payload) => commit('setColor', payload),
  },
});
