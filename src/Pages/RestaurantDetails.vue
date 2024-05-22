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
      <div class="d-flex row">
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
            <h4 v-for="dish in restaurants.dishes">{{ dish.name }}</h4>
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
          <ul class="m-0 p-0">
            <li class="d-flex row">
              <div class="col-4">
                <img class="dish_image" src="/img/dishes_images/Boolivery_hamburger_1.jpg" alt="" />
                    
              </div>
              <div class="col-8">
                <h3>SCROTOLETTA IMPANATA</h3>
                <h4>available</h4>
                <span> 9.00€ </span>
                <p>scroto di alta qualità, impanato e fritto.</p>
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
          <hr/>
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


