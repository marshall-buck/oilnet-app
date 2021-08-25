export const getDefaultState = () => {
  return {
    isStudyIdModal: false,
    scale: 1.75,
    stack: {
      currentImageIdIndex: 0,
      imageIds: [],
    },
    defaultLevels: {
      windowWidth: 2000,
      windowCenter: 2000,
    },

    newDicomLoaded: false,

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
