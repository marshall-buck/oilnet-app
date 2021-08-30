<template>
  <a
    ><button @click="buttonClicked" class="icon-button p-2" type="submit">
      Save
    </button></a
  >
  <div ref="container" style="position: relative; width: 200px; height: 800px">
    <canvas ref="intChart"></canvas>
  </div>
</template>

<script>
import { ref } from 'vue';

import sortBy from 'lodash.sortby';

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
  setup() {
    const container = ref(null);
    const title = ref(null);

    const intChart = ref(null);

    window.api.receive('image-data-change:reply', (arg) => {
      if (arg.histogram.length === 0) {
        destroyChart();
        return;
      }
      title.value = arg.sampleNo;
      createChartDataIntensity(arg);
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
      const borderColor = 'rgba(0,0,255,0.5)';
      const mean = data.map((e) => e.x);
      const min = Math.floor(Math.min(...mean) / 100) * 100;
      const max = Math.ceil(Math.max(...mean) / 100) * 100;
      // console.log(min, max);

      const length = data.map((e) => e.y);

      const maxLength = (arr) => {
        const num = Math.max(...arr);
        if (num % 1 === 0) return num + 0.5;
        return Math.ceil(num * 2) / 2;
      };

      let chart = Chart.getChart(intChart.value);
      if (!chart) {
        const chartData = {
          datasets: [
            {
              data: data,
              parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y',
              },

              borderWidth: 3,
              borderColor: borderColor,
            },
          ],
        };

        const chartOptions = {
          tension: 0.3,
          responsive: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'CT Numbers',
              },
              type: 'linear',
              min: min,
              max: max,

              ticks: {
                stepSize: 50,
              },
            },

            y: {
              title: {
                display: true,
                text: 'Length (CM)',
              },
              reverse: true,
              min: 0,
              max: maxLength(length),
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
              text: `${title.value} Intensity Profile`,
              color: '#000',
              font: {
                size: 24,
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
                size: 16,
              },
              anchor: 'end',
              align: 'left',
              offset: 10,
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
          options: chartOptions,
        });
      } else {
        const chart = Chart.getChart('intensity-chart');
        chart.options.scales.y.max = maxLength(length);

        (chart.data.datasets = [
          {
            data: data,
            parsing: {
              xAxisKey: 'x',
              yAxisKey: 'y',
            },

            borderWidth: 3,
            borderColor: borderColor,
          },
        ]),
          chart.update();
      }
    }

    // Save Chart
    function saveChartJpgInt() {
      let chart = Chart.getChart(intChart.value);
      if (!chart) return;
      container.value.style.height = '1900px';
      container.value.style.width = '350px';

      chart.resize();
      chart = Chart.getChart(intChart.value);
      const image = chart.toBase64Image('image/jpeg', 1);

      const study = convertRef(title.value);
      window.api.send('save-chart', [image, study, 'intC']);
      container.value.style.height = '200px';
      container.value.style.width = '800px';
      chart.resize();
    }
    // Destroy Chart
    function destroyChart() {
      let chart = Chart.getChart(intChart.value);
      if (!chart) return;
      chart.destroy();
    }
    const buttonClicked = () => {
      saveChartJpgInt();
    };
    return {
      intChart,
      buttonClicked,
    };
  },
};
</script>

<style></style>
