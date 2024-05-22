import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import RestaurantDetails from "./pages/RestaurantDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },

    {
      path: "/restaurant",
      name: "restaurant",
      component: RestaurantDetails,
    },
  ],
});

export { router };
