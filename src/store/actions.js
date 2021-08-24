export const setWidth = ({ commit }, value) => {
  commit('setWidth', value);
};

export const setCenter = ({ commit }, value) => {
  commit('setCenter', value);
};
export const toggleStudyIdModal = ({ commit }) => {
  commit('toggleStudyIdModal');
};
export const loadStoreStack = ({ commit }, value) => {
  commit('loadStoreStack', value);
};
export const resetState = ({ commit }) => {
  commit('resetState');
};
