<template>
  <v-container fluid fill-height>
    <v-row>
        <v-col cols="auto">
            <v-card elevation="12" class="mx-auto">
                <v-row>
                    <v-col>
                        <h1>
                            CPU Info
                        </h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card v-if="cpuInfo != null">
                            <v-row>
                                <v-col>
                                  <cpu-chart :_labels="cores" :_sets="coresUse"></cpu-chart>
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
import services from '@/services/services';
import CpuChart from '@/components/CpuChart.vue';

export default {
  components: {
    CpuChart
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      },
      cpuInfo: null,
      cores: 0,
      coresUse: null,
      speed: null,
    }
  },
  watch: {
    cpuInfo: {
      handler(value){
        const data = value;
        this.cores = data.cores;
      },
      deep: true,
      immediate: true,
    },
    speed: {
      immediate: true,
      handler(value){
        const data = value;
        this.coresUse = data.cores;
      }
    }

  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.setCpuInfo();
      this.loadCpuSpeed();
    },
    loadCpuSpeed() {
      services.getCPU('speed').then((response) => {
        this.speed = response.data;
      }).catch((error) => console.log(error));
      setTimeout(() => {
        this.loadCpuSpeed();
      }, 1000);
    },
     async loadCpuInfo(){
      const response = await services.getInfos('cpu');
      return response.data;
    },
   async setCpuInfo() {
      this.cpuInfo =  await this.loadCpuInfo();
    }
  },

};
</script>

<style>

</style>
