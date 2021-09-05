import { getDefaultState } from './defaultState';

export const setWidth = (state, value) => {
  state.defaultLevels.windowWidth = value;
};

export const setCenter = (state, value) => {
  state.defaultLevels.windowCenter = value;
};
export const toggleStudyNoModal = (state) => {
  state.isStudyNoModal = !state.isStudyNoModal;
};

export const loadStoreStackIds = (state, value) => {
  state.stack.imageIds = value;
};
export const loadStoreStackPaths = (state, value) => {
  state.stack.paths = value;
};

export const resetState = (state) => {
  console.log('reset state mutation');
  Object.assign(state, getDefaultState());
};
export const sampleInfo = (state, value) => {
  state.sampleInfo = value;
};

export const toggleCircleTool = (state) => {
  state.isCircleToolActive = !state.isCircleToolActive;
};
export const toggleClearLastCircle = (state) => {
  state.isClearLastCircle = !state.isClearLastCircle;
};

export const area = (state, value) => {
  state.liveData.area = value;
};
export const stdDev = (state, value) => {
  state.liveData.stdDev = value;
};
export const min = (state, value) => {
  state.liveData.min = value;
};
export const max = (state, value) => {
  state.liveData.max = value;
};
export const count = (state, value) => {
  state.liveData.count = value;
};
export const meanHu = (state, value) => {
  state.liveData.meanHu = value;
};

export const addImagePixelData = (state, value) => {
  state.imagePixelData = [...state.imagePixelData, value];
};

export const addTableData = (state, value) => {
  state.table = [...state.table, value];
};

export const deleteImagePixelData = (state, value) => {
  state.imagePixelData = state.imagePixelData.filter(
    (e, index) => index !== value
  );
};

export const deleteTableData = (state, value) => {
  state.table = state.table.filter((e, index) => index !== value);
};

export const scrollToThisNumber = (state, value) => {
  state.scrollToThisNumber = value;
};

export const changeScale = (state, value) => {
  state.scale = value;
};
