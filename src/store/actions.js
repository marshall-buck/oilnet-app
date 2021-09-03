export const setWidth = ({ commit }, value) => {
  commit('setWidth', value);
};

export const setCenter = ({ commit }, value) => {
  commit('setCenter', value);
};
export const togglestudyNoModal = ({ commit }) => {
  commit('togglestudyNoModal');
};
export const loadStoreStackIds = ({ commit }, value) => {
  commit('loadStoreStackIds', value);
};
export const loadStoreStackPaths = ({ commit }, value) => {
  commit('loadStoreStackPaths', value);
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
export const addImagePixelData = ({ commit }, value) => {
  commit('addImagePixelData', value);
};

export const deleteImagePixelData = ({ commit }, index) => {
  commit('deleteImagePixelData', index);
};
export const addMeasurementTableData = ({ commit }, value) => {
  commit('addMeasurementTableData', value);
};

export const deleteMeasurementTableData = ({ commit }, index) => {
  commit('deleteMeasurementTableData', index);
};

export const scrollToThisNumber = ({ commit }, value) => {
  commit('scrollToThisNumber', value);
};
export const changeScale = ({ commit }, value) => {
  commit('changeScale', value);
};
