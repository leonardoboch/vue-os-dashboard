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
                      :items="list"
                      :search="search"
                  >
                    <template v-slot:[`item.size`]="{ item }">
                        {{formatSize(item)}}
                    </template>
                    <template v-slot:[`item.used`]="{ item }">
                        {{formatSize(item)}}
                    </template>
                    <template v-slot:[`item.available`]="{ item }">
                        {{formatSize(item)}}
                    </template>
                    <template v-slot:[`item.use`]="{ item }">
                        {{`${item.use ? item.use : 0}%`}}
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
                  {text: 'File System', value: 'fs' },
                  {text: 'Type', value: 'type' },
                  {text: 'Size', value: 'size' },
                  {text: 'Used', value: 'used' },
                  {text: 'Available', value: 'available' },
                  {text: 'Used %', value: 'use' },
              ],
              items: null,
              list: [],
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
                      this.list = value;
                  }
              }
          }
  
      },
      created(){
          this.load();
      },
      methods: {
          load() {
              this.loadFs();
          },
          loadFs() {
            services.getInfos('fs').then((response) => {
                console.log(response.data);
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