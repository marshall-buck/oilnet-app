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
    // Parsed from the dicom image for viewport display and image information
    sampleInfo: {},
    // Holds live date while using Circle Tool
    liveData: {},
    isCircleToolActive: false,
    isClearLastCircle: false,

    csvHistogram: [],
    // An {name: "dicom:0..", data: [an array of pixels for histogram chart]}
    imagePixelData: [],
    jpgImageData: [],

    histogram: {
      xAxis: [],
      yAxis: [],
      totalPixelCount: 0,
      min: 0,
      max: 0,
    },
    measurementTable: [],
    chartTitle: '',
  };
};
