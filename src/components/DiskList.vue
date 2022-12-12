<template>
    <v-container>
      <v-row>
          <v-col cols="12">
              <v-card>
                  <v-card-title>
                       Disks
                       <v-spacer></v-spacer>
                   <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                      ></v-text-field>
                    </v-card-title>
                  <v-data-table
                      :headers="headers"
                      :items="devices"
                      :search="search"
                  >
                    <template v-slot:[`item.size`]="{ item }">
                        {{formatSize(item)}}
                    </template>
                </v-data-table>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import services from '@/services/services';
  import utils from '@/utils/utils';
  export default {
      data() {
          return {
              headers: [
                  {text: 'Name', value: 'name' },
                  {text: 'Device', value: 'device' },
                  {text: 'Type', value: 'type' },
                  {text: 'Size', value: 'size' },
                  {text: 'Interface', value: 'interfaceType' },
              ],
              items: null,
              devices: [],
              totalProcess: 0,
              loading: true,
              search: '',
          };
      },
      watch: {
          items: {
              deep: true,
              immediate: true,
              handler(value){
                  if(value){
                      this.devices = value;
                  }
              }
          }
  
      },
      created(){
          this.load();
      },
      methods: {
          load() {
              this.loadDisk();
          },
          loadDisk() {
            services.getInfos('disk').then((response) => {
                this.items = response.data;
            }).catch((error => console.log(error)));
          },
          formatSize(item){
            return utils.formatBytes(item.size);
          }
      },
  
  }
  </script>
  
  <style>
  
  </style>