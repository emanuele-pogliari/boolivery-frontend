<script>
import axios from "axios";
import AppCart from "../components/AppCart.vue";
import { store } from "../store/store.js";
import {
  increaseItem,
  decreaseItem,
  updateTotalCartPrice,
} from "../cartFunctions.js"; // Importa le funzioni

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
      showModal: false,
      loading: false,
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
    this.store.items = JSON.parse(localStorage.getItem("items")) || [];
  },

  created() {
    this.restaurantsId = this.$route.params.id;
    this.store.currentRestaurantId = this.restaurantsId;
    this.fetchRestaurantDetails(this.restaurantsId);
    localStorage.setItem("currentRestaurantId", this.restaurantsId);
  },

  watch: {
    "$route.params.id": function (newId) {
      this.restaurantsId = newId;
      this.store.currentRestaurantId = newId;
      this.fetchRestaurantDetails(newId);
    },
  },

  methods: {
    fetchRestaurantDetails(restaurantId) {
      this.loading = true;
      axios.get(this.baseApiUrl + "restaurants/" + restaurantId).then((res) => {
        this.restaurants = res.data.results;
        localStorage.setItem("restaurant_name", this.restaurants.name);
        this.loading = false;
      });
    },
    addItem(item) {
      if (
        this.store.items.length > 0 &&
        this.store.items[0].restaurantsId !== item.restaurant_id
      ) {
        this.showModal = true;
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
        (cartItem) => cartItem.id === newItem.id
      );
      if (alreadyOnCart) {
        increaseItem(alreadyOnCart, this.store);
      } else {
        this.store.items.push(newItem);
        updateTotalCartPrice(this.store);
      }

      localStorage.setItem("items", JSON.stringify(this.store.items));
    },

    decreaseItem(item) {
      const cartItem = this.store.items.find(
        (cartItem) => cartItem.id === item.id
      );
      if (cartItem) {
        decreaseItem(cartItem, this.store);
      }
    },

    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },

    updateTotalCartPrice() {
      updateTotalCartPrice(this.store);
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
  <div
    v-if="restaurants"
    class="container nunito-restaurant-details p-0"
    style="max-width: 1200px"
  >
    <router-link to="/">
      <button class="btn_back_to_home ms-1">
        <i class="fa-solid fa-arrow-left me-1"></i>Back
      </button>
    </router-link>
    <img
      v-if="restaurants.image"
      :src="
        restaurants.image.startsWith('http')
          ? restaurants.image
          : 'http://localhost:8000/storage/' + restaurants.image
      "
      class="store-img restaurant_image"
      alt="..."
    />
    <img
      v-else
      class="store-img"
      src="/img/homepage/placeholdertemp.jpg"
      alt="..."
    />

    <div class="d-flex gap-3 position-relative">
      <div class="restaurant_main_content d-flex row rounded-4 p-0 m-0">
        <div class="col-8 col-md-12 pt-4 py-3 px-3">
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

          <div class="restaurant_info mb-3 d-md-flex align-items-center">
            <!-- variabile inidirizzo -->
            <ul class="d-flex my-md-0 mb-3 p-0 col-lg-4 me-2 gap-2">
              <!-- variabile restaurant type -->
              <li class="list-unstyled" v-for="type in restaurants.types">
                <button class="type_tag_btn border-0">{{ type.type }}</button>
              </li>
            </ul>

            <div class="col-lg-4 my-md-0 d-flex align-content-center me-2 mb-2">
              <h4 class="bold m-0">{{ restaurants.address }}</h4>
            </div>

            <div class="d-flex col-lg-4">
              <div
                class="d-flex flex-column align-items-center flex-md-row gap-2 gap-md-0"
              >
                <!-- variabile numero di telefono -->
                <span class="d-flex align-items-center gap-1">
                  <div class="circular_badge">
                    <i class="fa-solid fa-phone me-2 fs-6"></i>
                  </div>
                  {{ restaurants.phone }}
                </span>
                <!-- variabile VAT -->
                <span class="d-flex align-items-center gap-1">
                  <div class="circular_badge">
                    <i class="fa-solid fa-id-card me-2 fs-6"></i>
                  </div>
                  -{{ restaurants.vat }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- --------------------------- -->
        <!--END RESTAURANT DETAILS-->

        <div class="d-flex p-0 my-2">
          <div v-if="loading" class="loader">Loading...</div>
          <div class="dishes_main_content d-flex gap-2 flex-wrap p-0 m-0">
            <!-- --------------------------- -->
            <!-- RESTAURANT DISHES-->
            <ul class="m-0 mb-3 px-3 d-flex" v-for="dish in restaurants.dishes">
              <li
                class="d-flex p-3 mx-0 flex-column rounded-4 flex-grow-1 position-relative"
              >
                <div
                  class="item_quantity_badge fw-bolder slide-rotate-hor-top"
                  v-if="store.items.some((cartItem) => cartItem.id === dish.id)"
                  :key="index"
                >
                  {{
                    store.items.find((cartItem) => cartItem.id === dish.id)
                      .quantity
                  }}x
                </div>

                <div class="m-0 p-0 m-0 d-flex">
                  <img
                    v-if="dish.image"
                    :src="
                      dish.image.startsWith('http')
                        ? dish.image
                        : 'http://localhost:8000/storage/' + dish.image
                    "
                    class="dish_image"
                    alt="..."
                  />
                  <img
                    v-else
                    class="dish_image"
                    src="/img/homepage/placeholdertemp.jpg"
                    alt="..."
                  />

                  <div class="px-3">
                    <!-- variabile nome piatto -->
                    <h4 class="dish_name text-capitalize">{{ dish.name }}</h4>
                    <!-- variabile descrizione piatto -->
                    <p class="dish_description">{{ dish.description }}</p>
                    <!-- variabile prezzo piatto -->
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between align-content-center pt-2"
                >
                  <div class="d-flex align-items-center">
                    <!-- !!!!!!!!!!!!! -->
                    <!-- REMOVE BUTTON -->
                    <button
                      class="dish_btn circular_badge me-3"
                      v-if="
                        store.items.some((cartItem) => cartItem.id === dish.id)
                      "
                      @click="decreaseItem(dish)"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <!-- !!!!!!!!!!!!! -->
                    <!-- REMOVE BUTTON -->
                    <h4 class="m-0 p-0">{{ dish.price }} €</h4>
                  </div>
                  <button
                    class="dish_btn circular_badge"
                    @click="addItem(dish)"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--Modal-->
        <div v-if="showModal">
          <div class="modal-backdrop-custom"></div>
          <div class="modal fade show d-block" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title fw-bold">Attention</h5>
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    @click="closeModal"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>
                    The cart contains dishes from another restaurant. Please
                    remove all dishes from the cart before continuing.
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="modal_btn" @click="closeModal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- --------------------------- -->
        <!--END RESTAURANT DISHES-->
      </div>
      <!-- --------------------------- -->
      <!-- CART -->
      <div class="cart_responsive">
        <AppCart class="cart position-fixed"></AppCart>
      </div>
      <!-- --------------------------- -->
      <!-- END CART -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.nunito-restaurant-details {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.btn_back_to_home {
  background-color: $primary_color;
  color: $background_color;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

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

  @media (max-width: 1200px) {
    width: 100%;
  }

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
      font-size: 0.7rem;
      font-weight: 700;
    }
  }

  .restaurant_info {
    .type_tag_btn {
      @include type_single_pill;
    }

    span {
      font-size: 0.7rem;
      font-weight: 700;
      color: $text_color;
      margin-right: 1rem;

      min-width: fit-content;
    }

    @include circular_btn;

    .circular_badge {
      border: none;
    }
  }
}

.dishes_main_content {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: $background_color_dark;

  @media (max-width: 1200px) {
    flex-wrap: nowrap !important;
    width: 100%;
    display: block !important;
  }

  ul {
    max-width: 445px;
    flex-grow: 1;

    @media (max-width: 1200px) {
      max-width: 100%;
    }

    .item_quantity_badge {
      position: absolute;
      top: 0;
      left: 0;
      background-color: $secondary_color;
      color: $text_color;
      border-top-left-radius: 0.9rem;
      border-bottom-right-radius: 0.3rem;

      border-left: none;
      border-top: none;
      padding: 0.5rem;
      font-size: 0.9rem;
    }

    .slide-rotate-hor-top {
      -webkit-animation: slide-rotate-hor-top 0.2s
        cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
      animation: slide-rotate-hor-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        reverse both;
    }

    @-webkit-keyframes slide-rotate-hor-top {
      0% {
        -webkit-transform: translateY(0) rotateX(0deg);
        transform: translateY(0) rotateX(0deg);
      }

      100% {
        -webkit-transform: translateY(-20px) rotateX(-90deg);
        transform: translateY(-20px) rotateX(-90deg);
      }
    }

    @keyframes slide-rotate-hor-top {
      0% {
        -webkit-transform: translateY(0) rotateX(0deg);
        transform: translateY(0) rotateX(0deg);
      }

      100% {
        -webkit-transform: translateY(-20px) rotateX(-90deg);
        transform: translateY(-20px) rotateX(-90deg);
      }
    }
  }

  li {
    background-color: #ffffff;
    border: 1px solid #949494;

    .dish_name {
      font-size: 1rem;
      font-weight: 700;
      color: $text_color;
    }

    .dish_description {
      font-size: 0.8rem;
      font-weight: 600;
      color: $text_color;
    }

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
  width: 115px;
  height: 115px;
  border-radius: 1rem;
  color: $text_color;
}

.circular_badge {
  width: 25px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1px;
  border-radius: 50%;
  background-color: $background_color_dark;
  border: 1px solid #949494;

  i {
    font-size: 0.7rem;
    margin: 0 !important;
    color: #37373b;
  }

  &:hover {
    background-color: $secondary_color;
    border: 1px solid $secondary_color;
    color: $text_color;
  }
}

.cart_responsive {
  .cart {
    translate: 0rem -5rem;
    flex-grow: 1;
  }

  @media (max-width: 1200px) {
    position: fixed;
    bottom: -3%;
  }
}

.modal-body {
  p {
    font-weight: 800;
    color: $text_color;
  }
}

.modal_btn {
  background-color: $primary_color;
  color: $background_color;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: $secondary_color;
    color: $primary_color;
  }
}
</style>
