<script>
import axios from "axios";
import AppCardItem from "./AppCardItem.vue";

// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

const swiper = new Swiper(".swiper");

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
      //keeps track of current page
      apiPageNumber: 1,

      per_page: 1,
      last_page: 1,
      total_items: 1,
    };
  },
  methods: {
    apiFilterTypes() {
      if (this.checkButtonValue.length > 0) {
        axios
          .get(
            this.baseApiUrl + "restaurants?types=" + this.checkButtonValue,
            {}
          )
          .then((res) => {
            // console.log(res.data.results)

            this.restaurants = res.data.results;

            console.log(this.checkButtonValue);
          });
      } else {
        this.apiCall();
      }
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
      axios
        .get(this.baseApiUrl + "restaurants", {
          params: {
            // sets current page as parameter, by default it's 1
            page: this.apiPageNumber,
          },
        })
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
  },
};
</script>

<template>
  <section class="rounded-5">
    <nav>
      <h3>Popular <span>Category</span></h3>

      <!-- Da implementare una volta realizzati i counter -->
      <div id="food_types">
        <button class="type_res_button">Italian</button>
        <button class="type_res_button">Pizzeria</button>
        <button class="type_res_button">Fusion</button>
        <button class="type_res_button">Chinese</button>
      </div>

      <button type="button" class="btn more" data-bs-toggle="modal" data-bs-target="#restaurantModal">
        <span class="more-icon"><i class="fa-solid fa-magnifying-glass"></i></span> 
        <span class="more-txt">Want more?</span>
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="restaurantModal"
        tabindex="-1"
        aria-labelledby="restaurantModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header my_modal_head">
              <h1
                class="modal-title fs-5 text-center"
                id="restaurantModalLabel"
              >
                What are you looking for?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body my_modal_body">
              <div v-for="type in types" class="custom-checkbox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :value="type.type"
                  :id="type.type"
                  :name="type.type"
                  v-model="checkButtonValue"
                  @change="apiFilterTypes()"
                />
                <label
                  class="form-check-label custom-checkbox-label"
                  :for="type.type"
                  >{{ type.type }}</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section id="cards_section">
      <AppCardItem 
        v-for="restaurant in restaurants.data" :restaurant="restaurant">
      </AppCardItem>

    </section>

    <div>
      <vue-awesome-paginate
        :total-items="total_items"
        v-model="apiPageNumber"
        :items-per-page="per_page"
        :max-pages-shown="last_page"
        :on-click="changePage"
        :hide-prev-next-when-ends="true"
        paginate-buttons-class="paginate-buttons"
        active-page-class="active-page"
      />
    </div>
  </section>
</template>

<style lang="scss">
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

section {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background-color: $background_color_dark;
  padding: 30px 0;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1200px;
    width: 100%;

    h3 {
      font-size: 2.1rem;
      color: $text_color;
      padding-left: 0.5rem;

      cursor: default;

      .more {
        display: flex;
        justify-content: center;
        align-items: center;

        color: $background_color;
        background-color: $text_color;

        font-weight: 600;
        word-spacing: 2px;
        letter-spacing: 0.5px;

        border: 2px solid $text_color;
        border-radius: 20px;

        transition: all 0.2s linear;

        &:hover {
          background-color: $secondary_color;
          border-color: $secondary_color;
          color: $text_color;
        }
      }

      .type_res_button {
        padding: 6px 12px;
        width: 8rem;
        border-radius: 20px;
        border: 1px solid $background_color;

        background-color: $background_color;
        color: $text_color;
        font-weight: 600;

        transition: all 0.2s linear;

        &:hover {
          background-color: $secondary_color;
        }
      }

      .my_modal_body {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        width: 50%;
        row-gap: 3rem;
      }

      span {
        font-weight: normal;
      }
    }

    #food_types {
      display: flex;
      gap: 1rem;
    }

    .more {
      display: flex;
      justify-content: center;
      align-items: center;

      color: $background_color;
      background-color: $text_color;

      font-weight: 600;
      word-spacing: 2px;
      letter-spacing: 0.5px;

      border: 2px solid $text_color;
      border-radius: 20px;

      padding: 6px 12px;
      width: 12rem;

      transition: all 0.2s linear;

      &:hover {
        background-color: $secondary_color;
        border-color: $secondary_color;
        color: $text_color;
      }
    }

    .type_res_button {
      @include restaurant_button_style;

      &:hover {
        background-color: $secondary_color;
        color: $text_color;
      }
    }

    .my_modal_body {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      width: 100%;
      row-gap: 0.5rem;
    }
  }

  #cards_section {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    max-width: 1200px;
    width: 100%;
  }

  .more-icon {
    display: none;
  }

  .pagination-container {
    display: flex;
    column-gap: 10px;
    margin-top: 2rem;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: $secondary_color;
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
    color: $text_color_highlight;
  }

  /* ----- Modal Classes ----- */

  .custom-checkbox input[type="checkbox"] {
    display: none;
  }

  .custom-checkbox-label {
    @include restaurant_button_style;

    text-align: center;
  }

  .custom-checkbox input[type="checkbox"]:checked + .custom-checkbox-label {
    background-color: $secondary_color;
    color: $text_color;
  }

  .custom-checkbox-label:hover {
    background-color: $secondary_color;
    color: $text_color;
  }
}

/* ----- RESPONSIVE ----- */

@media screen and (max-width: 1200px) {
  section nav .more {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  section nav #food_types {
    background-color: $background_color;
    border-radius: 20px;
    gap: 0;
  };

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
  };

  section nav #food_types {
    background-color: $background_color_dark;
    border-radius: 20px;

    justify-content: space-around;
    width: 100%;
  };

  section nav .type_res_button:not(:first-child):not(:last-child) {
    border-radius: 20px;
  };

  section nav .type_res_button:first-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  };

  section nav .type_res_button:last-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  };

  section nav .type_res_button {
    width: 10rem;
  };

  section nav .more {
    width: 5rem;
  };

  section nav .more .more-icon {
    display: inline !important;
  };

  section nav .more .more-txt {
    display: none;
  };
}
</style>
