/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import App from './App.vue'
import router from '@/router/router.js';

import { createApp } from 'vue'

const app = createApp(App)
createApp(App)
  .use(router)
  .mount('#app');

registerPlugins(app)

