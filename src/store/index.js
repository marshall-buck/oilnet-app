import { reactive, readonly } from 'vue';

const state = reactive({
  count: 10,
  color: 'red',
});

const methods = {
  increase() {
    state.count++;
  },
  decrease() {
    state.count--;
  },

  setColor(val) {
    state.color = val;
  },
};

const getters = {
  squared() {
    return state.count * state.count;
  },
};

export default {
  state: readonly(state),
  methods,
  getters,
};
