import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";
import * as bootstrap from "bootstrap";

createApp(App).use(router).mount("#app");
