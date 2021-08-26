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

export const sampleInfo = ({ commit }, value) => {
  commit('sampleInfo', value);
};
export const toggleCircleTool = ({ commit }) => {
  commit('toggleCircleTool');
};
export const toggleClearLastCircle = ({ commit }) => {
  commit('toggleClearLastCircle');
};

export const min = ({ commit }, value) => {
  commit('min', value);
};
export const max = ({ commit }, value) => {
  commit('max', value);
};
export const area = ({ commit }, value) => {
  commit('area', value);
};
export const count = ({ commit }, value) => {
  commit('count', value);
};
export const meanHu = ({ commit }, value) => {
  commit('meanHu', value);
};
export const stdDev = ({ commit }, value) => {
  commit('stdDev', value);
};
export const imagePixelData = ({ commit }, value) => {
  commit('imagePixelData', value);
};
