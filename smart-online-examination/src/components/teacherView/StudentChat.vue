<template>
  <apexchart
    type="area"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'StudentProgressChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    progressData: {
      type: Object,
      required: true
    }
  },
  computed: {
    series() {
      return [
        {
          name: 'Score',
          data: this.progressData.scores
        }
      ]
    },
    chartOptions() {
      return {
        chart: {
          type: 'area',
          height: 350,
          zoom: { enabled: false }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        title: {
          text: 'Student Progress Over Time',
          align: 'left'
        },
        subtitle: {
          text: 'This chart shows score improvements',
          align: 'left'
        },
        labels: this.progressData.dates,
        xaxis: {
          type: 'datetime',
          title: { text: 'Date' }
        },
        yaxis: {
          title: { text: 'Score (%)' }
        },
        legend: {
          horizontalAlign: 'left'
        }
      }
    }
  }
}
</script>
