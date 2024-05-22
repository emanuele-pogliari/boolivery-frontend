<script>
import axios from 'axios';

export default {
    name: 'RestaurantDetails',

    data() {
        return {
            restaurants: [],
            restaurants_id: '',
            baseApiUrl: 'http://127.0.0.1:8000/api/',
        }
    },

    mounted() {
        // console.log('RestaurantDetails.vue mounted');
        // console.log(this.$route.params.id);
        // this.restaurantsId = this.$route.params.id;
        // this.restaurantsSlug = this.$route.params.slug;

        console.log('chiamata api:', this.baseApiUrl + 'restaurants/' + this.id)
        axios.get(this.baseApiUrl + 'restaurants/' + this.id).then(res => {

            console.log(res.data.restaurants);

            if (res.data.success) {
                // if the restaurant exists
                this.restaurants = res.data.restaurants;
            } else {

                // torno alla pagina iniziale
                this.$router.push({ name: 'HomePage' })
            }
        });
    },

    methods: {

    },
}

</script>

<template>
    <div class="container">

        <!-- --------------------------- -->
        <!-- RESTAURANT DETAILS-->
        <div class="d-flex row">

            <div class="col-4">
                <img v-if="restaurants.image"
                    :src="restaurants.image.startsWith('http') ? restaurants.image : 'http://localhost:8000/storage/' + restaurants.image"
                    class="card-img-top" alt="...">
                <img v-else class="card-img-top" src="/img/homepage/placeholdertemp.jpg" alt="...">
            </div>



            <div class="col-4">
                <div>
                    <h2 class="card-title">{{ restaurants.name }}</h2>
                </div>
                <div>
                    <ul>
                        <li>
                            Pizzeria
                        </li>
                    </ul>

                </div>
            </div>

            <div class="col-4">
                <ul>
                    <li>Phone number</li>
                    <li>Adress</li>
                    <li>Vat: 11112312312</li>
                </ul>
            </div>

        </div>
        <!-- --------------------------- -->
        <!-- END RESTAURANT DETAILS-->







        <div class="d-flex row">
            <div class="col-8">

                <!-- --------------------------- -->
                <!-- RESTAURANT DISHES-->
                <ul>
                    <li>
                        <div>
                            <h3>
                                LASAGNA SPAZIALE
                            </h3>
                            <span>
                                12.00€
                            </span>
                            <p>
                                stelle cotte, formaggio spaziale, ragù di stelle, polvere di stelle.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h3>
                                PASTA BELLA
                            </h3>
                            <span>
                                15.00€
                            </span>
                            <p>
                                pasta, pomodoro, basilico, mozzarella, olio.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h3>
                                SCROTOLETTA IMPANATA
                            </h3>
                            <span>
                                9.00€
                            </span>
                            <p>
                                scroto di alta qualità, impanato e fritto.
                            </p>
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
                <hr>
                <ul>
                    <li>
                        TRIPPA
                    </li>
                    <li>
                        CACIUCCO
                    </li>
                </ul>
                <hr>
                <h3>TOTAL: 21.00€</h3>

            </div>

            <!-- --------------------------- -->
            <!-- END DISHES CART -->
        </div>




    </div>


</template>

<style lang="sass" scoped>

</style>