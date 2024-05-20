<script>
import AppFooter from "./components/AppFooter.vue";
import AppMainContent from "./components/AppMainContent.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppMainContent,
    AppFooter,
    AppHeader,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppMainContent></AppMainContent>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style></style>
