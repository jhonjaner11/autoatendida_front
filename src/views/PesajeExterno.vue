<template>  
  <v-container>
      <v-row >
        <v-col cols="12">
          <v-card dark>
            
            <v-card-title primary-title >

                
                    <v-toolbar-title>Pesaje Externo</v-toolbar-title>
                    
                    <v-divider
                    class="mx-3"
                    inset
                    vertical
                    ></v-divider>
                     <v-btn icon small @click="fetchPesaje">
                       <v-icon >fas fa-sync-alt</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green"  @click="exportar" class="mb-2">Exportar</v-btn>
                 
            </v-card-title>
            
            <v-card-text>

              <v-data-table
              dark
                  darken-4
                  :headers="headers"
                  :items="pesajes"
                  :items-per-page="5"
                  class="elevation-1"
              >
                <template v-slot:item.fecha_ingreso="{ item }">
                  {{ formatDate(item.fecha_ingreso) }}
                </template>
                <template v-slot:item.fecha_salida="{ item }">
                  {{ formatDate(item.fecha_salida) }}
                </template>
              </v-data-table>
            
            </v-card-text>
            
           
         </v-card>
        </v-col>


    </v-row>
  </v-container>
</template>


<script>
  import XLSX from 'xlsx'
  import axios from 'axios'
  import moment from 'moment';
  export default {
    data () {
      return {
        search: '',
        headers: [
            { text: 'Fecha Ingreso', value: 'fecha_ingreso' },
            { text: 'Fecha Salida', value: 'fecha_salida' },
            { text: 'Placa', value: 'placa' },
            { text: 'Peso Ingreso (Kg)', value: 'peso_neto' },
            { text: 'Peso Salida (Kg)', value: 'peso_ingreso' },
            { text: 'Peso Neto (Kg)', value: 'peso_salida' },
            { text: 'Producto', value: 'producto' },
        ],
        pesajes:[],
        uri: 'http://prueba.childrenplanet.com.co/pesaje_externo/',
        
      }
    }  ,
    
    methods:{
      formatDate(value) {
       if(value!=null){
          return moment(value).format("DD-MM-YY HH:MM")
        } 
      },
      fetchPesaje(){
        axios.get(this.uri)
            .then(resp=>{
                console.log("entro yes");
                this.pesajes = resp.data
                
            })
            .catch(err =>{
                console.log("nain");
            })
      },
      exportar(){
        let data = XLSX.utils.json_to_sheet(this.pesajes)
        const workbook = XLSX.utils.book_new()
        const filename = 'pesaje'
        XLSX.utils.book_append_sheet(workbook, data, filename)
        XLSX.writeFile(workbook, `${filename}.xlsx`)
      }


    },
    

    mounted () {
    
      this.fetchPesaje()
    }
  }
    
</script>