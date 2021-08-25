/* eslint-disable no-undef */
import * as cornerstone from 'cornerstone-core';

import getCircleCoords from './circleMath/getCircleCoords';
import { getPixelsInside } from './circleMath/getPixelsInside';

// Record and delete image data when creating/deleting a measurement
export function recordImagePixelDataToStore(handles) {
  const name = cornerstone.getImage(ui.imageHolder).imageId;
  const circleCoordinates = getCircleCoords(handles.start, handles.end);
  const pixels = cornerstone.getPixels(
    ui.imageHolder,
    circleCoordinates.left,
    circleCoordinates.top,
    circleCoordinates.width,
    circleCoordinates.height
  );
  const arr = getPixelsInside(pixels, circleCoordinates);

  let newArr = store.getImageData;

  const obj = { name: '', data: [] };
  obj.name = name;
  obj.data = arr;
  newArr.push(obj);
  store.setImageData = newArr;
}

export function deleteImagePixelDataFromStore(index) {
  let old = store.getImageData;
  old.splice(index - 1, 1);
  store.setImageData = old;
}

export function noImagesLoaded() {
  if (store.stack.imageIds.length === 0) return true;
  return false;
}

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
