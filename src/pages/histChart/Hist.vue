<template>
  <a
    ><button
      @click="buttonClicked"
      class="icon-button"
      type="submit"
      id="chart-hist-download"
    >
      Save
    </button></a
  >
  <div
    class="chart-container"
    style="position: relative; width: 400px; height: 150px"
  >
    <canvas :ref="histChart"></canvas>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import sum from 'lodash.sum';
import Chart from 'chart.js/auto';
Chart.defaults.color = '#000';
Chart.defaults.font.size = 16;

export default {
  setup() {
    const histChart = ref(null);
    const title = ref(null);
    const histogram = reactive({
      xAxis: [],
      yAxis: [],
      totalPixelCount: 0,
      min: 0,
      max: 0,
    });

    window.api.receive('hist-data:reply', (arg) => {
      title.value = JSON.parse(arg[0]);
      createHistogramChartData(arg);
    });
    const buttonClicked = () => {
      console.log('save button clicked');
    };

    //Returns object for histogram chart
    function createHistogramChartData(arg) {
      const mArr = JSON.parse(arg[1]).map((e) => Object.values(e));
      // Array of all pixels arrays
      const imageDataArray = JSON.parse(arg[2]).map((e) => e.data);
      // Min and max from recorded data
      let max = Math.max(...mArr.map((e) => e[6]));
      let min = Math.min(...mArr.map((e) => e[5]));

      let xAxis = [];
      let yAxis = [];
      // array containing all pixels for, all images in image data array
      let allPixels = [];
      // create an xAxis pixel slot
      for (let i = min; i <= max; i++) {
        if (i > 0) xAxis.push(i);
      }
      // Loop through all arrays in imageData and put in 1 array
      imageDataArray.forEach((arr) => {
        allPixels = [...allPixels, ...arr];
      });

      // loop through AllPixels array and filter by pixel number return the pixel count
      for (let i = 0; i < xAxis.length; i++) {
        const result = allPixels.filter((num) => num == xAxis[i]).length;
        yAxis.push(result);
      }

      histogram.totalPixelCount = sum(yAxis);
      histogram.xAxis = xAxis;
      histogram.yAxis = yAxis;
      histogram.min = min;
      histogram.max = max;
    }

    return {
      title,
      histogram,
      histChart,
      buttonClicked,
    };
  },
};
</script>

<style></style>
