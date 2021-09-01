export const defaultLevels = (state) => state.defaultLevels;
export const isStudyIdModal = (state) => state.isStudyIdModal;
export const scale = (state) => state.scale;
export const imageIds = (state) => state.stack.imageIds;
export const paths = (state) => state.stack.paths;
export const stack = (state) => state.stack;
export const windowWidth = (state) => state.defaultLevels.windowWidth;
export const windowCenter = (state) => state.defaultLevels.windowCenter;

// SampleInfo
export const axialDepth = (state) => state.sampleInfo.axialDepth;
export const client = (state) => state.sampleInfo.client;
export const depth = (state) => state.sampleInfo.depth;
export const imageNo = (state) => state.sampleInfo.imageNo;
export const job = (state) => state.sampleInfo.job;
export const sampleNo = (state) => state.sampleInfo.sampleNo;
export const studyNo = (state) => state.sampleInfo.studyNo;
export const well = (state) => state.sampleInfo.well;

export const isCircleToolActive = (state) => state.isCircleToolActive;
export const isClearLastCircle = (state) => state.isClearLastCircle;

// Live Data
export const area = (state) => state.liveData.area;
export const stdDev = (state) => state.liveData.stdDev;
export const min = (state) => state.liveData.min;
export const max = (state) => state.liveData.max;
export const count = (state) => state.liveData.count;
export const meanHu = (state) => state.liveData.meanHu;

export const imagePixelData = (state) => state.imagePixelData;

export const measurementTable = (state) => state.measurementTable;

export const currentImageIdIndex = (state) => state.stack.currentImageIdIndex;

export const scrollToThisNumber = (state) => state.scrollToThisNumber;
