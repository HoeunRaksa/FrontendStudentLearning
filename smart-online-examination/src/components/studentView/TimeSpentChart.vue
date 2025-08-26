<template>
  <div class="flex justify-center items-center p-6">
    <apexchart
      width="150"
      type="donut"
      :options="chartOptions"
      :series="weeklyHours"
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
  props: {
    weeklyHours: {
      type: Array,
      required: true
    }
  },
  computed: {
    maxTime() {
      return Math.max(...this.weeklyHours)
    },
    chartOptions() {
      const getGreenWithOpacity = (time) => {
        const alpha = 0.4 + (time / this.maxTime) * 0.6
        return `rgba(40, 199, 111, ${alpha.toFixed(2)})`
      }

      const total = this.weeklyHours.reduce((sum, val) => sum + val, 0)

      return {
        chart: { type: 'donut' },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
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
                  formatter: () => `${Math.floor(total)} hrs`
                }
              }
            }
          }
        },
        labels: Array(this.weeklyHours.length).fill(''),
        legend: { show: false },
        tooltip: {
          y: { formatter: val => `${val} hrs` }
        },
        colors: this.weeklyHours.map(getGreenWithOpacity),
        responsive: [
          {
            breakpoint: 480,
            options: { chart: { width: 250 } }
          }
        ]
      }
    }
  }
}
</script>
