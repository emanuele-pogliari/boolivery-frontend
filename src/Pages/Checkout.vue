<script>
import axios from "axios";
import { store } from "../store/store";
import AppCart from "../components/AppCart.vue";

export default {
  components: {
    AppCart,
  },
  data() {
    return {
      clientToken: null,
      instance: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",
      store,
      isProcessing: false, // Add loader state

      orderInfo: {
        total_price: localStorage.getItem("totalCartPrice") || 0,
        customer_name: "",
        customer_last_name: "",
        customer_address: "",
        customer_email: "",
        customer_phone: "",
        customer_note: "",
      },
      items: JSON.parse(localStorage.getItem("items")) || [],
    };
  },

  mounted() {
    this.getClientToken();
  },

  methods: {
    // Get client token
    getClientToken() {
      axios
        .get(this.baseApiUrl + "token")
        .then((response) => {
          this.clientToken = response.data.token;
          // Initialize drop-in when the API is called
          this.dropinStart();
        })
        .catch((error) => {
          console.error("Error fetching client token:", error);
        });
    },

    dropinStart() {
      braintree.dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          if (err) {
            console.error("Error creating drop-in:", err);
            return;
          }
          this.instance = instance;
        }
      );
    },

    updateTotalCartPrice() {
      const totalCartPrice = this.store.items
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);

      this.store.totalCartPrice = totalCartPrice;
      localStorage.setItem("items", JSON.stringify(this.store.items));
      localStorage.setItem("totalCartPrice", totalCartPrice);

      console.log("Prezzo totale del carrello aggiornato:", totalCartPrice);
    },

    updateTotalItems() {
      this.store.totalItems = this.store.items.length;
      localStorage.setItem("totalItems", this.store.totalItems);
    },

    paymentFunction() {
      if (!this.instance) {
        console.error("Drop-in instance is not available.");
        return;
      }

      this.isProcessing = true; // Set loader to true before processing payment

      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Error requesting payment method:", err);
          this.isProcessing = false; // Set loader to false if there's an error
          return;
        }

        if (!payload || !payload.nonce) {
          console.error("Invalid payload received:", payload);
          this.isProcessing = false; // Set loader to false if there's an error
          return;
        }

        console.log("Payment method selected:", payload);

        const paymentData = {
          ...this.orderInfo,
          paymentMethodNonce: payload.nonce,
          userData: JSON.stringify(
            this.items.map((item) => ({
              dish_id: item.id,
              quantity: item.quantity,
            }))
          ),
        };

        axios
          .post(this.baseApiUrl + "payment", paymentData)
          .then((response) => {
            console.log(response);
            console.log("Payment successful");
            this.isProcessing = false; // Set loader to false after payment is successful
            //svuota il carrello dopo il pagamento
            localStorage.removeItem("items");

            // Clear Vuex store items and total price
            this.store.items = [];
            this.store.totalCartPrice = 0;

            // Update total items after clearing
            this.updateTotalItems();

            // Update total price after clearing
            this.updateTotalCartPrice();

            this.$router.push({ name: "confirm-order" });
          })
          .catch((error) => {
            console.log(error);
            console.log("Payment failed");
            this.isProcessing = false; // Set loader to false if payment fails
          });
      });
    },
  },
};
</script>

<template>
  <div class="container my-4">
    <!-- v-if="store.items.length != 0" -->
    <div class="d-flex row justify-content-center flex-xl-row-reverse">
      <div class="cart_responsive col-12 col-xl-4">
        <AppCart></AppCart>
      </div>
      <div class="col-12 col-xl-6 d-flex">
        <form method="POST" @submit.prevent class="form_data">

          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_name" class="form-label">Name *</label>
            <input v-model="orderInfo.customer_name" type="text" class="form-control" id="orderInfo.customer_name" />
          </div>

          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_last_name" class="form-label">Lastname *</label>
            <input v-model="orderInfo.customer_last_name" type="text" class="form-control"
              id="orderInfo.customer_last_name" />
          </div>

          <div class="mb-3 checkout_field">
            <label for="address" class="form-label">Address *</label>
            <input v-model="orderInfo.customer_address" type="text" class="form-control" id="address" />
          </div>

          <div class="mb-3 checkout_field">
            <label for="phone" class="form-label">Phone *</label>
            <input v-model="orderInfo.customer_phone" type="text" class="form-control" id="phone" />
          </div>

          <div class="mb-3 checkout_field">
            <label for="email" class="form-label">Email *</label>
            <input v-model="orderInfo.customer_email" type="text" class="form-control" id="email" />
          </div>

          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_note" class="form-label">Note</label>
            <textarea v-model="orderInfo.customer_note" class="form-control" id="orderInfo.customer_note"
              rows="3"></textarea>
          </div>

          <div id="dropin-container"></div>
          <div class="loader-container">
            <button id="submit-button" type="submit" @click="paymentFunction">
              Purchase
            </button>
            <div v-if="isProcessing" class="loader"></div>
          </div>

        </form>
      </div>

    </div>
    <!-- <div v-else class="d-flex row justify-content-center">
      <div class="col-12">
        <h2>
          Your cart is empty. Please, back to restaurant page and add something
          before continue.
        </h2>
        <button class="btn btn-warning">
          <router-link class="text-decoration-none text-black" :to="{
            name: 'restaurant',
            params: { id: store.currentRestaurantId },
          }">Back to restaurant</router-link>
        </button>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.form_data {
  background-color: $background_color_dark;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 24px;

  padding: 0 1rem 1rem;
  width: 100%;

  .checkout_field {
    padding-top: 1rem;

    label {
      font-weight: 500;
    }
  }

  #submit-button {
    margin-top: 1rem;
    padding: 0.5rem 0.8rem;

    background-color: $primary_color;
    color: $secondary_color;
    border: none;
    border-radius: 12px;

    transition: all 0.2s linear;
    font-weight: 500;

    &:hover {
      background-color: $secondary_color;
      color: $primary_color;
    }
  }
}

.loader-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.loader {
  @include loader;
}

@keyframes l9 {
  to {
    transform: rotate(1turn);
  }
}

.cart_responsive {
  @include shopping_cart_behavior;


  @media (max-width: 1200px) {
    height: 5rem;

  }

}
</style>
