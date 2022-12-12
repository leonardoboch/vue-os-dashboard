<template>
    <v-container>
        <v-row>
            <v-col>
                <Bar
                    id="cpu-chart"
                    :options="chartOptions"
                    :data="chartData"
                ></Bar>
            </v-col>
        </v-row>
    </v-container>
  
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
 import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: 'CpuChart',
  props: ['_labels', '_sets'],
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    chartData() {
        const data = [];
        const labels = [];
        if(this._sets){ 
            for(let i = 0; i < this._sets.length ; i++) {
                data.push(this._sets[i]);
            }
        }
        if(this._labels) {
            for(let i = 0; i < this._labels; i++) {
            labels.push(`Core #${i + 1 }`)
        }

        }
        return {  labels: labels,
        datasets: [ { label: ' Velocidade GHz', backgroundColor: '#5C95FF', data: data } ]};
    }
  },
  watch: {
  },
  created() {
    this.load();
  },
  methods: {
    load() {
        this.setLabels();
    },
    setLabels() {
        for(let i = 0; i < this._labels; i++) {
            this.chartData.labels.push(`Core #${i + 1 }`)
        }
    },
  }
}
</script>

<style>

</style>