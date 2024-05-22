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
      <div class="restaurant_main_content d-flex row mt-5 rounded-5">
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

        <div class="col-4">
          <div>
            <h2 class="roboto-bold fw-bolder">{{ restaurants.name }}</h2>
            <h2 class="card-title"></h2>
          </div>
        </div>
      </div>
       <!-- --------------------------- -->
      <!--END RESTAURANT DETAILS-->

      
      
      <div class="d-flex p-0 mt-5">

          <div class="dishes_main_content flex-grow-1">
            <!-- --------------------------- -->
            <!-- RESTAURANT DISHES-->
            <ul class="m-0 p-0">
               <li class="d-flex row mb-4">
                <div class="col-4 m-0 p-0">
                  <img class="dish_image" src="/img/dishes_images/Boolivery_hamburger_1.jpg" alt="" />
            
                </div>

                <div class="col-4 py-3">
                  <h4 class="text-capitalize">scrotoletta impanata</h4>
                  <p>scroto di alta qualità, impanato e fritto.</p>
                  <h4>9.00€</h4>
                  
                  
                </div>
                <div class="col-4 py-3">
                  <button class="dish_btn">
                      ADD TO CART  
                      <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                  <ul class="d-flex p-2">
                      <li class="ingredient"> 
                          red meat
                      </li>
                      <li class="ingredient">
                          breaded
                      </li>
                  </ul>
                

                </div>
              </li>
             
            </ul>
          </div>
      
          <!-- --------------------------- -->
          <!--END RESTAURANT DISHES-->







        <!-- --------------------------- -->
        <!-- DISHES CART -->
        <section class="col-4 shopping_cart_main_content">
          <h1>SHOPPING CART</h1>
 
          <ul>
            <li>TRIPPA</li>
            <li>CACIUCCO</li>
          </ul>
  
          <h3>TOTAL: 21.00€</h3>
        </section>
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
    width: 20rem;
    height: 15rem;
    border-radius: 24px;
    border-color: transparent;
    color: $text_color;
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


.shopping_cart_main_content
{
    background-color: $background_color_dark;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    max-height: 15rem;
   

    h1 {
        text-align: center;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    hr {
        border: 0.5px solid $text_color;
    }
}

</style>
