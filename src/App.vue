<script>
import AppFooter from "./components/AppFooter.vue";
import AppMainContent from "./components/AppMainContent.vue";
import AppHeader from "./components/AppHeader.vue";
import AppNav from "./components/AppNav.vue";

export default {
  components: {
    AppMainContent,
    AppFooter,
    AppHeader,
    AppNav,

  },
  data() {
    return {};
  },
};
</script>

<template>
  <AppNav></AppNav>
  <!-- <AppHeader></AppHeader>
  <AppMainContent></AppMainContent> -->
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style>
  body {
    background-color: #fefefe;
  }
</style>
