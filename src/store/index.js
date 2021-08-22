import { createStore } from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

const state = {
  isStudyIdModal: false,
  stack: {
    currentImageIdIndex: 0,
    imageIds: [],
  },
  defaultLevels: {
    windowWidth: 2000,
    windowCenter: 2000,
  },

  csvHistogram: [],

  imageData: [],
  jpgImageData: [],
  currentImageStats: {},
  histogram: {
    xAxis: [],
    yAxis: [],
    totalPixelCount: 0,
    min: 0,
    max: 0,
  },
  measurements: [],
  chartTitle: '',
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
