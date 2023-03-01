
<script setup>

import {ref, onMounted, watch } from "vue";

import TodosService from "../services/todos-adapter";
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import TodosObserver from '../services/todos-observer';
import { todoEvents } from '../services/todos-observer';

const todosService = new TodosService();


const todo = ref(null);
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id);
const isLoading = ref(false)

const todos = ref([]);

const getTodo = async () => { 
    todo.value = await todosService.getTodo(id.value)
 
}

const toggleTodoStatus = async () => {
    const time = new Date()
    todo.value = await todosService.updateTodo(id.value, {done: !todo.value.done, doneAt: time})

 
}

const deletTodo = async () => {
    isLoading.value = ref(true)
    await todosService.deleteTodo(id.value)
    isLoading.value = ref(false)
    router.push({ name: 'home'});
}

const todosObserver = new TodosObserver(todos);


watch(todo, () => {
    todo.value = todo.value
    todosObserver.publish(todoEvents.onUpdate, todo.value);
}, { deep: true })


onMounted(async () => {

    getTodo();
})

onMounted(getTodo)

</script>

<template>
    <div class="container p-5">
        <h1 class="h3 text-success fw-bold">Détail du todo</h1>
        <div class="flex" v-if="todo">
           
            <span><strong>Created At:</strong> {{ todo.createdAt }}</span> - <span><strong>Updated At:</strong> {{ todo.updatedAt}}</span>
        </div>
        <hr>
        <div class="row" v-if="todo">
            <h1>{{ todo.title }}</h1>
            <small class="fst-italic">By: {{ todo.user }}</small>
            <p class="lead" v-html="todo.content"></p>
            <hr>
            <div v-if="todo.done">
                <button type="button" class="btn btn-outline-success" @click="toggleTodoStatus">
                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                    Done
                </button>
                <p class="mt-2">Done At: {{ todo.doneAt }}</p>
            </div>
            <div v-else>
                <button type="button" class="btn btn-outline-danger" @click="toggleTodoStatus">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Not Done
                </button>
                <p class="mt-2">Time Limit: {{ todo.timeLimit }}</p>
            </div>
            <hr>
            <div class="my-3">
                <router-link to="/" class="btn btn-success me-4"><i class="fa fa-arrow-alt-circle-left"></i>Back</router-link>
                <router-link  class="btn btn-primary me-4" :to="{name: 'EditTodo', params: { id: todo.id }}"><i class="fa fa-pencil" aria-hidden="true"></i> Modifier</router-link>
                <button v-if="!isLoading" class="btn btn-danger" @click="deletTodo"><i class="fa fa-trash" aria-hidden="true"></i> Supprimer</button>
                <button v-if="isLoading" class="btn btn-danger" ><i class="fa fa-trash" aria-hidden="true"></i> En cours de suppression...</button>
            </div>
        </div>
        <div v-else>Loading data... 
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>