import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from '../plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


// Import specific icons
import {
  faPencilSquare,
  faBars,
  faPlusCircle,
  faTimesCircle,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faPencilSquare, faBars, faTimesCircle, faPlusCircle, faBan);



const app = createApp(App);
app.use(vuetify);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
