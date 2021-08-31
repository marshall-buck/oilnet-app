<template>
  <div ref="container" style="position: relative; width: 400px; height: 150px">
    <canvas ref="histChart"></canvas>
  </div>
  <div class="flex flex-row justify-between px-5 mb-4 text-sm">
    <div>
      <label class="mr-1" for="hist-min">Min</label>
      <input
        v-model="min"
        class="w-20 border-2"
        type="text"
        :placeholder="histogram.min"
      />
    </div>
    <div>
      <label class="mr-1" for="hist-max">Max</label>
      <input
        v-model="max"
        class="w-20 border-2"
        type="text"
        :placeholder="histogram.max"
      />
    </div>
  </div>

  <div class="flex flex-row flex-nowrap items-center justify-around">
    <!-- <button @click="buttonClicked" class="icon-button p-2" type="submit">
      Save
    </button> -->

    <ButtonSave @click="buttonClicked" class="icon-button p-2" />
    <ButtonRefresh @click="refresh" />
    <ButtonDrag />
  </div>
</template>

<script>
// TODO:Changeable mins and max's
// TODO:Changeable font sizes for viewing and saving

import ButtonDrag from '../../components/Buttons/ButtonDrag.vue';
import ButtonSave from '../../components/Buttons/ButtonSave.vue';
import ButtonRefresh from '../../components/Buttons/ButtonRefresh.vue';

import { ref, reactive, watch, onMounted } from 'vue';
import sum from 'lodash.sum';
import Chart from 'chart.js/auto';
import { convertRef } from '../../helpers/helpers';
Chart.defaults.color = '#000';
Chart.defaults.font.size = 12;
const plug = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

Chart.register(plug);

export default {
  components: { ButtonDrag, ButtonSave, ButtonRefresh },
  setup() {
    const min = ref(null);
    const max = ref(null);
    const container = ref(null);
    const histChart = ref(null);
    const histogram = reactive({
      xAxis: [],
      yAxis: [],
      totalPixelCount: 0,
      min: 0,
      max: 0,
      title: '',
      studyNo: '',
    });
    const refresh = () => {
      histogram.min = parseInt(min.value);
      histogram.max = parseInt(max.value);
    };
    window.api.receive('image-data-change:reply', (arg) => {
      if (arg.histogram.length === 0) {
        (histogram.xAxis = []),
          (histogram.yAxis = []),
          (histogram.totalPixelCount = 0),
          (histogram.min = 0),
          (histogram.max = 0),
          (histogram.title = ''),
          (histogram.studyNo = '');
        destroyChart();
        return;
      }
      histogram.studyNo = arg.studyNo;
      histogram.title = arg.sampleNo;
      createHistogramChartData(arg);
    });
    // Watch data and run create chart on change
    watch(histogram, () => {
      createHistogramChart();
      min.value = null;
      max.value = null;
    });

    onMounted(() => {
      window.api.send('hist-mounted');
    });

    //Create Chart Data
    function createHistogramChartData(arg) {
      const mArr = arg.table.map((e) => Object.values(e));
      // Array of all pixels arrays
      const imageDataArray = arg.histogram.map((e) => e.data);
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
      // createHistogramChart();
    }
    // Create chart
    function createHistogramChart() {
      let chart = Chart.getChart(histChart.value);
      if (!chart) {
        const chartData = {
          labels: histogram.xAxis,
          datasets: [
            {
              data: histogram.yAxis,
              fill: true,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
              backgroundColor: '#000',
            },
          ],
        };
        const chartOptions = {
          elements: {
            point: {
              pointRadius: 0.1,
            },
          },
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            x: {
              type: 'linear',
              min: histogram.min,
              max: histogram.max,
              ticks: {
                stepSize: 50,
              },
              title: {
                display: true,
                text: 'CT Numbers',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Frequency',
              },
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: `Sample: ${histogram.title}`,
              color: '#000',
              font: {
                size: 16,
                family: 'Arial',
                weight: 'normal',
              },
            },
            legend: {
              display: false,
            },
            filler: { fill: 'origin' },
            tooltip: {
              enabled: false,
            },
          },
        };
        const ctx = histChart.value;
        ctx.fillStyle = 'white';

        chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: chartOptions,
        });
      } else {
        chart.options.scales.x.min = histogram.min;
        chart.options.scales.x.max = histogram.max;
        chart.data.labels = histogram.xAxis;
        (chart.data.datasets = [
          {
            data: histogram.yAxis,
            fill: true,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            backgroundColor: '#000',
          },
        ]),
          chart.update();
      }
    }
    // Destroy Chart
    function destroyChart() {
      let chart = Chart.getChart(histChart.value);
      if (!chart) return;
      chart.destroy();
    }
    // Save Chart
    function saveChartJpgHistogram() {
      let chart = Chart.getChart(histChart.value);
      if (!chart) return;
      container.value.style.height = '350px';
      container.value.style.width = '1200px';

      chart.resize();
      chart = Chart.getChart(histChart.value);
      const image = chart.toBase64Image('image/jpeg', 1);

      const study = convertRef(histogram.studyNo);
      window.api.send('save-chart', [image, study, 'hisC']);
      container.value.style.height = '150px';
      container.value.style.width = '400px';
      chart.resize();
    }
    const buttonClicked = () => {
      saveChartJpgHistogram();
    };

    return {
      histogram,
      histChart,
      buttonClicked,
      container,
      min,
      max,
      refresh,
    };
  },
};
</script>
