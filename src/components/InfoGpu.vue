<template>
  <v-container fluid fill-height>
    <v-row>
        <v-col cols="auto">
            <v-card elevation="12" class="mx-auto">
                <v-row>
                    <v-col>
                        <h1>
                            GPU Info
                        </h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <ControllerGpu v-for="(item, index) in controllers"
                            :item="item"
                            :index="index"
                            :key="item.model">
                        </ControllerGpu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <DisplayGPU v-for="(item, index) in displays"
                        :item="item"
                        :index="index"
                        :key="item.model"></DisplayGPU>

                    </v-col>
                </v-row>

            </v-card>
        </v-col>
    </v-row>

  </v-container>
</template>

<script>
import services from '@/services/services';
import ControllerGpu from '@/components/ControllerGpu.vue';
import DisplayGPU from '@/components/DisplayGPU.vue';

export default {
  components: {
    ControllerGpu,
    DisplayGPU,
  },
  data() {
    return {
      controllers: null,
      displays: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loadGPU();
    },
    loadGPU() {
      services.getInfos('gpu').then((resolve) => {
        const { data } = resolve;
        this.controllers = data.controllers;
        this.displays = data.displays;
      }).catch((error) => console.log(error));
    },
  },

};
</script>

<style>

</style>
