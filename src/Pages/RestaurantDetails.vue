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

      currentRestaurantId: null,
    };
  },

  computed: {
    totalItems() {
      return this.items.length;
    },
    totalCartPrice() {
      return this.store.items
        .reduce((total, item) => total + item.price, 0)
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
    addItem(item) {
      if (
        this.store.items.length > 0 &&
        this.store.items[0].restaurantsId !== item.restaurant_id
      ) {
        alert(
          "Cart contains dishes from another restaurant, please, remove all dishes from cart before continue."
        );
        return;
      }

      const newItem = {
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: 1,
        total_dish_price: Number(item.price),
        restaurantsId: item.restaurant_id,
      };

      const alreadyOnCart = this.store.items.find(
        (item) => item.id === newItem.id
      );
      if (alreadyOnCart) {
        alreadyOnCart.total_dish_price += alreadyOnCart.price;
        alreadyOnCart.quantity++;
      } else {
        console.log(newItem);
        this.store.items.push(newItem);
      }

      localStorage.setItem("items", JSON.stringify(this.store.items));
      this.updateTotalCartPrice(newItem);
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
      const totalItems = this.store.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      this.store.totalItems = totalItems;
      localStorage.setItem("totalItems", this.store.totalItems);
    },
  },
};
</script>

<template>
  <div v-if="restaurants" class="container" style="max-width: 1200px">
    <router-link to="/">
      <button class="btn">
        <i class="fa-solid fa-arrow-left me-1"></i>Back
      </button>
    </router-link>
    <img v-if="restaurants.image" :src="restaurants.image.startsWith('http')
      ? restaurants.image
      : 'http://localhost:8000/storage/' + restaurants.image
      " class="store-img restaurant_image" alt="..." />
    <img v-else class="store-img" src="/img/homepage/placeholdertemp.jpg" alt="..." />

    <div class="d-flex gap-3 position-relative">

      <div class="restaurant_main_content d-flex row rounded-4 p-0 m-0">

        <div class="col-6 pt-4 py-3 px-3">
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
            <ul class="d-flex p-0">
              <!-- variabile restaurant type -->
              <li v-for="type in restaurants.types" style="list-style: none">
                <button class="type_tag_btn">{{ type.type }}</button>
              </li>
            </ul>
            <!-- variabile inidirizzo -->
            <h4 class="roboto-bold">{{ restaurants.address }}</h4>
            <div class="d-flex flex-column">
              <!-- variabile numero di telefono -->
              <span><i class="fa-solid fa-phone me-2"></i>{{ restaurants.phone }}</span>
              <!-- variabile VAT -->
              <span>VAT: {{ restaurants.vat }}</span>
            </div>
          </div>
        </div>
        <!-- --------------------------- -->
        <!--END RESTAURANT DETAILS-->

        <div class="d-flex p-0 my-2">
          <div class="dishes_main_content d-flex gap-2 flex-wrap p-0 m-0">
            <!-- --------------------------- -->
            <!-- RESTAURANT DISHES-->
            <ul class="m-0 p-3 d-flex" v-for="dish in restaurants.dishes">
              <li class="d-flex p-3 mx-0 flex-column border rounded-4">
                <div class=" m-0 p-0 m-0 d-flex">
                  <img v-if="dish.image" :src="dish.image.startsWith('http')
                    ? dish.image
                    : 'http://localhost:8000/storage/' + dish.image
                    " class="dish_image" alt="..." />
                  <img v-else class="dish_image" src="/img/homepage/placeholdertemp.jpg" alt="..." />

                  <div class="px-3">
                    <!-- variabile nome piatto -->
                    <h4 class="text-capitalize">{{ dish.name }}</h4>
                    <!-- variabile descrizione piatto -->
                    <p>{{ dish.description }}</p>
                    <!-- variabile prezzo piatto -->

                  </div>

                </div>
                <div class="d-flex justify-content-between align-content-center pt-2">
                  <div class="d-flex align-items-center">
                    <h4 class="m-0 p-0">{{ dish.price }} €</h4>
                  </div>
                  <button class="dish_btn" @click="addItem(dish)">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>

              </li>
            </ul>
          </div>

        </div>
        <!-- --------------------------- -->
        <!--END RESTAURANT DISHES-->




      </div>
      <!-- --------------------------- -->
      <!-- DISHES CART -->
      <div>
        <AppCart class="cart position-fixed"></AppCart>
      </div>
      <!-- --------------------------- -->
      <!-- END DISHES CART -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.store-img {
  width: 100%;
  height: 170px;
  object-fit: cover;
  filter: blur(5px);
  border-top-right-radius: 100px;

  border: 10px solid #ffffff;
}


.restaurant_main_content {
  width: 75%;
  background-color: $background_color_dark;
  border-top-right-radius: 100px !important;
  translate: 0rem -5rem;

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
    padding: 0.2rem;
    border-radius: 0.3rem;
    padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    max-width: fit-content;

    p {
      font-size: 0.8rem;
    }

  }

  .type_tag_btn {
    @include tag_type_btn;
  }
}

.dishes_main_content {
  background-color: $background_color_dark;


  list-style: none;
  padding: 0;
  margin: 0;

  ul {
    max-width: 425px;

    li {
      background-color: #ffffff;

      &:hover {

        transform: scale(1.02);
        transition: transform 0.3s ease-in-out;
      }
    }
  }

  h4 {

    font-size: 1rem;
    font-weight: 500;
    color: $text_color;
  }

  p {
    font-size: 0.8rem;
    color: $text_color;
  }

  .dish_image {
    object-fit: cover;
    width: 135px;
    height: 135px;
    border-radius: 1rem;
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

.cart {
  translate: 0rem -5rem;
  flex-grow: 1;
}
</style>
