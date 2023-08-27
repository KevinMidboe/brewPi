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
    Legend,
    Filler
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
    Legend,
    Filler
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
    if (dataFrames.length < 2) return ['NO DATA'];

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

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  function createLineBackgroundGradient(hex: string, context: CanvasRenderingContext2D) {
    const gradient = context.createLinearGradient(0, 0, 0, 400);
    const c = hexToRgb(hex);
    if (c == null) return;

    gradient.addColorStop(0.2, `rgb(${c.r}, ${c.g}, ${c.b}, 0.8)`);
    gradient.addColorStop(1, `rgb(${c.r}, ${c.g}, ${c.b}, 0.2)`);
    return gradient;
  }

  // set dataset label & colors matching the name sent as prop
  function setDataColorAndName(data: ChartDataset, context: CanvasRenderingContext2D) {
    if (name === 'Pressure') {
      Object.assign(data, {
        label: 'Bar of pressure',
        borderColor: '#ef5878',
        fill: true,
        backgroundColor: createLineBackgroundGradient('#fbd7de', context)
      });
    } else if (name === 'Humidity') {
      Object.assign(data, {
        label: '% humidity',
        borderColor: '#57d2fb',
        fill: true,
        backgroundColor: createLineBackgroundGradient('#d4f2fe', context)
      });
    } else if (name === 'Temperature') {
      Object.assign(data, {
        label: '℃ inside',
        borderColor: '#10e783',
        fill: true,
        backgroundColor: createLineBackgroundGradient('#c8f9df', context)
      });
    }
  }

  function renderChart() {
    const context: CanvasRenderingContext2D | null = chartCanvas.getContext('2d');
    if (!context) return;

    // create labels and singular dataset (data)
    const labels = dateLabelsFormatedBasedOnResolution(dataFrames);
    const data: ChartDataset = {
      data: dataFrames.map((frame) => frame.value),
      borderWidth: 3
    };

    // based on name, add label and color options to dataset
    setDataColorAndName(data, context);

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
              //  enabled: true
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
