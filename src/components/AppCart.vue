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
  <div class="shopping_cart_main_content p-0 m-0">
    <div class="cart_box p-xl-3 p-0">
      <div class="cart_title cart_body">
        <h1 class="text text-capitalize mx-5 px-3 mb-0">
          {{ store.items.length == 0 ? "Cart is empty" : "your order" }}
        </h1>
      </div>
      <!-- <hr /> -->

      <!-- base cart -->
      <div>
        <ul class="cart_body">
          <li class="cart_item justify-content-between d-flex pb-3" v-for="(item, index) in store.items" :key="index">
            <div class="d-flex">
              <div class="d-flex flex-column align-items-start">
                <span :v-model="item.quantity" class="quantity_input text-start fw-bolder">
                  {{ item.quantity }}x
                </span>

                <span class="change_quantity circular_badge">
                  <i class="fa-solid fa-minus" @click="decreaseItem(item)"></i>
                </span>
              </div>

              <div class="d-flex justify-content-start">
                <div class="item_name">
                  {{ item.name }}
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end flex-column align-items-end">
              <div class="text-end">{{ item.total_dish_price }} €</div>

              <span class="change_quantity circular_badge">
                <i class="fa-solid fa-plus" @click="increaseItem(item)"></i>
              </span>
            </div>
          </li>
        </ul>
        <!-- <p>Total Items: {{ totalItems }}</p> -->
      </div>
      <!-- <hr /> -->

      <div class="curtain_checkout_btn" v-if="store.items.length != 0">
        <router-link :to="{ name: 'checkout' }">
          <button class="checkout_btn">
            Order {{ totalItems }} at {{ store.totalCartPrice }} €
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.shopping_cart_main_content {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  min-width: fit-content;
  // min-width: 300px;
  height: fit-content;

  @media (max-width: 1200px) {
    width: 100%;
  }

  .cart_item {
    // background-color: $background_color_dark;
    -webkit-animation: bounce-in-top 1.1s both;
    animation: bounce-in-top 1.1s both;

    @-webkit-keyframes bounce-in-top {
      0% {
        -webkit-transform: translateY(-500px);
        transform: translateY(-500px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
      }

      38% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
      }

      55% {
        -webkit-transform: translateY(-65px);
        transform: translateY(-65px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      72% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      81% {
        -webkit-transform: translateY(-28px);
        transform: translateY(-28px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      90% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      95% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }
    }

    @keyframes bounce-in-top {
      0% {
        -webkit-transform: translateY(-500px);
        transform: translateY(-500px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
      }

      38% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
        opacity: 1;
      }

      55% {
        -webkit-transform: translateY(-65px);
        transform: translateY(-65px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      72% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      81% {
        -webkit-transform: translateY(-28px);
        transform: translateY(-28px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      90% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }

      95% {
        -webkit-transform: translateY(-8px);
        transform: translateY(-8px);
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
      }

      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        -webkit-animation-timing-function: ease-out;
        animation-timing-function: ease-out;
      }
    }
  }

  .shopping_cart_items {
    max-height: 4rem;
  }

  .cart_title {
    min-width: fit-content;

    h1 {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  ul {
    text-align: start;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {

      .circular_badge {
        width: 23px;
        height: 23px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 1px;
        border-radius: 50%;
        background-color: $background_color;
        border: 1px solid $deactivated_text;

        i {
          font-size: 0.7rem;
          margin: 0 !important;
          color: $primary_color;
        }

        &:hover {
          background-color: $secondary_color;
          border: 1px solid $secondary_color;
          color: $text_color;
        }

      }

      .item_name {
        font-size: 0.9rem;
        font-weight: 500;
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

  // hr {
  //   border: 0.5px solid $text_color;
  // }

  @include shopping_cart_behavior;
}
</style>
