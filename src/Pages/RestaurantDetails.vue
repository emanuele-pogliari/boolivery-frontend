<script>
import axios from 'axios';

export default {
    name: 'RestaurantDetails',

    data() {
        return {

            restaurants: [],
            RestaurantsSlug: '',

            baseApiUrl: 'http://127.0.0.1:8000/api/',
        }
    },

    mounted() {
        // console.log('RestaurantDetails.vue mounted');
        // console.log(this.$route.params.id);
        // this.restaurantsId = this.$route.params.id;
        // this.restaurantsSlug = this.$route.params.slug;

        console.log('chiamata api:', this.baseApiUrl + 'restaraunts' + this.restaurantsSlug)
        axios.get(this.baseApiUrl + 'restaurants' + this.restaurantsSlug).then(res => {

            // console.log(res.data.restaurants);

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
    <div>
        HELLOOO
    </div>

</template>

<style lang="sass" scoped>

</style>