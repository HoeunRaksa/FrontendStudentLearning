<template>
  <div>
    <apexchart
      width="100%"
      height="400"
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Chart options with zoom and export
const chartOptions = ref({
  chart: {
    type: 'line',
    height: 350,
    zoom: {
      enabled: true,
      type: 'x', // allow horizontal zoom
      autoScaleYaxis: true,
    },
    toolbar: {
      show: true,
      tools: {
        download: true,      // 📥 Export chart as PNG/SVG/CSV
        selection: true,     // Enable selection
        zoom: true,          // 🔍 Zoom in
        zoomin: true,        // ➕ Zoom in button
        zoomout: true,       // ➖ Zoom out button
        pan: true,           // 👆 Drag pan
        reset: true          // 🔄 Reset zoom
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 5
  },
  xaxis: {
    categories: [
      'Mon (May 20)', 'Tue (May 21)', 'Wed (May 22)', 
      'Thu (May 23)', 'Fri (May 24)', 'Sat (May 25)', 'Sun (May 26)'
    ],
    title: { text: 'Next Week' }
  },
  yaxis: {
    title: { text: 'Score (%)' },
    max: 100
  },
  tooltip: {
    y: {
      formatter: (val) => val !== null ? `${val}%` : 'No activity'
    }
  },
  colors: ['#00E396', '#FEB019', '#FF4560']
});

// Student scores by subject with Sunday = no activity
const series = ref([
  {
    name: 'Laravel',
    data: [85, 88, 75, 90, 80, 70, null]
  },
  {
    name: 'Oracle',
    data: [78, 82, 85, 79, 88, 91, null]
  },
  {
    name: 'C#',
    data: [65, 70, 60, 72, 74, 68, null]
  }
]);
</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts,
  },
};
</script>
