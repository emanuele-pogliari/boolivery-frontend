<script>
import axios from "axios";
export default {
  name: "HomePage",

  components: {},

  data() {
    return {
      restaurants: [],
      types: [],
      baseApiUrl: "http://127.0.0.1:8000/api/",
    };
  },

  mounted() {
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
        console.log(res);
        this.types = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<template>
  <div>
    <ul>
      <li v-for="type in types">{{ type.type }}</li>
    </ul>
  </div>
</template>

<style></style>
