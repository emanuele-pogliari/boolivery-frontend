<script>
import axios from "axios";
import AppFooter from "./components/AppFooter.vue";
import AppMainContent from './components/AppMainContent.vue';

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
  <div class="bg-primary">Funziona</div>
  <AppMainContent></AppMainContent>
  <AppFooter></AppFooter>
</template>

<style></style>
