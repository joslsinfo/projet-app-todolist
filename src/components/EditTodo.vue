
<script setup>
import {ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router'
import AuthService from "../services/auth-service";
import TodosService from "../services/todos-service";

const authService = new AuthService();
const todosService = new TodosService();

const route = useRoute();
const router = useRouter();
const title = ref("");
const content = ref("");
const timeLimit = ref();
const isLoading = ref(false);
const createdAt = ref();
const updatedAt = ref();

const getTodo = async () => { 
    const todo = await todosService.getTodo(route.params._id)
   
    title.value = todo.data.title,
    content.value = todo.data.content,
    timeLimit.value = todo.data.timeLimit,
    createdAt.value = todo.data.createdAt,
    updatedAt.value = todo.data.updatedAt
 
}

const updateTodo = async () => {
  isLoading.value = true
  const todo = {
    title: title.value,
    content: content.value,
    timeLimit: timeLimit.value
  }

  const id = route.params._id
  await todosService.updateTodo(id, todo);
  isLoading.value = false
  router.push({ name: 'home' });
}

onMounted(getTodo)
</script>









<template>
    <div class="container">
      <div class="container mt-3">
          <div class="row">
              <div class="row">
                  <p class="h2 text-success fw-bold">Edit Todo</p>
                  <div class="flex">
                    <span><strong>Created At:</strong> {{ createdAt }}</span> - <span><strong>Updated At:</strong> {{ updatedAt }}</span>
                  </div>
              </div>
          </div>
      </div>

   
      <div class="container mt-3">
          
      <div class="row">
        <div class="col">
          <form>
            <div class="mb-2">
              <label for="title">Title</label>
              <input type="text" id="title" v-model="title" placeholder="Title" class="form-control" />
            </div>
          
            <div class="mb-2">
              <label for="content">Content</label>
              <textarea
                type="text"
                id="content"
                v-model="content"
                placeholder="Content"
                class="form-control" 
                required
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="content">Time Limit</label>
              <p>Current date limit: {{ timeLimit }}</p>
              <input
                type="datetime-local"
                id="timeLimit"
                v-model="timeLimit"
                placeholder="Date Limite"
                class="form-control"
                required
              />
            </div>
      
            <button
              v-if="!isLoading"
              type="button"
              class="btn btn-success mt-4 w-100"
              @click="updateTodo">
              Update Todo
            </button>
            <button
              v-if="isLoading"
              type="button"
              class="btn btn-success mt-4 w-100">
              Updating Todo...
            </button>
          </form>
        </div>
      </div>
  
      </div>
     
    </div>
  
    
  </template>