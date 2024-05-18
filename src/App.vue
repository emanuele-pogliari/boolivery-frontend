<script>
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppFooter,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
  <AppFooter></AppFooter>
</template>

<style></style>
