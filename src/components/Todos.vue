<script setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import TodosService from "../services/todos-adapter";
import TodosObserver from "../services/todos-observer";
import Modal from "./Modal.vue";
import NewTodo from "./NewTodo.vue";



const todosService = new TodosService();





const todo = ref(null)
const todosRef = ref([])

const todos = ref([])
const isCreateModalOpen = ref(false)
let isLoading = ref(false)
const show = ref(true)
const message = ref('Cliquer ici pour accéder au détail du todo')


const todosObserver = new TodosObserver((todos) => {
  // Update the todos list
  todosRef.value = todos;

});

const getTodos = async () => {
    isLoading.value = ref(true)
    todos.value = await todosService.getTodos()
    todosRef.value = todos.value;
    console.log(todos.value);
    isLoading.value = ref(false)
};



/*********************************************/
//filters methods
/*********************************************/
// Tâches dépassées
const filterTodoDepasser = () => {
     const todoss =  todosRef.value

    const currentTime = new Date()
    

    todosRef.value = todoss.filter( (mytodo) => mytodo.done == false && mytodo.timeLimit < currentTime.toISOString() )


}

// Tâches pas de limite 
const filterTodoNoDateLimit = () => {

    const todoss =  todosRef.value

    todosRef.value = todoss.filter( (mytodo) => mytodo.timeLimit == null || mytodo.timeLimit == '' )
      
}
// Tâches encore dans les temps
const filterTodoNotDue = () => {

    const todoss =  todosRef.value
    const currentTime = new Date()
 
    todosRef.value = todoss.filter( (mytodo) => (mytodo.timeLimit > currentTime.toISOString() && mytodo.done == false) )
   
}

// Tâches accomplies dans les temps
const filterTodoDoneOnTime = () => {
 
      const todoss =  todosRef.value
    const currentTime = new Date()

    todosRef.value = todoss.filter( (mytodo) => (mytodo.doneAt < mytodo.timeLimit && mytodo.done == true) )
     
}

// Tâches accomplies hors des temps
const filterTodoDoneLate = () => {

     const todoss =  todosRef.value
    const currentTime = new Date()

    todosRef.value = todoss.filter( (mytodo) => (mytodo.doneAt > mytodo.timeLimit && mytodo.done == true) )
     
}



const onModalClose = () => {
  todo.value = null;
};

const onToggleCreateModal = () => {
    console.log("Result:", isCreateModalOpen.value);
    isCreateModalOpen.value = !isCreateModalOpen.value;
  
};


watch(todos, () => {
    getTodos()
    
}, { deep: true })

onMounted(getTodos);




</script>

<template>
    <div class="container" >
        <div class="container mt-5">
            <div class="d-flex justify-content-center my-4">

                <button type="button" @click="filterTodoDepasser" class="btn btn-secondary me-2">Dépasser</button>
                <button type="button" @click="filterTodoNoDateLimit" class="btn btn-primary me-2">Pas de date limite</button>
                <button type="button" @click="filterTodoNotDue" class="btn btn-success me-2">Toujours en cours</button>
                <button type="button" @click="filterTodoDoneOnTime" class="btn btn-info me-2">Faire à temps</button>
                <button type="button" @click="filterTodoDoneLate" class="btn btn-danger me-2">Faire en retard</button>
            </div>
            <div class="row">
                <div class="col">
                    <p class="h3 text-success fw-bold"> Todos Task Manager
                        <button type="button" class="btn btn-success btn-sm" @click="onToggleCreateModal"><i
                                class="fa fa-plus-circle me-1"></i>Create</button>
                    </p>
                </div>
            </div>

        </div>
      

        <div>
            <div class="container mt-3" v-if="isLoading">
                <div class="row" v-if="todosRef">
                    <div class="col-md-6" v-for="todo in todosRef" :key="todo.id">
                        <div class="card my-2 list-group-item-success shadow-lg">
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item">Id: <span class="fw-bold" :title="message">
                                            <router-link :to="{ name: 'ViewTodo', params: { id: todo.id } }"
                                                class="text-success fs-5 my-1">{{ todo.id }}<i class="fa fa-eye"></i>
                                            </router-link></span>
                                    </li>
                                    <li class="list-group-item">Title: <span class="fw-bold">{{ todo.title}}</span></li>
                                    <li class="list-group-item">Content: <span class="fw-bold">{{ todo.content}}</span></li>
                                    <li class="list-group-item">Done: <span class="fw-bold">{{ todo.done}}</span></li>
                                    <li class="list-group-item">Time Limit: <span class="fw-bold">{{ todo.timeLimit }}</span></li>
                                    
                                    
                                </ul>
        
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>Loading data... 
                    <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
       
   
        
        </div>
    </div>
    
    
    <Modal :isOpen="isCreateModalOpen" :toggleModal="onToggleCreateModal" @closeModal="onToggleCreateModal">
        <NewTodo @closeModal="onToggleCreateModal" />
    </Modal>
  

    
</template>
