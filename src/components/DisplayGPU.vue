<template>
    <div>
      <v-container>
          <v-card elevation="6" class="mx-auto">
              <v-row>
              <v-col>
                   {{`Display [${index + 1}]: ${display.model}`}}
              </v-col>
              <v-col>
                {{`Connection: ${display.connection}`}}
              </v-col>
          </v-row>
          <v-row>
            <v-col>
                {{`MAX Resolution: ${display.resolutionX} x ${display.resolutionY}`}}
            </v-col>
            <v-col>
                {{`Current Resolution: ${display.currentResX} x ${display.currentResY}`}}
            </v-col>
          </v-row>
          </v-card>
      </v-container>
    </div>
  </template>

<script>
export default {
  props: ['item', 'index'],
  data() {
    return {
      display: null,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loaddisplay();
    },
    loaddisplay() {
      if (this.item) {
        this.display = this.item;
      }
    },
  },

};
</script>

  <style scoped>

  </style>
