/* eslint-disable no-undef */
import * as cornerstone from 'cornerstone-core';

import { noImagesLoaded } from './helpers';

// Windowing Function exports
export function setWidthFromSlider(e) {
  if (!noImagesLoaded()) {
    let viewport = cornerstone.getViewport(ui.imageHolder);
    viewport.voi.windowWidth = parseFloat(e.target.value);
    cornerstone.setViewport(ui.imageHolder, viewport);
  }

  ui.widthInput.value = parseFloat(e.target.value);
  store.defaultLevels.windowWidth = parseFloat(e.target.value);

  // console.log(e.target.value);
}
export function setCenterFromSlider(e) {
  if (!noImagesLoaded()) {
    let viewport = cornerstone.getViewport(ui.imageHolder);
    viewport.voi.windowCenter = parseFloat(e.target.value);
    cornerstone.setViewport(ui.imageHolder, viewport);
  }

  ui.centerInput.value = parseFloat(e.target.value);
  store.defaultLevels.windowCenter = parseFloat(e.target.value);
  // console.log(e.target.value);
}
export function setWidthFromInput(e) {
  if (!noImagesLoaded()) {
    if (e.key === 'Enter') {
      let viewport = cornerstone.getViewport(ui.imageHolder);
      viewport.voi.windowWidth = parseFloat(e.target.value);
      cornerstone.setViewport(ui.imageHolder, viewport);
    }
    ui.widthSlider.value = parseFloat(e.target.value);
    store.defaultLevels.windowWidth = parseFloat(e.target.value);
  }
}
export function setCenterFromInput(e) {
  if (!noImagesLoaded()) {
    if (e.key === 'Enter') {
      let viewport = cornerstone.getViewport(ui.imageHolder);
      viewport.voi.windowCenter = parseFloat(e.target.value);
      cornerstone.setViewport(ui.imageHolder, viewport);
    }
    ui.centerSlider.value = parseFloat(e.target.value);
    store.defaultLevels.windowCenter = parseFloat(e.target.value);
  }
}

export function setWindowInputValues() {
  // if (noImagesLoaded()) return;

  ui.widthInput.value = store.defaultLevels.windowWidth;
  ui.centerInput.value = store.defaultLevels.windowCenter;
}

export function setSliderInputValues() {
  ui.widthSlider.max = '4000';
  ui.widthSlider.min = '0';
  ui.widthSlider.value = store.defaultLevels.windowWidth.toString();

  ui.centerSlider.max = '4000';
  ui.centerSlider.min = '-1000';
  ui.centerSlider.value = store.defaultLevels.windowCenter.toString();
}
