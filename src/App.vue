<script>
import AppFooter from "./components/AppFooter.vue";
import AppMainContent from "./components/AppMainContent.vue";

export default {
  components: {
    AppMainContent,
    AppFooter,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <AppMainContent></AppMainContent>
  <div class="container">
    <router-view></router-view>
  </div>
  <AppFooter></AppFooter>
</template>

<style></style>
