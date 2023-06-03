<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import {
    Chart,
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Title,
    Legend
  } from 'chart.js';
  import { getRelativePosition } from 'chart.js/helpers';

  import type { ChartDataset } from 'chart.js';
  import type IChartFrame from '../interfaces/IChartFrame';

  Chart.register(
    LineElement,
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Title,
    Legend
  );

  export let name: string;
  export let dataFrames: IChartFrame[];
  export let hideTitle: boolean;
  let chartCanvas: HTMLCanvasElement;
  let chart: Chart;

  onMount(() => renderChart());
  afterUpdate(() => {
    chart.destroy();
    renderChart();
  });

  // Converts Date to format suitable for the current range displayed
  function dateLabelsFormatedBasedOnResolution(dataFrames: IChartFrame[]): string[] {
    const firstFrame = dataFrames[0];
    const lastFrame = dataFrames[dataFrames.length - 1];
    const deltaSeconds =
      (new Date(lastFrame.key).getTime() - new Date(firstFrame.key).getTime()) / 1000;
    let dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    };

    if (deltaSeconds < 3600) {
      dateOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    } else if (deltaSeconds <= 86400) {
      dateOptions = { hour: 'numeric', minute: 'numeric' };
    } else if (deltaSeconds <= 2592000) {
      dateOptions = {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      };
    }

    const scaledDate = new Intl.DateTimeFormat('no-NB', dateOptions);
    return dataFrames.map((frame) => scaledDate.format(frame.key));
  }

  // set dataset label & colors matching the name sent as prop
  function setDataColorAndName(data: ChartDataset) {
    if (name === 'Pressure') {
      Object.assign(data, {
        label: 'Bar of pressure',
        borderColor: '#ef5878',
        backgroundColor: '#fbd7de'
      });
    } else if (name === 'Humidity') {
      Object.assign(data, {
        label: '% humidity',
        borderColor: '#57d2fb',
        backgroundColor: '#d4f2fe'
      });
    } else if (name === 'Temperature') {
      Object.assign(data, {
        label: '℃ inside',
        borderColor: '#10e783',
        backgroundColor: '#c8f9df'
      });
    }
  }

  function renderChart() {
    const context: CanvasRenderingContext2D | null = chartCanvas.getContext('2d');
    if (!context) return

    // create labels and singular dataset (data)
    const labels: string[] = dateLabelsFormatedBasedOnResolution(dataFrames);
    const data: ChartDataset = {
      data: dataFrames.map((frame) => frame.value),
      borderWidth: 3,
    };
    // based on name, add label and color options to dataset
    setDataColorAndName(data)


    // create chart instance, most here is chart options
    chart = new Chart(context, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [data]
      },
      options: {
        animation: {
          duration: 0
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.5
          }
        },
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: !hideTitle,
            position: 'left',
            position: 'top',
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
          },
          tooltip: {
            titleFont: {
              size: 14
            },
            bodyFont: {
              size: 14
            },
            enabled: true
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
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
</script>

<canvas id="{name}" bind:this="{chartCanvas}" width="400" height="400"></canvas>
