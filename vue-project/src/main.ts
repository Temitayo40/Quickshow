import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import router from "./router";
import "./style.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
});

app.use(router).mount("#app");
