<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../services/auth-service";

const authServiceInstance = AuthService.getInstance();

const email = ref("");
const password = ref("");
const passwordRetype = ref("");

const router = useRouter();

const register = async () => {

    if(password.value !== passwordRetype.value) return;

    const user = await authServiceInstance.register(email.value, password.value);
   
    // console.log(user);

    if(user.success) {
        router.push({name: "home"});
    }

    // console.log(email.value, password.value);
};

</script>

<template> 
    <div class="container-fluid">
            <form class="container">
                <div class="form-group">
                    <label for="email">Email address</label>
                        <span class="input-group-addon"> <i class="fa fa-envelope fa-fw"> </i></span>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="email" 
                        placeholder="Enter email" 
                        v-model="email" 
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                      <span class="input-group-addon"> <i class="fa fa-key fa-fw"> </i> </span>
                    <input 
                       type="password" 
                       class="form-control" 
                       id="password" 
                       placeholder="Password" 
                       v-model="password" 
                    />
                </div>
                <div class="form-group">
                    <label for="password-retype">Retype Password</label>
                      <span class="input-group-addon"> <i class="fa fa-key fa-fw"> </i> </span>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password-retype" 
                        placeholder="Password" 
                        v-model="passwordRetype" 
                    />
                </div>
                <button 
                    @click="register" 
                    type="button" 
                    class="btn btn-success mt-4 w-100"
                    >
                    <i class="fa fa-registered" aria-hidden="true"></i>
                    Register
                </button>
            </form>
            <span> Tu as déjà un compte ?</span>
            <router-link to="/auth/login" class="btn btn-success ms-3 btn-sm mt-3">  <i class="fa fa-sign-in" aria-hidden="true"></i> Login</router-link>
        </div>
     </template>