<script>
import axios from "axios";
import AppCart from "../components/AppCart.vue";
import { store } from "../store/store.js";

export default {
  name: "RestaurantDetails",

  components: {
    AppCart,
  },

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
      return this.items.length;
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

  created() {
    this.restaurantsId = this.$route.params.id;
    console.log(this.baseApiUrl + "restaurants/" + this.restaurantsId);
    axios
      .get(this.baseApiUrl + "restaurants/" + this.restaurantsId)
      .then((res) => {
        console.log(res.data.results);
        this.restaurants = res.data.results;
      });
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
  },
};
</script>

<template>
  <div class="container" style="max-width: 1200px;">
    <!-- --------------------------- -->
    <!-- RESTAURANT DETAILS-->
    <div class="restaurant_main_content d-flex row mt-5 rounded-4">
      <div class="col-4 p-0 m-0">
        <img
          v-if="restaurants.image"
          :src="
            restaurants.image.startsWith('http')
              ? restaurants.image
              : 'http://localhost:8000/storage/' + restaurants.image
          "
          class="card-img-top restaurant_image"
          alt="..."
        />
        <img
          v-else
          class="card-img-top"
          src="/img/homepage/placeholdertemp.jpg"
          alt="..."
        />
      </div>

      <div class="col-4 py-3 px-5">
        <div>
          <div class="d-flex align-items-center gap-2">
            <h2 class="roboto-bold fw-bolder">{{ restaurants.name }}</h2>
          </div>
          <div class="free_delivery_tag d-flex align-items-center gap-1">
            <i class="fa-solid fa-tag"></i>
            <p class="m-0">Free delivery for any order over 25€</p>
          </div>
        </div>
        <hr />

        <div>
          <!-- variabile inidirizzo -->
          <h4 class="roboto-bold">{{ restaurants.address }}</h4>
          <div class="d-flex flex-column">
            <!-- variabile numero di telefono -->
            <span>da migrare</span>
            <!-- variabile VAT -->
            <span>{{ restaurants.vat }}</span>
          </div>
        </div>
      </div>

      <div class="col-4 py-3 px-5">
        <h4>Category</h4>
        <ul class="d-flex flex-wrap p-0">
          <!-- variabile restaurant type -->
          <li style="list-style: none">
            <button class="type_tag_btn">Category</button>
          </li>
        </ul>
      </div>
    </div>
    <!-- --------------------------- -->
    <!--END RESTAURANT DETAILS-->

    <div class="d-flex p-0 mt-5">
      <div class="dishes_main_content">
        <!-- --------------------------- -->
        <!-- RESTAURANT DISHES-->
        <ul class="m-0 p-0" v-for="dish in restaurants.dishes">
          <li class="d-flex row mb-4">
            <div class="col-4 m-0 p-0">
              <img class="dish_image" :src="dish.image" alt="" />
            </div>

            <div class="col-4 py-3">
              <!-- variabile nome piatto -->
              <h4 class="text-capitalize">{{ dish.name }}</h4>
              <!-- variabile descrizione piatto -->
              <p>{{ dish.description }}</p>
              <!-- variabile prezzo piatto -->
              <h4>{{ dish.price }} €</h4>
            </div>
            <div class="col-3 py-3">
              <button class="dish_btn" @click="addItem(dish)">
                ADD TO CART
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <ul class="d-flex p-2">
                <!-- variabile ingredienti piatto-->
                <!-- <li class="ingredient">red meat</li>
                <li class="ingredient">breaded</li> -->
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <!-- --------------------------- -->
      <!--END RESTAURANT DISHES-->

      <!-- --------------------------- -->
      <!-- DISHES CART -->
      <AppCart></AppCart>
      <!-- --------------------------- -->
      <!-- END DISHES CART -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.restaurant_main_content {
  background-color: $background_color_dark;
  border-top-right-radius: 10rem !important;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  .restaurant_image {
    max-height: 16rem;
    height: 100%;
    padding: 1rem;

    border-radius: 28px;
    border-color: transparent;
    color: $text_color;
  }

  .free_delivery_tag {
    background-color: $secondary_color;
    color: $text_color;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .type_tag_btn {
    @include tag_type_btn;
  }
}

.dishes_main_content {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  list-style: none;
  padding: 0;
  margin: 0;

  .dish_image {
    object-fit: cover;
    width: 100%;
    height: 10rem;
    border-radius: 24px;
    color: $text_color;
  }

  .ingredient {
    border: 1px solid $primary_color;
    border-radius: 0.5rem;
    padding: 0.2rem;
    margin-right: 0.2rem;
    text-decoration: none;
    list-style: none;
  }

  .dish_btn {
    @include shopping_cart_button;
  }
}
</style>
