<template>
    <v-app >
         <span class="bg"></span>
        <v-card width="350" class="ma-auto " dark  elevation="10">
            <v-card-title primary-title>
                Login
            </v-card-title>
            <v-card-text>
                <v-form >
                    <v-text-field
                        id="username"
                        label="Username"
                        v-model = "username"
                        prepend-icon="fas fa-user"
                    ></v-text-field>
                    <v-text-field
                        :type="showPassword ? 'text': 'password'"
                        id="password"
                        label="Password"
                        v-model = "password"
                        prepend-icon="fas fa-lock"
                        :append-icon="showPassword ? 'fas fa-eye': 'fas fa-eye-slash'"
                        @click:append="showPassword =! showPassword"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            
            <v-card-actions>
                <v-btn color="success" @click="anuncio">Registrarse</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>

import axios from 'axios'
export default {
    name: 'Login',
    components:{

    },
    data(){
        return{
            showPassword: false,
            username: '',
            password: '',
            token: null,
            uri: 'http://prueba.childrenplanet.com.co/'

        }
    },
    methods: {
        login(){
            
            axios.post(this.uri+"auth/", {
                username: this.username,
                password: this.password,

            })
            .then(resp=>{
               
                
                this.token= resp.data.token
                localStorage.setItem('user_token',resp.data.token )
                localStorage.setItem('user',this.username)
                //router.push('Home') 
                this.$router.push({name:'Dashboard'})
                //$router.push({ name: 'Home'})
                //router.push({ name: 'Home'})
                //window.location.href = '/Dashboard';
            })
            .catch(err =>{
                const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'error',
                title: 'Datos incorrectos'
                })
                //localStorage.removeItem('user_token')
                // localStorage.removeItem('user')
            })
            
        },

        anuncio(){
            
            this.$swal.fire(
            'Colpesaje',
            'Contactanos para asignarte un usuario',
            
            )
            
        }

    }
    
}
</script>

<style >
    .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image:  url('/img/b-min.jpg')  ; 
        background-size:cover;
        
       
    }

</style>