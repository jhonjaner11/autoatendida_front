<template>
<v-container>
      <v-row >
        <v-col cols="3">
           <v-card
            color="blue"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title ><v-toolbar-title>Pesaje Internos</v-toolbar-title>
   
                   
                 </v-card-title>

                <v-card-subtitle >Registrados hoy</v-card-subtitle>
              </div>

              <v-avatar
                class="ma-4"
                size="50"
                left
              >
              <h1>{{numPesInt}}</h1>
              
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <v-col cols="3">
           <v-card
            color="green"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title ><v-toolbar-title>Pesaje Externos</v-toolbar-title>
   
                   
                 </v-card-title>

                <v-card-subtitle >Registrados hoy</v-card-subtitle>
              </div>

              <v-avatar
                class="ma-4"
                size="50"
                left
              >
              <h1>{{numPesExt}}</h1>
              
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <v-col cols="3">
           <v-card
            color="blue"
            dark
            to="/productos"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title ><v-toolbar-title>Productos</v-toolbar-title>
   
                   
                 </v-card-title>

                <v-card-subtitle >Registrados</v-card-subtitle>
              </div>

              <v-avatar
                class="ma-4"
                size="50"
                
              >
              <h1>{{numProductos}}</h1>
              
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            color="#001b48"
            dark
          >
            <v-card-title class="headline">Pesaje Interno</v-card-title>

            <v-card-subtitle>Registrados hoy en vista reducida</v-card-subtitle>
            <v-card-text>
                <v-data-table
                    :headers="headersInterno"
                    :items="pesaje_int"
                    :items-per-page="5"
                    class="elevation-1"
                >
                <template v-slot:item.fecha_ingreso="{ item }">
                  {{ formatDate(item.fecha_ingreso) }}
                </template>
                </v-data-table>
            </v-card-text>  
            <v-card-actions>
              <v-btn text @click="goPesaje">Detalles</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            color="#018abd"
            dark
          >
            <v-card-title class="headline">Pesaje Externo</v-card-title>

            <v-card-subtitle>Registrados hoy en vista reducida</v-card-subtitle>
            <v-card-text>
                <v-data-table
                    :headers="headersExterno"
                    :items="pesaje_ext"
                    :items-per-page="5"
                    class="elevation-1"
                >
                <template v-slot:item.fecha_ingreso="{ item }">
                  {{ formatDate(item.fecha_ingreso) }}
                </template>
                </v-data-table>
                
            </v-card-text>  
            <v-card-actions>
              <v-btn text @click="goPesajeExterno">Detalles</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>


      </v-row>
    </v-container>
</template>


<script>
  import axios from 'axios';
  import moment from 'moment';
  export default {
    data: () => ({

      numPesInt:0,
      numPesExt:0,
      numProductos:0,

        headersInterno: [
            {
            text: 'Fecha Ingreso',
            align: 'start',
            value: 'fecha_ingreso',
        
            },
            { text: 'Placa', value: 'placa' },
            { text: 'Peso (Kg)', value: 'peso_ingreso' },
            { text: 'Producto', value: 'producto' },

        ],

        headersExterno: [
            {
            text: 'Fecha Ingreso',
            align: 'start',
            
            value: 'fecha_ingreso',
            },
            { text: 'Placa', value: 'placa' },
            { text: 'Peso (Kg)', value: 'peso_ingreso' },
            { text: 'Producto', value: 'producto' },

        ],
        pesaje_int:[],
        pesaje_ext:[],
        uri_int: 'http://prueba.childrenplanet.com.co/pesaje_today/',
        uri_ext: 'http://prueba.childrenplanet.com.co/pesaje_externo_today/',
        uri_producto: 'http://prueba.childrenplanet.com.co/producto/',
        
      
      
    }), 
    watch: {
    pesaje_int: function (val) {
      this.numPesInt = this.pesaje_int.length
    },
    pesaje_ext: function (val) {
      this.numPesExt = this.pesaje_ext.length
    }
  },
    methods:{
      formatDate(value) {
        return moment(value).format("DD-MM-YY  HH:MM")
      },
      fetchPesajeInterno(){
        axios.get(this.uri_int)
            .then(resp=>{
                console.log("entro yes");
                this.pesaje_int = resp.data
                this.numPesInt = this.pesaje_int.length
            })
            .catch(err =>{
                console.log(err);
            })
      },
      
      fetchPesajeExterno(){
        axios.get(this.uri_ext)
            .then(resp=>{
                console.log("entro yes");
                this.pesaje_ext = resp.data
                this.numPesExt = this.pesaje_ext.length
            })
            .catch(err =>{
                console.log(err);
            })
      },

      goPesaje(){
         this.$router.push({name:'Pesaje'})
      },
      
      goPesajeExterno(){
         this.$router.push({name:'PesajeExterno'})
      },

      goProducto(){
         this.$router.push({name:'Producto'})
      },

             
      fetchProducto(){
        axios.get(this.uri_producto)
            .then(resp=>{              
                this.numProductos = resp.data.length               
            })
            .catch(err =>{
                console.log(err);
            })
      },
    },
    mounted () {
      this.fetchPesajeInterno(),
      this.fetchPesajeExterno(),
      this.fetchProducto()
    }
  }
</script>

