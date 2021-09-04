<template>
  <div
    class="overflow-hidden"
    ref="container"
    style="position: relative; height: 585px; width: 150px"
  >
    <canvas ref="intChart"></canvas>
  </div>
  <div class="flex flex-row text-xs justify-around">
    <div>
      <label class="mr-1">Min</label>
      <input
        v-model="min"
        class="w-10 border-2"
        type="text"
        :placeholder="intensity.min"
      />
    </div>
    <div>
      <label class="mr-1">Max</label>
      <input
        v-model="max"
        class="w-10 border-2"
        type="text"
        :placeholder="intensity.max"
      />
    </div>
    <div>
      <label class="mr-1">Step Size</label>
      <input
        v-model="step"
        class="w-6 border-2"
        type="text"
        :placeholder="intensity.stepSize"
      />
    </div>
  </div>

  <div class="flex flex-row flex-nowrap items-center justify-around">
    <ButtonRefresh
      class="icon-button absolute right-2 bottom-2"
      @click="refresh"
    />
    <ButtonDrag class="icon-button absolute right-2 top-2" />
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from 'vue';
import ButtonDrag from '../../components/Buttons/ButtonDrag.vue';

import ButtonRefresh from '../../components/Buttons/ButtonRefresh.vue';

import sortBy from 'lodash.sortby';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
import { convertRef } from '../../helpers/helpers';
Chart.defaults.color = '#000';
Chart.defaults.font.size = 7;
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
  components: { ButtonDrag, ButtonRefresh },
  setup() {
    const container = ref(null);
    const min = ref(null);
    const max = ref(null);
    const step = ref(null);

    const intChart = ref(null);
    const intensity = reactive({
      borderColor: 'rgba(0,0,255,0.7)',
      data: null,
      min: 0,
      max: 0,
      length: 0,
      maxLength: 0,
      title: '',
      studyNo: '',
      stepSize: 50,
    });

    const refresh = () => {
      if (min.value !== '') intensity.min = parseInt(min.value);
      if (max.value !== '') intensity.max = parseInt(max.value);
      if (step.value !== '') intensity.stepSize = parseInt(step.value);
    };
    onMounted(() => {
      window.api.receive('image-data-change:reply', (arg) => {
        if (arg.histogram.length === 0) {
          intensity.data = null;
          intensity.min = 0;
          intensity.max = 0;
          intensity.length = 0;
          intensity.maxLength = 0;
          intensity.title = '';
          intensity.studyNo = '';
          intensity.stepSize = 50;

          destroyChart();
          return;
        }

        intensity.title = arg.sampleNo;
        intensity.studyNo = arg.studyNo;
        createChartDataIntensity(arg);
      });

      window.api.receive('save-button-pressed:reply', () => {
        saveChartJpgInt();
      });
      window.api.send('int-mounted');
    });

    watch(intensity, () => {
      if (intensity.data === null) return;
      createChart();
      min.value = '';
      max.value = '';
      step.value = '';
    });
    // Create Chart Data
    function createChartDataIntensity(arg) {
      const measurements = arg.table.map((e) => Object.values(e));
      if (measurements.length == 0) return;
      // x is mean, y is depth
      const nonSorted = measurements.map((e) => {
        let obj = { x: e[3], y: e[0] * 0.1 };
        return obj;
      });

      const data = sortBy(nonSorted, 'y');

      const mean = data.map((e) => e.x);

      const min = Math.floor(Math.min(...mean) / 100) * 100;
      const max = Math.ceil(Math.max(...mean) / 100) * 100;

      const length = data.map((e) => e.y);

      const maxLength = (arr) => {
        const num = Math.max(...arr);
        if (num % 1 === 0) return num + 0.5;
        return Math.ceil(num * 2) / 2;
      };

      intensity.data = data;
      intensity.min = min;
      intensity.max = max;
      intensity.length = length;
      intensity.maxLength = maxLength(length);
    }
    // Create Chart
    function createChart() {
      let chart = Chart.getChart(intChart.value);
      if (!chart) {
        const chartData = {
          datasets: [
            {
              data: intensity.data,
              parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y',
              },

              borderWidth: 1,
              borderColor: 'rgba(0,0,255,0.7)',
            },
          ],
        };

        const chartOptions = {
          tension: 0.3,
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            x: {
              title: {
                display: true,
                text: 'CT Numbers',
              },
              type: 'linear',
              min: intensity.min,
              max: intensity.max,

              ticks: {
                stepSize: intensity.stepSize,
              },
            },

            y: {
              title: {
                display: true,
                text: 'Length (CM)',
              },
              reverse: true,
              min: 0,
              max: intensity.maxLength,
              grid: {
                color: function (context) {
                  if (context.index % 5 === 0) {
                    return '#000';
                  } else {
                    return '#D0D0D0';
                  }
                },
              },

              ticks: {
                stepSize: 0.1,
                callback: function (value, index) {
                  if (index % 5 === 0) {
                    this.color = '#000';
                    return this.getLabelForValue(value);
                  } else {
                    return '';
                  }
                },
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: `${intensity.title} Intensity Profile`,
              color: '#000',
              font: {
                size: 8,
                family: 'Arial',
                weight: 'normal',
              },
            },
            legend: {
              display: false,
            },
            datalabels: {
              display: true,
              color: 'red',
              font: {
                size: 8,
              },
              anchor: 'end',
              align: 'left',
              offset: 8,
              formatter: function (_, context) {
                const index = context.dataIndex;
                return context.dataset.data[index].x;
              },
            },
            tooltip: {
              enabled: false,
            },
          },
        };

        const ctx = intChart.value;
        ctx.fillStyle = 'white';

        chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          plugins: [ChartDataLabels],
          options: chartOptions,
        });
      } else {
        chart.options.scales.y.min = 0;
        chart.options.scales.y.max = intensity.maxLength;
        chart.options.scales.x.max = intensity.max;
        chart.options.scales.x.min = intensity.min;

        chart.options.scales.x.ticks.stepSize = intensity.stepSize;
        (chart.data.datasets = [
          {
            data: intensity.data,
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y',
            },

            borderWidth: 1,
            borderColor: intensity.borderColor,
          },
        ]),
          chart.clear();
        chart.update();
      }
    }

    // Save Chart
    function saveChartJpgInt() {
      let chart = Chart.getChart(intChart.value);
      if (!chart) return;
      Chart.defaults.font.size = 16;
      chart.options.plugins.datalabels.font.size = 16;
      chart.options.plugins.datalabels.offset = 12;
      chart.options.plugins.title.font.size = 24;

      chart.data.datasets = [
        {
          data: intensity.data,
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y',
          },

          borderWidth: 3,
          borderColor: intensity.borderColor,
        },
      ];

      container.value.style.height = '1900px';
      container.value.style.width = '350px';

      chart.resize();
      chart.update();

      chart = Chart.getChart(intChart.value);
      const image = chart.toBase64Image('image/jpeg', 1);

      const study = convertRef(intensity.studyNo);
      window.api.send('save-chart', [image, study, 'intC']);

      container.value.style.height = '585px';
      container.value.style.width = '150px';
      destroyChart();
    }
    // Destroy Chart
    function destroyChart() {
      let chart = Chart.getChart(intChart.value);
      if (!chart) return;
      chart.destroy();
    }

    return {
      intChart,

      container,
      min,
      max,
      step,
      refresh,
      intensity,
    };
  },
};
</script>
