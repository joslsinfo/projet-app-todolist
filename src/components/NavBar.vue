<script setup>
import LogoutButton from "./LogoutButton.vue";

// const isToken = localStorage.getItem('jwt-token')
// console.log(isToken)

</script>
<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid"> 
    <router-link class="navbar-brand fw-bold" :to="{ name: 'home'}"><i class="fa fa-arrow-alt-circle-left"></i>TODOS</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <!-- <li  v-if="!isToken" >
          <router-link class="btn btn-success me-3" :to="{name: 'login'}">Login</router-link></li> -->
        <li class="nav-item">
          <LogoutButton />
        </li>
      
        
        <li class="nav-item">
            <a class="nav-link ms-4" aria-current="page" href="#">Jean Oldor Saintus </a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
<hr>

<div class="row my-5">
  <div class="col text-center mb-3">
    <img class="img-logo" src="../assets/logoVueJS.png" alt="Logo VueJS">
    <p class="h3 display-7 text-muted"> Bienvenue sur l'application Todos de Vue JS</p>
  </div>
</div>
<hr>
</template>



