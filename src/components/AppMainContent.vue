<script>
import axios from "axios";
import AppCardItem from "./AppCardItem.vue";

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

    apiCall() {
      axios
        .get(this.baseApiUrl + "restaurants")
        .then((res) => {
          console.log(res);
          this.restaurants = res.data.results;
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

    // axios
    //   .get(this.baseApiUrl + "restaurants")
    //   .then((res) => {
    //     console.log(res);
    //     this.restaurants = res.data.results;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axios
    //   .get(this.baseApiUrl + "types")
    //   .then((res) => {
    //     this.types = res.data.results;
    //     console.log(this.baseApiUrl + "types");
    //     console.log(res.data.results);
    //     console.log(this.types);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
};
</script>

<template>
  <section>
    <nav>
      <h3>Our <span>Things</span></h3>

      <!-- Da implementare una volta realizzati i counter -->
      <div id="food_types">
        <button class="type_res_button">Italian</button>
        <button class="type_res_button">Pizzeria</button>
        <button class="type_res_button">Fusion</button>
        <button class="type_res_button">Chinese</button>
      </div>

      <button
        type="button"
        class="btn more"
        data-bs-toggle="modal"
        data-bs-target="#restaurantModal"
      >
        Cerchi altro?
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
            <div class="modal-header">
              <h1
                class="modal-title fs-5 text-center"
                id="restaurantModalLabel"
              >
                Ti mostreremo i migliori ristoranti di?
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
        v-for="restaurant in restaurants.data"
        :restaurant="restaurant"
      ></AppCardItem>

      <!-- card -->
    </section>
    <div>
      <vue-awesome-paginate
        :total-items="50"
        v-model="currentPage"
        :items-per-page="5"
        :max-pages-shown="5"
        :on-click="onClickHandler"
        :hide-prev-next-when-ends="true"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

section {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background-color: $background_color_dark;
  padding: 30px 0;

  border-radius: 50px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 70vw;
    width: 100%;

    h3 {
      font-size: 2.1rem;
      color: $text_color;

      cursor: default;

      #food_types {
        display: flex;
        gap: 3rem;
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
      gap: 3rem;
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
    justify-content: space-evenly;
    align-items: center;

    max-width: 70vw;
    width: 100%;
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
</style>
