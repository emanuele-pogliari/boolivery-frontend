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
    increaseItem(item) {
      item.quantity++;
      this.updateTotalCartPrice();
    },

    decreaseItem(item) {
      if (item.quantity > 1) {
        item.quantity--;
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
  },
  // Add item to cart

  // increaseItem(item) {
  //   item.quantity++;
  //   localStorage.setItem("totalCartPrice", this.store.totalCartPrice);
  //   this.updateTotalCartPrice(item);
  // },

  // decreaseItem(item) {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //     // const itemTotalPrice = item.price * item.quantity; // Calcola il prezzo totale dell'articolo
  //     this.store.totalCartPrice -= item.price;
  //     console.log(this.store.totalCartPrice); // Sottrai il prezzo totale calcolato dal prezzo totale del carrello
  //     localStorage.setItem("totalCartPrice", this.store.totalCartPrice); // Aggiorna il prezzo totale nel localStorage
  //     this.updateTotalCartPrice(item); // Aggiorna il prezzo totale visualizzato nell'interfaccia utente
  //   } else {
  //     this.removeItem(item);
  //   }

  //   // if (item.quantity > 1) {
  //   //   item.quantity--;

  //   //   // print store.items
  //   //   console.log(this.store.items.price);
  //   //   this.store.totalCartPrice -= this.store.items.price;
  //   //   localStorage.setItem("totalCartPrice", this.store.totalCartPrice);
  //   //   this.updateTotalCartPrice(item);
  //   // } else {
  //   //   this.removeItem(item);
  //   // }
  // },

  // // Remove item from cart
  // removeItem(item) {
  //   this.store.items.splice(item, 1);
  //   localStorage.setItem("items", JSON.stringify(this.store.items));
  // },

  // // updateTotalCartPrice(item) {
  // //   // Calcola il prezzo totale del carrello sommando i prezzi totali di tutti gli articoli nel carrello
  // //   const totalCartPrice = this.store.items.reduce(
  // //     (total, item) => total + item.total_dish_price,
  // //     0
  // //   );

  // //   // Aggiorna il prezzo totale del carrello nello store Vuex
  // //   this.store.totalCartPrice = totalCartPrice;

  // //   // Aggiorna il prezzo totale del carrello nel localStorage
  // //   localStorage.setItem("totalCartPrice", totalCartPrice);

  // //   // Console log per monitorare i valori
  // //   console.log("Prezzo totale del carrello aggiornato:", totalCartPrice);
  // // },
  // updateTotalCartPrice(item) {
  //   this.store.totalCartPrice += item.price;
  //   console.log(this.store.totalCartPrice); // Update total based on item price and quantity
  //   localStorage.setItem("totalCartPrice", this.store.totalCartPrice);
  // },
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
          <div>{{ item.total_dish_price }}</div>
          <span class="change_quantity">
            <i class="fa-solid fa-minus" @click="decreaseItem(item)"></i>
          </span>
          <span :v-model="item.quantity" class="mx-2 quantity_input">
            {{ item.quantity }}</span
          >
          <span class="change_quantity">
            <i class="fa-solid fa-plus" @click="increaseItem(item)"></i>
          </span>
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
        {{ store.totalCartPrice }} €
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
