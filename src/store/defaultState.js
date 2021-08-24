export const getDefaultState = () => {
  return {
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
};
