<script setup>
import AuthService from '../services/auth-service';
import { useRouter } from "vue-router";

const authService = new AuthService();
const router = useRouter();

const logout = async () => {
    authService.logout();
    router.push({ name: 'login'});
};

const routeNames = ["login", "register"];

</script>

<template>
    <button 
        v-if="!routeNames.includes($route.name)" 
        class="btn btn-danger" 
        @click="logout" 
        type="button">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
        Sign out
    <!-- {{ $route.name }} -->
    </button>
</template>