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

      currentRestaurantId: null,
    };
  },

  computed: {
    totalItems() {
      return this.store.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalCartPrice() {
      return this.store.items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },

  mounted() {
    // Load items from localStorage on component mount
    this.store.items = JSON.parse(localStorage.getItem("items")) || [];
    this.store.totalCartPrice =
      localStorage.getItem("totalCartPrice") || this.totalCartPrice;
    this.store.totalItems =
      localStorage.getItem("totalItems") || this.totalItems;
  },

  methods: {
    increaseItem(item) {
      item.quantity++;
      item.total_dish_price = item.price * item.quantity;
      this.updateTotalCartPrice();
    },

    decreaseItem(item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.total_dish_price = item.price * item.quantity;
        this.updateTotalCartPrice();
      } else {
        this.removeItem(item);
      }
    },

    removeItem(item) {
      const index = this.store.items.indexOf(item);
      if (index > -1) {
        this.store.items.splice(index, 1);
        this.updateTotalCartPrice();
      }
    },

    updateTotalCartPrice() {
      const totalCartPrice = this.store.items
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);

      this.store.totalCartPrice = totalCartPrice;
      localStorage.setItem("items", JSON.stringify(this.store.items));
      localStorage.setItem("totalCartPrice", totalCartPrice);

      console.log("Prezzo totale del carrello aggiornato:", totalCartPrice);
    },

    updateTotalItems() {
      this.store.totalItems = this.store.items.length;
      localStorage.setItem("totalItems", this.store.totalItems);
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
          {{ item.name }} - {{ item.price }} €
          <div>{{ item.total_dish_price }} €</div>
          <span class="change_quantity">
            <i class="fa-solid fa-minus" @click="decreaseItem(item)"></i>
          </span>
          <span :v-model="item.quantity" class="mx-2 quantity_input">
            {{ item.quantity }}</span
          >
          <span class="change_quantity">
            <i class="fa-solid fa-plus" @click="increaseItem(item)"></i>
          </span>
          <button class="delete_cart_item_btn" @click="removeItem(item)">
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
        {{ store.totalCartPrice }} €
      </span>
    </h4>
    <router-link :to="{ name: 'checkout' }">
      <button class="btn btn-warning">Checkout</button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;
.shopping_cart_main_content {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 24px;

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
    .change_quantity {
      cursor: pointer;
    }
    .quantity_input {
      width: 30px;
      text-align: center;
      background-color: transparent;
      border: none;
    }
  }

  hr {
    border: 0.5px solid $text_color;
  }
}
</style>
