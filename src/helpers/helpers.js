import * as cornerstone from 'cornerstone-core';

import getCircleCoords from '../circleMath/getCircleCoords';
import { getPixelsInside } from '../circleMath/getPixelsInside';
export function prepareDataForTable(arr) {
  return {
    depth: arr[0].toString(),
    area: arr[1].toString(),
    count: arr[2].toString(),
    mean: arr[3].toString(),
    std: arr[4].toString(),
    min: arr[5].toString(),
    max: arr[6].toString(),
  };
}

// // Record and delete image data when creating/deleting a measurement
export function recordImagePixelDataToStore(element, handles) {
  const name = cornerstone.getImage(element).imageId;
  const circleCoordinates = getCircleCoords(handles.start, handles.end);
  const pixels = cornerstone.getPixels(
    element,
    circleCoordinates.left,
    circleCoordinates.top,
    circleCoordinates.width,
    circleCoordinates.height
  );
  const arr = getPixelsInside(pixels, circleCoordinates);
  return { name: name, data: arr };

  // let newArr = store.getImageData;

  // const obj = { name: '', data: [] };
  // obj.name = name;
  // obj.data = arr;
  // newArr.push(obj);
  // store.setImageData = newArr;
}

// export function deleteImagePixelDataFromStore(index) {
//   let old = store.getImageData;
//   old.splice(index - 1, 1);
//   store.setImageData = old;
// }

// export function noImagesLoaded() {
//   if (store.stack.imageIds.length === 0) return true;
//   return false;
// }

export function getSampleInfo(image) {
  return {
    client: image.data.string('x00100020'),
    job: image.data.string('x00100010'),
    well: image.data.string('x00080090'),
    sampleNo: image.data.string('x00081030'),
    depth: image.data.string('x00080050'),
    studyNo: image.data.string('x00200010'),
    imageNo: image.data.intString('x00200013'),
    axialDepth: image.data.string('x00201041'),
  };
}
