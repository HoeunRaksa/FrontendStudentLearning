<template>
  <div class="w-full">
    <apexchart
      width="100%"
      height="350"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'StudentPerformanceChart',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'Average Score (%)',
          data: [
            { x: 'Jan 2025', y: 72 },
            { x: 'Feb 2025', y: 78 },
            { x: 'Mar 2025', y: 75 },
            { x: 'Apr 2025', y: 82 },
            { x: 'May 2025', y: 85 },
            { x: 'Jun 2025', y: 88 },
            { x: 'Jul 2025', y: 91 },
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          toolbar: { show: false },
        },
        title: {
          text: 'Student Performance (Monthly Average)',
          align: 'left',
        },
        xaxis: {
          type: 'category',
          labels: {
            rotate: -45,
          },
        },
        yaxis: {
          title: {
            text: 'Score (%)',
          },
          max: 100,
        },
        dataLabels: {
          enabled: true,
        },
        tooltip: {
          x: {
            format: 'MMM yyyy',
          },
        },
        colors: ['#00b894'],
      },
    }
  },
}
</script>
