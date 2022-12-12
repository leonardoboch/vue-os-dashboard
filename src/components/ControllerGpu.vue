<template>
  <div>
    <v-container>
        <v-row>
            <v-col>
                <v-card elevation="6" class="mx-auto">
                    <v-row>
                    <v-col>
                        {{`Controller [${index + 1}]: ${controller.vendor} - ${controller.model}`}}
                    </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            {{`VRAM: ${controller.vram}MB`}}
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['item', 'index'],
  data() {
    return {
      controller: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loadController();
    },
    loadController() {
      if (this.item) {
        this.controller = this.item;
      }
    },
  },

};
</script>

<style scoped>

</style>
