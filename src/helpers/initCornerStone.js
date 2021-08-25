//Cornerstone imports
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';

///cursorModule

export default function initCornerstone() {
  // Externals

  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;

  const cfg = [
    {
      moduleName: 'globalConfiguration',
      configuration: {
        showSVGCursors: true,
        iconSize: 16,
        viewBox: {
          x: 16,
          y: 16,
        },
      },
      mousePoint: {
        x: 8,
        y: 8,
      },
      mousePointerGroupString: `
      <path stroke="blue" d="M8 16L208 0"></path>
      <path stroke="blue" d="M16 8L0 8"></path>`,
    },
  ];

  cornerstoneTools.init(cfg);
  cornerstoneTools.toolColors.setActiveColor('rgb(0, 255, 0)');
  cornerstoneTools.toolColors.setToolColor('rgb(255, 255, 0)');

  // Image Loader
  const config = {
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
      },
    },
  };
  // TODO: Fix duplicate initialization
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

// <path stroke="ACTIVE_COLOR" d="M8 16L8 0"></path>
// <path stroke="ACTIVE_COLOR" d="M16 8L0 8"></path>
