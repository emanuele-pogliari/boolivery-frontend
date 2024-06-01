import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { router } from "./router.js";
import "bootstrap/dist/css/bootstrap.css";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import "bootstrap/dist/js/bootstrap.js";
import * as bootstrap from "bootstrap";

createApp(App).use(router).use(VueAwesomePaginate).mount("#app");
