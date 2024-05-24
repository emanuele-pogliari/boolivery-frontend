import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import RestaurantDetails from "./pages/RestaurantDetails.vue";
import Checkout from "./pages/Checkout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },

    {
      path: "/restaurants/:id",
      name: "restaurant",
      component: RestaurantDetails,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
  ],
});

export { router };
