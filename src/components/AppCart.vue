<script>
import axios from "axios";
import { store } from "../store/store.js";

export default {
  name: "AppCart",

  data() {
    return {
      restaurants: null,
      restaurantsId: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",

      store,

      //variable for cart
      // newItem: "",
      // items: [],
      currentRestaurantId: null,
    };
  },

  computed: {
    totalItems() {
      return this.store.items.length;
    },
    totalCartPrice() {
      return this.store.items
        .reduce((total, item) => total + parseFloat(item.price), 0)
        .toFixed(2);
    },
  },

  mounted() {
    // Load items from localStorage on component mount
    this.store.items = JSON.parse(localStorage.getItem("items")) || [];
  },

  methods: {
    addItem(dish) {
      // if (
      //   this.items.length === 0 ||
      //   this.currentRestaurantId === this.restaurantsId
      // ) {
      this.store.items.push(dish);
      dish = "";
      localStorage.setItem("items", JSON.stringify(this.store.items));
      localStorage.setItem(
        "currentRestaurantId",
        JSON.stringify(this.currentRestaurantId)
      );
      // } else {
      //   alert(
      //     "You are adding dishes from a different restaurant. Empty the cart or complete the current order."
      //   );
      // }
    },

    removeItem(index) {
      this.store.items.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(this.store.items));
    },
  },
};
</script>

<template>
  <div class="shopping_cart_main_content p-3">
    <h1>SHOPPING CART</h1>
    <hr />

    <!-- base cart -->
    <div>
      <form></form>
      <ul>
        <li v-for="(item, index) in store.items" :key="index">
          {{ item.name }} - {{ item.price }}
          <button class="delete_cart_item_btn" @click="removeItem(index)">
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </li>
      </ul>
      <p>Total Items: {{ totalItems }}</p>
    </div>
    <hr />
    <h4 class="d-flex justify-content-between">
      <span> TOTAL: </span>
      <span>
        <!-- variabile totale prezzo items scelti  -->
        {{ totalCartPrice }} €
      </span>
    </h4>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;
.shopping_cart_main_content {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  max-height: 15rem;

  .shopping_cart_items {
    max-height: 4rem;
  }

  h1 {
    text-align: center;
  }

  ul {
    text-align: start;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      .delete_cart_item_btn {
        background-color: transparent;
        border: none;
        padding: 0.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
  }

  hr {
    border: 0.5px solid $text_color;
  }
}
</style>
