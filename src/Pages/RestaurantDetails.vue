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
  <div v-if="restaurants">
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
          </div>
        </div>
      </div>
      <!-- --------------------------- -->
      <!-- END RESTAURANT DETAILS-->
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
