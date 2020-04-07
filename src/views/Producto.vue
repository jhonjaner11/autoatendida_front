<template>
  <v-container grid-list-xs>
    <v-row >
      <v-col cols="4">
        <v-card dark> 

          <v-card-text>
               
           
            <v-data-table
                :headers="headers"
                :items="productos"
                sort-by="calories"
                class="elevation-1"
                :page.sync="page"
                 @page-count="pageCount = $event"
                 hide-default-footer
                  :items-per-page="4"
                
            >
                <template v-slot:top>
                    <v-toolbar flat >
                        <v-toolbar-title>Productos</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-btn icon small @click="fetchProducto">
                          <v-icon >fas fa-sync-alt</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="250px">
                          <template v-slot:activator="{ on }">
                              <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
                          </template>
                          <v-card dark >
                              <v-card-title>
                              <span class="headline">Nuevo Producto</span>
                              </v-card-title>

                              <v-card-text>
                                  
                                  <v-row>
                                      <v-col  cols="6" >
                                          <v-text-field v-model="editedItem.codigo" label="Código"></v-text-field>
                                      </v-col>
                                      <v-col cols="6">
                                          <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                      </v-col>
                                  </v-row>
                                  
                              </v-card-text>

                              <v-card-actions>
                              
                                  <v-btn color="error" class="mb-1"  @click="close">Cancel</v-btn>
                                  <v-spacer></v-spacer>
                                  <v-btn color="primary"  @click="save">Guardar</v-btn>
                              </v-card-actions>
                          </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                            mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row >
  </v-container>
  
</template>
<script>
  import axios from 'axios'
  export default {
    data: () => ({
        //esta variable (edit)se utiliza para diferenciar 
        //si se crea un producto o si se esta editando
        edit: false,
        //id se utiliza para tener el indicador del objeto a 
        //eliminar o editar
        id: '', 
        page: 1,
        pageCount: 0,
        search: '',
        headers: [
            { text: 'Codigo', value: 'codigo' },
            { text: 'Nombre', value: 'nombre' },  
            { text: '', value: 'actions'  },             
        ],
        productos:[],
        uri: 'http://prueba.childrenplanet.com.co/producto/',
        
        dialog: false,
     
        desserts: [],
        editedIndex: -1,
        editedItem: {
            codigo: '',
            nombre: '',   
        },
        defaultItem: {
            codigo: '',
            nombre: '',
        },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        
        val || this.close()
        this.fetchProducto()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
            
      fetchProducto(){
        axios.get(this.uri)
            .then(resp=>{              
                this.productos = resp.data               
            })
            .catch(err =>{
                console.log(err);
            })
      },


    

      initialize () {
        this.desserts = []
      },

        editItem (item) {
            this.edit=true
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.id= item.id
            
            this.dialog = true
        },

        deleteItem (item) {

          //this.$swal('Hello Vue world!!!');
          this.$swal.fire({
            title: 'Desea eliminar el producto?',
            text: "No podra revertir esta acción!",
            icon: 'warning',
            width: 400,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.value) {
              //const index = this.desserts.indexOf(item)
              //confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
                  axios.delete(this.uri+item.id+"/")
                  .then(resp=>{              
                      this.fetchProducto()
                  })
                  .catch(err =>{
                      
                      console.log(err);
                  })
                

              
            }
          })
            
                
        },

      close () {
        this.fetchProducto()
        this.dialog = false
        this.edit=false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        
        
        const cod= this.editedItem.codigo
        const nom= this.editedItem.nombre
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        if(this.edit){
            console.log(this.id);
            
            axios.put(this.uri+this.id+"/",{ "codigo": cod, "nombre": nom })
            .then(resp=>{              
                console.log("yeeeu");
                        
            })
            .catch(err =>{
                console.log(err);
            })
            
            
        }else{
            
            axios.post(this.uri, { "codigo": cod, "nombre": nom })
            .then(resp=>{              
                console.log(resp);
                               
            })
            .catch(err =>{
                console.log(err);
            })
            
        }
        this.fetchProducto()
        this.close()
      },
    },
    
    mounted () {
      this.fetchProducto()
    }
  }
</script>
