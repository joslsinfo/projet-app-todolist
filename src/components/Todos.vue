<script setup>
import { ref, onMounted, watch } from "vue";
import TodosService from "../services/todos-service";
import Modal from "./Modal.vue";
import NewTodo from "./NewTodo.vue";
// import dayjs from 'dayjs'

const todosService = new TodosService();


// const c = dayjs();
// console.log("Format de date:", c.format('DD-MM-YYYY'))

const todo = ref(null)
const todos = ref([])
const isCreateModalOpen = ref(false)
let isLoading = ref(false)
const show = ref(true)
const message = ref('Cliquer ici pour accéder au détail du todo')


const getTodos = async () => {
    isLoading.value = ref(true)
    todos.value = await todosService.getTodos()
    console.log(todos.value);
    isLoading.value = ref(false)
};


// computed = {
//     formatDate() {
//         return date => {
//             return dayjs(date).format('MMMM DD, YYYY')
//         }
//     }
// }

// const formatDate = ref(date => {

//     return dayjs(date).format('MMMM DD, YYYY')
// })
// console.log("Format de date:", formatDate)



//filters methods
// Tâches dépassées
const filterTodoDepasser = () => {
    const todoss =  todos.value
    const currentTime = new Date()
    
    todos.value = todoss.filter( (mytodo) => mytodo.done == false && mytodo.timeLimit < currentTime.toISOString() )
   

}

// Tâches pas de limite 
const filterTodoNoDateLimit = () => {
    const todoss =  todos.value
    todos.value = todoss.filter( (mytodo) => mytodo.timeLimit == null || mytodo.timeLimit == '' )
}
// Tâches encore dans les temps
const filterTodoNotDue = () => {
    const todoss =  todos.value
    const currentTime = new Date()
    todos.value = todoss.filter( (mytodo) => (mytodo.timeLimit > currentTime.toISOString() && mytodo.done == false) )
}

// Tâches accomplies dans les temps
const filterTodoDoneOnTime = () => {
    const todoss =  todos.value
    const currentTime = new Date()
    todos.value = todoss.filter( (mytodo) => (mytodo.doneAt < mytodo.timeLimit && mytodo.done == true) )
}

// Tâches accomplies hors des temps
const filterTodoDoneLate = () => {
    const todoss =  todos.value
    const currentTime = new Date()
    todos.value = todoss.filter( (mytodo) => (mytodo.doneAt > mytodo.timeLimit && mytodo.done == true) )
}


const onTodoClick = (t) => {
  todo.value = t;
  console.log(t);
};


const onModalClose = () => {
  todo.value = null;
};

const onToggleCreateModal = () => {
    console.log("Result:", isCreateModalOpen.value);
    isCreateModalOpen.value = !isCreateModalOpen.value;
  
};


watch(todos, () => {
    todos.value = todos.value
    console.log(todos.value)
}, { deep: true })

onMounted(getTodos);
</script>

<template>
    <div class="container">
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
                        <button  class="btn btn-success btn-sm" @click="onToggleCreateModal"><i
                                class="fa fa-plus-circle me-1"></i>Create</button>
                    </p>
                </div>
            </div>

        </div>
      

        <div>
            <div class="container mt-3" v-if="isLoading">
                <div class="row" v-if="todos">
                    <div class="col-md-6" v-for="todo in todos" :key="todo._id">
                        <div class="card my-2 list-group-item-success shadow-lg">
                            <div class="card-body">
                                <ul class="list-group">
                                    <li class="list-group-item">Id: <span class="fw-bold" :title="message">
                                            <router-link :to="{ name: 'ViewTodo', params: { _id: todo._id } }"
                                                class="text-success fs-5 my-1">{{ todo._id }}<i class="fa fa-eye"></i>
                                            </router-link></span>
                                    </li>
                                    <li class="list-group-item">Title: <span class="fw-bold">{{ todo.title}}</span></li>
                                    <li class="list-group-item">Content: <span class="fw-bold">{{ todo.content}}</span></li>
                                    <li class="list-group-item">Done: <span class="fw-bold">{{ todo.done}}</span></li>
                                    <li class="list-group-item">Time Limit: <span class="fw-bold">{{ todo.timeLimit }}</span></li>
                                    <!-- <li class="list-group-item">Time Limit: <span class="fw-bold">{{ todo.timeLimit.split('T')[0].split('-').reverse().join('/') }}</span></li> -->
                                    
                                </ul>
        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            <div class="container mt-3" v-if="!isLoading">Chargement des todos en cours...  </div>
        
        </div>
    </div>

    <Modal :isOpen="isCreateModalOpen" :toggleModal="onToggleCreateModal">
        <NewTodo />
    </Modal>
  

    
</template>
