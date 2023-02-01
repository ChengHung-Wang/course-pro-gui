import { createApp, markRaw } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";
import "bootstrap";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount("#app");

// register element-plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
