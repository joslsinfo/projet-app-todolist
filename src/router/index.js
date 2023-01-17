import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AuthService from '../services/auth-service'
import EditTodo from '../components/EditTodo.vue'
import ViewTodo from '../components/ViewTodo.vue'
import NewTodo from '../components/NewTodo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      children: [
            {
              path: 'login',
              name: 'login',
              component: LoginView
            },
            {
              path: 'register',
              name: 'register',
              component: RegisterView
            }
    
      ]

    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    
    {
      path: '/todos/edit/:_id',
      name: 'EditTodo',
      component: EditTodo
    },
    {
      path: '/todos/view/:_id',
      name: 'ViewTodo',
      component: ViewTodo
    },
    
  ]
})

const authService = new AuthService()

router.beforeEach(async (to) => {
  const routes = [
    { name: 'login' },
    { name: 'register' },
  ]

  if (routes.every(route => route.name !== to.name)) {
    if (!(await authService.authenticate())) {
      return { name: 'login' };
    }
  }
});

export default router
