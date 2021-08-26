import { getDefaultState } from './defaultState';

export const setWidth = (state, value) => {
  state.defaultLevels.windowWidth = value;
};

export const setCenter = (state, value) => {
  state.defaultLevels.windowCenter = value;
};
export const toggleStudyIdModal = (state) => {
  state.isStudyIdModal = !state.isStudyIdModal;
};

export const loadStoreStack = (state, value) => {
  state.stack.imageIds = value;
};

export const resetState = (state) => {
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
