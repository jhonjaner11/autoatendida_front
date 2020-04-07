
<template>
  <v-app>
    <NavBar/>
    <v-content>
     <router-view/> 
    </v-content>

  </v-app>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar'

export default {
  name: 'Home',
  components: {
      NavBar,
    
  }
}
</script>

  