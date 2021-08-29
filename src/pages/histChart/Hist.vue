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
    <canvas ref="histChart"></canvas>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
// import sum from 'lodash.sum';
import Chart from 'chart.js/auto';
Chart.defaults.color = '#000';
Chart.defaults.font.size = 12;

export default {
  setup() {
    const histChart = ref(null);
    const title = ref(null);
    const studyId = ref(null);
    const histogram = reactive({
      xAxis: [],
      yAxis: [],
      totalPixelCount: 0,
      min: 0,
      max: 0,
    });

    window.api.receive('hist-data:reply', (arg) => {
      console.log(arg.table);
      console.log(arg.histogram);
      console.log(arg.sampleNo);
      console.log(arg.studyNo);

      // title.value = JSON.parse(arg[2]);

      //createHistogramChartData(arg);
    });
    const buttonClicked = () => {
      saveChartJpgHistogram();
      console.log('save button clicked');
    };

    //Returns object for histogram chart
    // function createHistogramChartData(arg) {
    //   const mArr = JSON.parse(arg[0]).map((e) => Object.values(e));
    //   // Array of all pixels arrays
    //   const imageDataArray = JSON.parse(arg[1]).map((e) => e.data);
    //   // Min and max from recorded data
    //   let max = Math.max(...mArr.map((e) => e[6]));
    //   let min = Math.min(...mArr.map((e) => e[5]));

    //   let xAxis = [];
    //   let yAxis = [];
    //   // array containing all pixels for, all images in image data array
    //   let allPixels = [];
    //   // create an xAxis pixel slot
    //   for (let i = min; i <= max; i++) {
    //     if (i > 0) xAxis.push(i);
    //   }
    //   // Loop through all arrays in imageData and put in 1 array
    //   imageDataArray.forEach((arr) => {
    //     allPixels = [...allPixels, ...arr];
    //   });

    //   // loop through AllPixels array and filter by pixel number return the pixel count
    //   for (let i = 0; i < xAxis.length; i++) {
    //     const result = allPixels.filter((num) => num == xAxis[i]).length;
    //     yAxis.push(result);
    //   }

    //   histogram.totalPixelCount = sum(yAxis);
    //   histogram.xAxis = xAxis;
    //   histogram.yAxis = yAxis;
    //   histogram.min = min;
    //   histogram.max = max;
    //   createHistogramChart();
    // }

    // function createHistogramChart() {
    //   let chart = Chart.getChart(histChart.value);
    //   if (!chart) {
    //     const chartData = {
    //       labels: histogram.xAxis,
    //       datasets: [
    //         {
    //           data: histogram.yAxis,
    //           fill: true,
    //           cubicInterpolationMode: 'monotone',
    //           tension: 0.4,
    //           backgroundColor: '#000',
    //         },
    //       ],
    //     };
    //     const chartOptions = {
    //       elements: {
    //         point: {
    //           pointRadius: 0.1,
    //         },
    //       },
    //       responsive: true,
    //       maintainAspectRatio: false,

    //       scales: {
    //         x: {
    //           type: 'linear',
    //           min: histogram.min,
    //           max: histogram.max,
    //           ticks: {
    //             stepSize: 50,
    //           },
    //           title: {
    //             display: true,
    //             text: 'CT Numbers',
    //           },
    //         },
    //         y: {
    //           beginAtZero: true,
    //           title: {
    //             display: true,
    //             text: 'Frequency',
    //           },
    //           ticks: {
    //             display: false,
    //           },
    //           grid: {
    //             display: false,
    //           },
    //         },
    //       },
    //       plugins: {
    //         title: {
    //           display: true,
    //           text: title.value,
    //           color: '#000',
    //           font: {
    //             size: 24,
    //             family: 'Arial',
    //             weight: 'normal',
    //           },
    //         },
    //         legend: {
    //           display: false,
    //         },
    //         filler: { fill: 'origin' },
    //         tooltip: {
    //           enabled: false,
    //         },
    //       },
    //     };
    //     const ctx = histChart.value;

    //     chart = new Chart(ctx, {
    //       type: 'line',
    //       data: chartData,
    //       options: chartOptions,
    //     });
    //   } else {
    //     chart.options.scales.x.min = histogram.min;
    //     chart.options.scales.x.max = histogram.max;
    //     chart.data.labels = histogram.xAxis;
    //     (chart.data.datasets = [
    //       {
    //         data: histogram.yAxis,
    //         fill: true,
    //         cubicInterpolationMode: 'monotone',
    //         tension: 0.4,
    //         backgroundColor: '#000',
    //       },
    //     ]),
    //       chart.update();
    //   }
    // }
    function saveChartJpgHistogram() {
      const chart = Chart.getChart(histChart.value);

      histChart.value.style.height = '350px';
      histChart.value.style.width = '1200px';
      chart.resize();

      const image = chart.toBase64Image('image/jpeg', 1);
      window.api.send('save-chart', [image, studyId.value, 'hisC']);
      // chart.destroy();
      // popup.close();
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
