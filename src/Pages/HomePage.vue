<script>
import axios from "axios";
import AppMainContent from "../components/AppMainContent.vue";
import AppHeader from "../components/AppHeader.vue";


export default {
  name: "HomePage",


  components: {
    AppMainContent,
    AppHeader,
  },

  data() {
    return {
      restaurants: [],
      types: [],
      baseApiUrl: "http://127.0.0.1:8000/api/",
    };
  },

  mounted() {

    // axios
    //   .get(this.baseApiUrl + "restaurants")
    //   .then((res) => {
    //     console.log(res);
    //     this.restaurants = res.data.results;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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
};
</script>
<template>
  <AppHeader></AppHeader>
  <AppMainContent></AppMainContent>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

template {
  @include primary_font;
}
</style>
