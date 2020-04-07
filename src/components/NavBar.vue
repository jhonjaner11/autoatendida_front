<template>
    <nav>
        <v-navigation-drawer
          v-model="drawer"
          :color="color"
          :right="right"
          :src="bg"
          app
          dark
        >
          <v-list
            dense
            nav
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="/iconos/logoColpesaje.png">
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title><h1>Colpesaje</h1></v-list-item-title>
                <v-list-item-subtitle>Bascula Autoatendida</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
  
            <v-divider></v-divider>
  
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
  
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn block @click="logout" >Logout</v-btn>
            </div>
          </template>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' , path:'/Dashboard'},
                { title: 'Pesaje', icon: 'fas fa-truck-pickup', path:'/Pesaje' },
                { title: 'Pesaje Externo', icon: 'fas fa-truck-moving', path:'/PesajeExterno'  },
                { title: 'Productos', icon: 'fa-dolly-flatbed', path:'/Productos'  },
                { title: 'About', icon: 'mdi-help-box' }, <i class=""></i>
            ],
            color: 'black',
            colors: [
                'primary',
                'blue',
                'success',
                'red',
                'teal',
            ],
            drawer: true,
            right: false,
            miniVariant: false,
            expandOnHover: false,
            background: true,
        }
    },
    methods:{
      logout(){

        
        localStorage.removeItem('user_token')
        localStorage.removeItem('user')
        window.location.href = '/login';

      }
    },
    computed: {
      bg () {
        return this.background ? 'img/panel.jpg' : undefined
      },
    }
}
</script>