<script>
import axios from "axios";

export default {
  name: "RestaurantDetails",

  data() {
    return {
      restaurants: null,
      restaurantsId: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",
    };
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

  methods: {},
};
</script>

<template>
  <div class="container">
    <!-- --------------------------- -->
    <!-- RESTAURANT DETAILS-->
    <div v-if="restaurants" class="d-flex row">
      <div class="col-4">
        <img
          v-if="restaurants.image"
          :src="
            restaurants.image.startsWith('http')
              ? restaurants.image
              : 'http://localhost:8000/storage/' + restaurants.image
          "
          class="card-img-top"
          alt="..."
        />
        <img
          v-else
          class="card-img-top"
          src="/img/homepage/placeholdertemp.jpg"
          alt="..."
        />
      </div>

      <div class="col-4">
        <div>
          <h2 class="card-title">{{ restaurants.name }}</h2>
          <h2 class="card-title"></h2>
        </div>
      </div>
    </div>
    <!-- --------------------------- -->
    <!-- END RESTAURANT DETAILS-->

    <div class="d-flex row">
      <div class="col-8">
        <!-- --------------------------- -->
        <!-- RESTAURANT DISHES-->
        <!-- QUA C'E' L'ERRORE -->
        <ul v-for="dish in restaurants.dishes" class="m-0 p-0">
          <li class="d-flex row">
            <div class="col-4">
              <img
                v-if="dish.image"
                :src="
                  dish.image.startsWith('http')
                    ? dish.image
                    : 'http://localhost:8000/storage/' + dish.image
                "
                class="card-img-top"
                alt="..."
              />
              <img
                v-else
                class="card-img-top"
                src="/img/homepage/placeholdertemp.jpg"
                alt="..."
              />
            </div>
            <div class="col-8">
              <h3>{{ dish.name }}</h3>
              <span> {{ dish.price }} €</span>
              <p>{{ dish.description }}</p>
              <button class="dish_btn">
                ADD TO CART
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <!-- --------------------------- -->
      <!--END RESTAURANT DISHES-->

      <!-- --------------------------- -->
      <!-- DISHES CART -->

      <div class="col-4">
        <h1>SHOPPING CART</h1>
        <hr />
        <ul>
          <li>TRIPPA</li>
          <li>CACIUCCO</li>
        </ul>
        <hr />
        <h3>TOTAL: 21.00€</h3>
      </div>

      <!-- --------------------------- -->
      <!-- END DISHES CART -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.restaurant_image {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  border-color: transparent;
  color: $text_color;
}

.dish_image {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  border-color: transparent;
  color: $text_color;
}

.dish_btn {
  @include footer_button_style_pills;
}
</style>
