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
