<script>
import axios from "axios";
import AppCardItem from "./AppCardItem.vue";

// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

export default {
  name: "AppMainContent",

  components: {
    AppCardItem,
  },

  data() {
    return {
      baseApiUrl: "http://127.0.0.1:8000/api/",
      restaurants: [],
      types: [],
      checkButtonValue: [],
      apiLinks: [],
      // keeps track of current page
      apiPageNumber: 1,

      per_page: 1,
      last_page: 1,
      total_items: 1,

      // loader state
      isLoading: false,
    };
  },
  methods: {
    apiFilterTypes() {
      this.apiPageNumber = 1;
      // Chiama apiCall con i parametri aggiornati
      this.apiCall();
    },

    changePage(pageNumber) {
      // previous page
      if (pageNumber === "Prev" && this.apiPageNumber > 1) {
        this.apiPageNumber--;
      }
      // next page
      if (
        pageNumber === "Next" &&
        this.apiPageNumber < this.restaurants.last_page
      ) {
        this.apiPageNumber++;
      }
      // specific page
      if (!isNaN(pageNumber)) {
        this.apiPageNumber = parseInt(pageNumber); // Converti in numero intero
      }
      this.apiCall();
    },

    apiCall() {
      this.isLoading = true; // Set loader to true before making the API call

      const params = {
        // sets current page as parameter, by default it's 1
        page: this.apiPageNumber,
      };
      if (this.checkButtonValue.length > 0) {
        params.types = this.checkButtonValue.join(",");
      }
      axios
        .get(this.baseApiUrl + "restaurants", { params })
        .then((res) => {
          console.log(res);
          this.restaurants = res.data.results;
          this.apiLinks = res.data.results.links;
          this.per_page = res.data.results.per_page;
          this.last_page = res.data.results.last_page;
          this.total_items = res.data.results.total;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false; // Set loader to false after the API call is completed
        });

      axios
        .get(this.baseApiUrl + "types")
        .then((res) => {
          this.types = res.data.results;
          console.log(this.baseApiUrl + "types");
          console.log(res.data.results);
          console.log(this.types);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.apiCall();

    //load carousel after DOM is loaded
    this.$nextTick(() => {
      new Swiper(".swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          420: {
            slidesPerView: 3,
            spaceBetween: 17,
          },

          320: {
            slidesPerView: 3,
            spaceBetween: 17,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
  },
};
</script>

<template>
  <div class="bg_container nunito-main-content rounded-5 mb-5">
    <div class="container_big container d-flex flex-column">
      <nav class="mb-3">
        <h3 class="p-0 m-0 mb-3 mt-4"><span>Categories</span></h3>

        <!-- Da implementare una volta realizzati i counter -->
        <div class="swiper px-3">
          <div class="swiper-wrapper">
            <div class="swiper-slide food_types justify-content-center" v-for="type in types">
              <input class="form-check-input d-none" type="checkbox" role="switch" :value="type.type" :id="type.type"
                :name="type.type" v-model="checkButtonValue" @change="apiFilterTypes()" />
              <label class="form-check-label custom-checkbox-label" :for="type.type">{{ type.type }}</label>
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </nav>
      <hr>

      <!-- CATEGORIE SELEZIONATE -->
      <div v-if="checkButtonValue.length != 0" class="food_selected">
        <h4>Selected Categories:</h4>
        <div class="in_food_selected">
          <p class="type_res_button" v-for="category in checkButtonValue">
            {{ category }}
          </p>
        </div>
      </div>
      <!-- FINE -->

      <div class="cards_section row flex-wrap justify-content-between p-3 mb-1">
        <div v-if="isLoading" class="loader"></div>

        <template v-else-if="
          restaurants && restaurants.data && restaurants.data.length > 0
        ">
          <AppCardItem v-for="restaurant in restaurants.data" :key="restaurant.id" :restaurant="restaurant">
          </AppCardItem>
        </template>
        <div v-else>
          <h3>No restaurants found</h3>
        </div>
      </div>

      <div class="d-flex justify-content-center mb-5">
        <div v-if="restaurants && restaurants.data && restaurants.data.length > 0">
          <vue-awesome-paginate :total-items="total_items" v-model="apiPageNumber" :items-per-page="per_page"
            :max-pages-shown="last_page" :on-click="changePage" :hide-prev-next-when-ends="true"
            paginate-buttons-class="paginate-buttons" active-page-class="active-page" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.nunito-main-content {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.bg_container {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.container_big {
  display: flex;
  height: 100%;

  .cards_section {
    display: flex !important;
    align-items: center;
    height: 100%;
    min-height: 260px;
    gap: 0.5rem;

    @media screen and (max-width: 992px) {
      min-height: 500px;
    }

    @media screen and (max-width: 428px) {
      min-height: 900px;
    }
  }



  nav {
    width: 100%;

    h3 {
      font-size: 1.7rem;
      font-weight: 800;
      color: $text_color;
      cursor: default;
    }

    .food_types {
      font-weight: 900;
      font-size: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .custom-checkbox-label {
        font-weight: 800;
      }
    }

    .type_res_button {
      @include restaurant_button_style;

      &:hover {
        background-color: $secondary_color;
        color: $text_color;
      }
    }
  }

  .pagination-container {
    display: flex;
    column-gap: 1rem;
    margin-top: 1rem;
  }

  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid $deactivated_text;
    color: black;

    font-weight: 600;
  }

  .paginate-buttons:hover {
    background-color: $secondary_color;
    color: $text_color;

    border: 1px solid $secondary_color;
  }

  .active-page {
    background-color: $secondary_color;
    border: 1px solid $secondary_color;
    color: $text_color;
  }

  .active-page:hover {
    background-color: $secondary_color;
  }

  .next-button,
  .back-button {
    background-color: $primary_color;
    border: 1px solid $primary_color;
    color: $text_color_highlight;
    font-weight: 600;
  }

  /* ----- Modal Classes ----- */
  .swiper-button-next {
    width: 25px;
    color: $primary_color;
    right: -7px;

    &:hover {
      color: $secondary_color;
    }
  }

  .swiper-button-prev {
    font-size: small;
    color: $primary_color;
    left: -7px;

    &:hover {
      color: $secondary_color;
    }
  }

  .swiper-button-prev::after {
    font-size: 1.3rem;
  }

  .swiper-button-next::after {
    font-size: 1.3rem;
  }

  .custom-checkbox input[type="checkbox"] {
    display: none;
  }

  .custom-checkbox-label {
    @include restaurant_button_style;
    text-wrap: nowrap;
    text-align: center;
    border: 1px solid $deactivated_text;
  }

  .custom-checkbox input[type="checkbox"]:checked+.custom-checkbox-label {
    background-color: $secondary_color;
    color: $text_color;
  }

  .custom-checkbox-label:hover {
    background-color: $secondary_color;
    border: 1px solid $secondary_color;
    color: $text_color;
  }
}

.food_selected {
  margin-top: 1rem;

  .in_food_selected {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 5%;

    p {
      background-color: $secondary_color;
      color: $text_color;
      font-weight: 500;

      padding: 0.1rem 0.6rem;
      border-radius: 16px;

      cursor: default;
    }
  }
}

.loader {
  @include loader;
}

@keyframes l9 {
  to {
    transform: rotate(1turn);
  }
}

/* ----- RESPONSIVE ----- */

@media screen and (max-width: 1200px) {
  section nav .food_types {
    background-color: $background_color;
    border-radius: 20px;
    gap: 0;
  }

  section nav .type_res_button:not(:first-child):not(:last-child) {
    border-radius: 0px;
  }

  section nav .type_res_button:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  section nav .type_res_button:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}

@media screen and (max-width: 992px) {
  section nav h3 {
    display: none;
  }

  section nav .food_types {
    background-color: $background_color_dark;
    border-radius: 20px;

    justify-content: space-around;
    width: 100%;
  }

  section nav .type_res_button:not(:first-child):not(:last-child) {
    border-radius: 20px;
  }

  section nav .type_res_button:first-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  section nav .type_res_button:last-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  section nav .type_res_button {
    width: 10rem;
  }
}

@media screen and (max-width: 768px) {
  section nav .type_res_button {
    width: 6rem;
  }
}
</style>
