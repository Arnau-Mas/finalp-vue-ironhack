import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import './assets/tailwind.css'
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");