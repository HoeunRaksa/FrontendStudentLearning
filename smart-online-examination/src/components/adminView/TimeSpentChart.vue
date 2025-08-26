<template>
  <div class="flex justify-center items-center p-6">
    <apexchart
      width="150"
      type="donut"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'DonutTimeChart',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const timeData = [6, 4, 3.5, 5, 7, 2.5, 4] // Time spent
    const maxTime = Math.max(...timeData)

    // Green base: 40% to 100% opacity depending on time spent
    const getGreenWithOpacity = (time) => {
      const alpha = 0.4 + (time / maxTime) * 0.6 // Range: 0.4 - 1
      return `rgba(40, 199, 111, ${alpha.toFixed(2)})` // #28c76f in rgba
    }

    return {
      series: timeData,
      chartOptions: {
        chart: {
          type: 'donut',
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                name: { show: false },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#5E5873',
                  formatter: val => `${val} hrs`
                },
                total: {
                  show: true,
                  label: 'Total',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#6E6B7B',
                  formatter: () => {
                    const total = timeData.reduce((sum, val) => sum + val, 0)
                    return `${total} hrs`
                  }
                }
              }
            }
          }
        },
        labels: Array(timeData.length).fill(''),
        legend: {
          show: false
        },
        tooltip: {
          y: {
            formatter: val => `${val} hrs`
          }
        },
        colors: timeData.map(getGreenWithOpacity),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250
              }
            }
          }
        ]
      }
    }
  }
}
</script>
