<script setup>
defineProps({
  isOpen: Boolean,
  toggleModal: Function,
});


</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" role="dialog">
      <div class="container"></div>
      <div class="background" @click="toggleModal"></div>
      <div class="not-a-modal container">
        <button class="close btn btn-dark ms-2" @click="toggleModal">X</button>
        <section class="modal__content">
          <slot ></slot>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
div[role="dialog"] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-items: center;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.not-a-modal {
  background-color: white;
  padding: 1rem;
  z-index: 20;
  color: black;
  width: 50%;
}
</style>
