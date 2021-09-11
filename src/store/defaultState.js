export const getDefaultState = () => {
  return {
    isStudyNoModal: false,
    isCircleToolActive: false,
    isClearLastCircle: false,
    isSavingImages: false,
    isSavingCharts: false,

    scrollToThisNumber: 0,
    scale: 1.75,
    stack: {
      currentImageIdIndex: 0,
      imageIds: [],
      paths: [],
    },

    defaultLevels: {
      windowWidth: 2000,
      windowCenter: 2000,
    },
    // Parsed from the dicom image for viewport display and image information
    sampleInfo: {},

    // Holds live date while using Circle Tool
    liveData: {},
    //

    // An {name: "dicom:0..", data: [an array of pixels for histogram chart]}
    imagePixelData: [],

    // Contains the data to populate the table page
    table: [],
  };
};
