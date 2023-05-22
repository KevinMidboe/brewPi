<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import {
    Chart,
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Legend
  } from 'chart.js';

  import type { ChartDataset } from 'chart.js';
  import type IChartFrame from '../interfaces/IChartFrame';

  Chart.register(
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Legend
  );

  export let name: string;
  export let dataFrames: IChartFrame[];
  export let beginAtZero: boolean = true;
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;
  let prevData: any = {};

  interface IDataset {
    labels: string[];
    data?: ChartDataset<'line', number[]>;
  }

  interface ITemperatureDataset extends IDataset {
    inside: ChartDataset<'line', number[]>;
    outside?: ChartDataset<'line', number[]>;
  }

  interface IHumidityDataset extends IDataset {}
  interface IPressureDataset extends IDataset {}

  function pad(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function prettierDateString(date) {
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${pad(date.getYear() - 100)}`;
  }

  function computeTemperatureDataset(): ITemperatureDataset {
    const labels: string[] = dataFrames.map(
      (frame) => prettierDateString(new Date(frame.key)) || String(frame.key_as_string)
    );
    const data: number[] = dataFrames.map((frame) => frame.value);

    return {
      labels,
      inside: {
        label: '℃ inside',
        borderColor: '#10e783',
        backgroundColor: '#c8f9df',
        lineTension: 0.5,
        borderWidth: 3,
        data
      }
    };
  }

  function computeHumidityDataset(): IHumidityDataset {
    const labels: string[] = dataFrames.map(
      (frame) => prettierDateString(new Date(frame.key)) || String(frame.key_as_string)
    );
    const data: number[] = dataFrames.map((frame) => frame.value);

    return {
      labels,
      data: {
        label: '% humidity',
        borderColor: '#57d2fb',
        backgroundColor: '#d4f2fe',
        lineTension: 0.5,
        borderWidth: 3,
        data
      }
    };
  }

  function computePressureDataset(): IPressureDataset {
    const labels: string[] = dataFrames.map(
      (frame) => prettierDateString(new Date(frame.key)) || String(frame.key_as_string)
    );
    const data: number[] = dataFrames.map((frame) => frame.value);

    return {
      labels,
      data: {
        label: 'Bar of pressure',
        borderColor: '#ef5878',
        backgroundColor: '#fbd7de',
        lineTension: 0.5,
        borderWidth: 3,
        data
      }
    };
  }

  function renderChart() {
    const context: CanvasRenderingContext2D = chartCanvas.getContext('2d');

    let dataset: IDataset | ITemperatureDataset | IHumidityDataset | IPressureDataset;
    if (name === 'Temperature') dataset = computeTemperatureDataset();
    else if (name === 'Humidity') dataset = computeHumidityDataset();
    else if (name === 'Pressure') dataset = computePressureDataset();

    chart = new Chart(context, {
      type: 'line',
      data: {
        labels: dataset.labels,
        datasets: [dataset?.inside || dataset.data]
      },
      options: {
        elements: {
          point: {
            radius: 1
          }
        },
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            position: 'left',
            text: `${name} over time`,
            font: {
              size: 20
            }
          },
          legend: {
            display: true,
            usePointStyle: true,
            borderRadius: 10,
            labels: {
              padding: 12,
              boxWidth: 20,
              usePointStyle: true
            }
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.001
              },
              // pinch: {
              // 	enabled: true
              // },
              mode: 'xy'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            offset: true,
            ticks: {
              color: 'black'
            },
            grid: {
              color: 'rgba(0,0,0,0.06)'
            }
          },
          x: {
            grid: {
              color: 'rgba(0,0,0,0.06)'
            }
          }
        }
      }
    });

    chart.update();
  }

  onMount(() => renderChart());
  afterUpdate(() => {
    console.log('after update run');
    chart.destroy();
    renderChart();
  });
</script>

<canvas id="{name}" bind:this="{chartCanvas}" width="400" height="400"></canvas>
