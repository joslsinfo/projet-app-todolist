
<script setup>
import {ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router'
import AuthService from "../services/auth-service";
import TodosService from "../services/todos-adapter";



const authServiceInstance = AuthService.getInstance();


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
    const todo = await todosService.getTodo(route.params.id)
  
    title.value = todo.title,
    content.value = todo.content,
    timeLimit.value = todo.timeLimit,
    createdAt.value = todo.createdAt,
    updatedAt.value = todo.updatedAt
 
}

const updateTodo = async () => {
  isLoading.value = true
  const todo = {
    title: title.value,
    content: content.value,
    timeLimit: timeLimit.value,
   
  }

  const id = route.params.id

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
              <input type="text" id="title" v-model="title" placeholder="Title" class="form-control" name="title"/>
            </div>
          
            <div class="mb-2">
              <label for="content">Content</label>
              <textarea
                type="text"
                id="content"
                v-model="content"
                placeholder="Content"
                class="form-control" name="content"
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
                class="form-control" name="timeLimit"
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