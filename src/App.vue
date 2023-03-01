<script setup>
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import AuthService from "./services/auth-service";
import NavBar from "./components/NavBar.vue";


const authServiceInstance  = new AuthService();
const router = useRouter();

const tryAuth = async () => {
  const user = await authServiceInstance.authenticate();

  if(!user) {
    router.push({ name: "login" });
  } else {
    router.push({ name: "home" });
  }
};

onMounted(tryAuth);
</script>

<template>
  <div class="mt-2">
 
    <NavBar />
    <RouterView />
  </div>
 </template>



<style scoped>

</style>
