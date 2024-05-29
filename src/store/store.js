import { reactive } from "vue";

export const store = reactive({
  items: [],
  currentRestaurantId: null,

  totalCartPrice: 0,
  cartAmount: 34.34,
});
