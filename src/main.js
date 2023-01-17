import { createApp } from 'vue'
import App from './App.vue'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far, fab)
dom.watch();



import router from './router'




// import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle";


import './assets/main.css';



const app = createApp(App)

 .component('font-awesome-icon', FontAwesomeIcon)
 
app.use(router)

app.mount('#app')
