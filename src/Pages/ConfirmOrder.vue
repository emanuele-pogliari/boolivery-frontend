<script>
import { store } from "../store/store.js";
export default {
  data() {
    return {
      store,
      order: JSON.parse(localStorage.getItem("items")) || [],
      orderInfo: {
        total_price: localStorage.getItem("totalCartPrice") || 0,
        customer_name: localStorage.getItem("customer_name") || "",
        customer_last_name: localStorage.getItem("customer_last_name") || "",
        customer_address: localStorage.getItem("customer_address") || "",
        customer_email: localStorage.getItem("customer_email") || "",
        customer_phone: localStorage.getItem("customer_phone") || "",
        customer_note: localStorage.getItem("customer_note") || "",
      },
      restaurant_name:
        localStorage.getItem("restaurant_name") || "the restaurant",
    };
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "home" });
    }, 8000);
    localStorage.removeItem("items");
    this.store.totalCartPrice = 0;
  },
};
</script>

<template>
  <div class="bg_confirmation_order mb-5 nunito-confirm-order">
    <div class="container">
      <div class="d-flex flex-column py-5">
        <div class="customer_content">
          <h1 class="">
            Thank You,
            <span class="text-capitalize fw-bolder"
              >{{ orderInfo.customer_name }} <span></span>
            </span>
            <span class="text-capitalize fw-bolder">{{
              orderInfo.customer_last_name
            }}</span
            >, your order has been confirmed, enjoy!
          </h1>
          <p>Find below the receipt from {{ restaurant_name }}"</p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="invoice container mb-5 d-flex justify-content-evenly flex-column align-items-center align-items-md-start text-center text-md-start flex-md-row gap-5 gap-md-0 align-text-top nunito-confirm-order"
  >
    <div>
      <h2 class="fw-bolder py-0 my-0 fs-2">Your Order</h2>
      <ul>
        <li v-for="item in order" :key="item.id">
          <p>{{ item.name }} (x{{ item.quantity }})</p>
          <p>{{ item.price }} €</p>
        </li>
      </ul>
      <h2 class="fw-bolder fs-2 py-0 my-0">
        Total: {{ orderInfo.total_price }} €
      </h2>
    </div>
    <div>
      <h3 class="fw-bolder fs-4">Delivery Address</h3>
      <p class="fw-bold">{{ orderInfo.customer_address }}</p>
      <h3 class="fw-bold fs-4">Contact Details</h3>
      <p class="fw-bold mb-1">Email: {{ orderInfo.customer_email }}</p>
      <p class="fw-bold">Phone: {{ orderInfo.customer_phone }}</p>
      <h3 class="fw-bold fs-4 mb-1">Note</h3>
      <p class="fw-bold">{{ orderInfo.customer_note }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.nunito-confirm-order {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.bg_confirmation_order {
  background-color: #f2ca39;
  border-bottom-right-radius: 10rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);

  img {
    width: 100px;
    display: block;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .customer_content {
    max-width: 600px;
  }
}

.invoice {
  color: #37373b;
  background-color: #f6f7f8;
  border-radius: 24px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #f6f7f8;
  }

  h2 {
    padding: 1rem 0;
  }
}
</style>
