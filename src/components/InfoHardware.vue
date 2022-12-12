<template>
  <v-container fill-height fluid>
    <v-row>
        <v-col cols="auto">
            <v-card elevation="12">
                <v-row>
                    <v-col>
                        <h1>
                            Hardware Info
                        </h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{`CPU: ${cpu.manufacturer} - ${cpu.brand}`}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{`Total RAM: ${formatBytes(ram.total)}`}}
                    </v-col>
                    <v-col>
                      {{`Active RAM: ${formatBytes(ram.active)}`}}
                    </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    {{`MotherBoard: ${board.manufacturer} - ${board.model}`}}
                  </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import services from '@/services/services';
import utils from '@/utils/utils';

export default {
  name: 'InfoHardware',
  data() {
    return {
      cpu: null,
      ram: null,
      board: null,
      bios: null,
      gpu: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loadInfo();
    },
    loadInfo() {
      this.loadCpu();
      this.loadGPU();
      this.loadRam();
      this.loadMotherBoard();
      // this.loadBios();
    },
    loadCpu() {
      services.getInfos('cpu').then((response) => {
        this.cpu = response.data;
      }).catch((error) => console.log(error));
    },
    loadRam() {
      services.getRAM().then((response) => {
        this.ram = response.data;
      }).catch((error) => console.log(error));

      setTimeout(() => {
        this.loadRam();
      }, 1000);
    },
    loadMotherBoard() {
      services.getInfos('mother-board').then((response) => {
        this.board = response.data;
      }).catch((error) => console.log(error));
    },
    loadBios() {
      services.getInfos('bios').then((response) => {
        console.log(response.data);
        this.bios = response.data;
      }).catch((error) => console.log(error));
    },
    loadGPU() {
      services.getInfos('gpu').then((response) => {
        this.gpu = response.data;
      }).catch((error) => console.log(error));
    },
    formatBytes(bytes) {
      if (bytes) {
        return utils.formatBytes(bytes);
      }
      return '';
    },
  },

};
</script>

<style>

</style>
