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
};
</script>
<template>
  <AppHeader></AppHeader>
  <AppMainContent></AppMainContent>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;
</style>
