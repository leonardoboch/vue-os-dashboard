<template>
    <v-app>
      <v-row>
        <v-col>
          <v-app-bar
        app
        color="primary"
        dark
      >
      <v-container fill-height fluid>
        <v-col cols="3">
          <div>
          </div>
        </v-col>
        <v-row align='end'>
          <v-col cols="3" align="start" justify="center">
            <v-icon>
              mdi-vuejs
            </v-icon>
            VueOS
          </v-col>
          <v-col cols="3" align="end" justify="end">
            <v-icon>
              mdi-chart-histogram
            </v-icon>
            {{`mem: ${ramPercentage(RAM)} %`}}
          </v-col>
          <v-col cols="3" align="end" justify="end">
            <div>
              <v-icon>
              mdi-memory
            </v-icon>
            {{`cpu ${formatSpeedCpu(speedCPU)} GHz`}}
            </div>
          </v-col>
        <v-col cols='3' align='end' justify='end'>
          <v-icon>
            mdi-clock
          </v-icon>
          {{time}}
        </v-col>
      </v-row>
      </v-container>
      </v-app-bar>
        </v-col>
      </v-row>
      <v-row>
    <v-col cols="auto">
      <InfoHardware></InfoHardware>
    </v-col>
    <v-col cols="auto">
      <InfoGpu></InfoGpu>
    </v-col>
    <v-col cols="auto">
      <CpuUsage></CpuUsage>
    </v-col>
    <v-col cols="auto">
      <RamUsage></RamUsage>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col>
      <v-btn @click="pid()">
        Show PID
      </v-btn>
    </v-col>
    <v-col @click="disks()">
      <v-btn>
        Show Disks
      </v-btn>
    </v-col>
    <v-col>
      <v-btn @click="fs()">
        Show File System
      </v-btn>
    </v-col>
  </v-row>
  <v-row v-if="showPid">
    <v-col cols="12">
      <PID></PID>
    </v-col>
  </v-row>
  <v-row v-if="showDisks">
    <v-col cols="12">
      <DiskList></DiskList>
    </v-col>
  </v-row>
  <v-row v-if="showFS">
    <v-col>
      <FileSystemList></FileSystemList>
    </v-col>
  </v-row>
    </v-app>
  </template>

<script>
import services from '@/services/services';
import InfoHardware from '@/components/InfoHardware.vue';
import InfoGpu from '@/components/InfoGpu.vue';
import CpuUsage from '@/components/CpuUsage.vue';
import RamUsage from '@/components/RamUsage.vue';
import PID from './PID.vue';
import DiskList from '@/components/DiskList.vue';
import FileSystemList from './FileSystemList.vue';

export default {
  name: 'NavBar',
  components: {
    InfoHardware,
    InfoGpu,
    CpuUsage,
    RamUsage,
    PID,
    DiskList,
    FileSystemList,
  },

  data() {
    return {
      time: null,
      RAM: null,
      speedCPU: null,
      pidShow: false,
      showDisks: false,
      showPid: false,
      showFS: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loadTime();
      this.loadRAM();
      this.loadCpuSpeed();
    },
    loadTime() {
      services.getTime().then((response) => {
        this.time = response.data;
      }).catch((error) => console.log(error));
      setTimeout(() => {
        this.loadTime();
      }, 1000);
    },
    loadRAM() {
      this.getRAM();

      setTimeout(() => {
        this.loadRAM();
      }, 1000);
    },
    getRAM() {
      services.getRAM().then((response) => {
        this.RAM = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    ramPercentage(ram) {
      if (ram) {
        const { active } = ram;
        const { total } = ram;
        const usedPercentage = ((active * 100) / total);
        return Number.parseFloat(usedPercentage).toFixed(2);
      }
      return '';
    },
    loadCpuSpeed() {
      this.getCpuSpeed();
      setTimeout(() => {
        this.loadCpuSpeed();
      }, 1000);
    },
    getCpuSpeed() {
      services.getCPU('speed').then((response) => {
        this.speedCPU = response.data;
      }).catch((error) => console.log(error));
    },
    formatSpeedCpu(value) {
      if (value) {
        return value.avg;
      }
      return '';
    },
    pid() {
      this.showPid = !this.showPid;
    },
    disks() {
      this.showDisks = !this.showDisks;
    },
    fs() {
      this.showFS = !this.showFS;
    }
  },
};
</script>
