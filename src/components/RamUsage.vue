<template>
    <v-container fluid fill-height>
      <v-row>
          <v-col cols="auto">
              <v-card elevation="12" class="mx-auto">
                  <v-row>
                      <v-col>
                          <h1>
                              RAM Info GB
                          </h1>
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                          <v-card>
                              <v-row>
                                  <v-col>
                                    <Doughnut
                                    id="ram-chart"
                                    :options="chartOptions"
                                    :data="chartData">
                                    </Doughnut>
                                  </v-col>
                              </v-row>
                          </v-card>
                      </v-col>
                  </v-row>
              </v-card>
          </v-col>
      </v-row>
  
    </v-container>
  </template>
  
  <script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'
  import services from '@/services/services';
  import utils from '@/utils/utils';
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    components: {
      Doughnut,
    },
    data() {
      return {
        chartOptions: {
        responsive: true
      },
      data: null,
      ramData: null,
      keys: null,

      }
    },
    watch: {
      ramData: {
        immediate: true,
        deep: true,
        handler(value) {
          const keys = Object.keys(value);
          this.keys = keys.slice(0,5);
          const values = Object.values(value);
          this.data = values.slice(0,5);
        }
      }
  
    },
    computed: {
      chartData() {
        let data = [];
        const labels = this.keys;
        if(this.data){
          data = this.formatArray(this.data);
        }
        return {  labels: labels,
        datasets: [ { backgroundColor: ['#982649', '#7C8483', '#71A2B6', '#60B2E5', '#53F4FF', '#F87575'], data: data } ]};
    }
    },
    created() {
      this.load();
    },
    methods: {
      load() {
        this.loadRam();
      },
      loadRam() {
        services.getRAM().then((response) => {
          this.ramData = response.data;
        }).catch((error)=> console.log(error));
        setTimeout(() => this.loadRam() ,1000);
      },
      formatArray(arr) {
        const newArr = [];
        arr.forEach( (element) => {
          newArr.push(utils.formatBytesNoGb(element));
          
        });
        return newArr;
      }
    },
  
  };
  </script>
  
  <style>
  
  </style>
  