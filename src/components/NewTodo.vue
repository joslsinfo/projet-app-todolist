<script setup>




import { ref } from "vue";
import AuthService from "../services/auth-service";
import TodosService from "../services/todos-service";

const authService = new AuthService();
const todosService = new TodosService();


const title = ref("");
const content = ref("");
const done = ref(false);
const user =ref(authService.getUserId());
const doneAt = ref(null);
const timeLimit = ref(null);



const createTodo = async () => {

    const todo = {
    
        title: title.value,
        content: content.value,
        done: done.value,
        user: user.value,
        doneAt: doneAt.value,
        timeLimit: timeLimit.value,
      
    };

    const newTodo = await todosService.createTodo(todo);
    console.log(newTodo);
   

  
}



const onToggleCreateModal = () => {
    console.log(isCreateModalOpen.value);

    isCreateModalOpen.value = !isCreateModalOpen.value;

      
};

// const onModalClose = () => {
//   todo.value = !null;
// };

</script>

<template>
    <div class="container mt-3 w-100">

      <div class="row">
            <div class="row">
                <p class="h3 text-success fw-bold">Add Todo</p>
            </div>
      </div>



      <div class="row">
        <div class="col">
          <form>
            <div class="mb-2">
              <label for="title">Title</label>
              <input type="text" id="title" name="title" v-model="title" placeholder="Title" class="form-control" />
            </div>
            <div class="mb-2">
              <label for="content">Content</label>
              <textarea
                type="text"
                id="content"
                name="content"
                v-model="content"
                placeholder="Content"
                class="form-control" 
                required
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="timeLimit">Time limit</label>
              <input
                type="datetime-local"
                id="doneAt"
                name="timeLimit"
                v-model="timeLimit"
                placeholder="Date limit"
                class="form-control" 
                required
              />
            </div>
      
            <button
              type="button"
              class="btn btn-success mt-4 w-100"
              @click="createTodo">
         
              Create Todo
            </button>
          </form>
        </div>
      </div>

  
    </div>
  </template>
