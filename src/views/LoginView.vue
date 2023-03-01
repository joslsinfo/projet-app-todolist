<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import AuthService from "../services/auth-service";

    const authServiceInstance  = AuthService.getInstance();

    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const login = async () => {
        const user = await authServiceInstance.login(email.value, password.value);
        // console.log(user);
        if(user.success) {
            router.push({ name: "home"});
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
                    placeholder="Enter password" 
                    v-model="password" 
                />
            </div>
            <!-- {{ $route.name }} -->
            <button @click="login" type="button" class="btn btn-success mt-4 w-100">
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                Login
            </button>
        </form>

        <span> Tu n'as pas encore un compte ?</span>
      <router-link to="/auth/register" class="btn btn-success ms-3 btn-sm mt-3"><i class="fa fa-registered" aria-hidden="true"></i> Register </router-link>
    </div>
</template>