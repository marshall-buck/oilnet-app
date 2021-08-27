import sum from 'lodash.sum';
import Chart from 'chart.js/auto';

import { store } from './store';
import ui from './ui';
// Creates one yaxis array, the xaxis is the bin ie each pixel,
// the yaxis is the total count for each item
function _getPixelCount(xAxis, sliceArray) {
  let array = [];
  for (let i = 0; i < xAxis.length; i++) {
    const result = sliceArray.filter((num) => num === xAxis[i]);

    array.push(result.length);
  }
  return array;
}

// Returns object for histogram chart
export function createHistogramChartData() {
  store.histogram = store.nullOutHistogram();

  const measurements = store.getMeasurements.slice(1);
  if (measurements.length === 0) return;
  const imageDataArray = store.getImageData;

  let max = Math.max(...measurements.map((e) => e[7]));
  let min = Math.min(...measurements.map((e) => e[6]));

  const chart = Chart.getChart('hist-chart');

  if (chart) {
    if (ui.chartHistMin.value) min = parseInt(ui.chartHistMin.value);
    if (ui.chartHistMax.value) max = parseInt(ui.chartHistMax.value);
  }

  let xAxis = [];
  let yAxis = [];
  // array containing all pixels for, all images in imagedata array
  let allPixels = [];

  for (let i = min; i <= max; i++) {
    if (i > 0) xAxis.push(i);
  }

  imageDataArray.forEach((arr, index) => {
    // add image pixels to one array (all pixels)
    allPixels = [...allPixels, ...arr.data];
    // create yAxis array to place in store.histogram
    const newY = _getPixelCount(xAxis, arr.data);
    // store.histogram.yAxis.splice(index, 1, newY);
    store.histogram.yAxis.push(newY);
  });
  // loop through AllPixels array and push result to local yaxis for chart
  for (let i = 0; i < xAxis.length; i++) {
    const result = allPixels.filter((num) => num == xAxis[i]).length;
    yAxis.push(result);
  }
  ui.chartHistMax.placeholder = max;
  ui.chartHistMin.placeholder = min;
  // at this point yaxis has all the pixel counts for all images
  store.histogram.totalPixelCount = sum(yAxis);

  store.histogram.xAxis = xAxis;

  store.histogram.min = min;
  store.histogram.max = max;

  // return data for histogram chart
  return { x: xAxis, y: yAxis, min: min, max: max };
}

export function deleteYaxisHistogram(index) {
  const arr = store.histogram.yAxis;
  if (arr.length === 0) return;
  arr.splice(index, 1);
  store.histogram.yAxis = arr;
}
// Prepares store histogram object for csv
export function prepareHistogramCsv() {
  // store.histogram = store.nullOutHistogram();
  store.csvHistogram = [];

  const measurements = store.getMeasurements.slice(1);
  if (measurements.length === 0) return;
  const imageDataArray = store.getImageData;

  const max = Math.max(...measurements.map((e) => e[7]));
  const min = Math.min(...measurements.map((e) => e[6]));

  let xAxis = [];

  for (let i = min; i <= max; i++) {
    if (i > 0) xAxis.push(i);
  }
  store.csvHistogram.push(xAxis);

  imageDataArray.forEach((arr) => {
    const data = arr.data;
    const newY = _getPixelCount(xAxis, data);
    // console.log(sum(newY));
    store.csvHistogram.push(newY);
  });
}
