<template>
  <v-container>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                     Processes
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
                    :items="items.list"
                    :search="search"
                    item-key="pid"
                ></v-data-table>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import services from '@/services/services';
export default {
    data() {
        return {
            headers: [
                {text: 'Name', value: 'name' },
                {text: 'PID', value: 'pid' },
                {text: 'CPU %', value: 'cpu' },
                {text: 'Mem %', value: 'mem' },
                {text: 'Priority', value: 'priority' },
                {text: 'User', value: 'user' },
            ],
            items: null,
            processes: null,
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
                    this.processes = value.list;
                }
                console.log(this.processes);
            }
        }

    },
    created(){
        this.load();
    },
    methods: {
        load() {
            this.loadProcess();
            
        },
        loadProcess(){
            services.getInfos('process').then((response) => {
                this.items = response.data;
            }).catch((error) => console.log(error));
            
            setTimeout(() => {
                this.loadProcess();
            }, 5000);
        }
    }

}
</script>

<style>

</style>