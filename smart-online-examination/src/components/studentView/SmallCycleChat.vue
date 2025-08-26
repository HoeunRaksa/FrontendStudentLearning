<template>
  <div class="flex justify-center items-center ">
    <apexchart
      width="70"
      height="70"
      type="donut"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'DonutScoreChart',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    const score = 75 // student's score (out of 100)

    // Green opacity based on score percentage
    const alpha = 0.3 + (score / 100) * 0.7 // range from 0.3 to 1
    const greenColor = `rgba(40, 199, 111, ${alpha.toFixed(2)})`
    const grayColor = '#e0e0e0'

    return {
      series: [score, 100 - score],
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
              size: '75%',
              labels: {
                show: true,
                name: { show: false },
                value: {
                  show: true,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#5E5873',
                  formatter: () => `${score}%`
                },
                total: {
                  show: true,
                  label: '',
                  fontSize: '10px',
                  fontWeight: 400,
                  color: '#6E6B7B',
                  formatter: () => `${score}%`
                }
              }
            }
          }
        },
        labels: ['Score', 'Remaining'],
        legend: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        colors: [greenColor, grayColor],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              }
            }
          }
        ]
      }
    }
  }
}
</script>
