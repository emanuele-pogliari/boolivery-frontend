<script>
import axios from "axios";
import { store } from "../store/store";
import AppCart from "../components/AppCart.vue";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

export default {
  components: {
    AppCart,
  },

  props: {
    restaurant: Object,
  },

  data() {
    return {
      clientToken: null,
      instance: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",
      store,
      isLoading: false, // Add loader state

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
      restaurant_name:
        localStorage.getItem("restaurant_name") || "the restaurant",
      id: localStorage.getItem("currentRestaurantId"),
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
    },

    updateTotalItems() {
      this.store.totalItems = this.store.items.length;
      localStorage.setItem("totalItems", this.store.totalItems);
    },

    validateForm() {
      if (
        !this.orderInfo.customer_name ||
        !this.orderInfo.customer_last_name ||
        !this.orderInfo.customer_address ||
        !this.orderInfo.customer_phone ||
        !this.orderInfo.customer_email
      ) {
        this.showModal();
        return false;
      }
      return true;
    },

    showModal() {
      const errorModal = new bootstrap.Modal(
        document.getElementById("errorModal")
      );
      errorModal.show();
    },

    closeModal() {
      const errorModalEl = document.getElementById("errorModal");
      const errorModal = bootstrap.Modal.getInstance(errorModalEl);
      if (errorModal) {
        errorModal.hide();
      }
    },

    paymentFunction() {
      if (!this.validateForm()) {
        return;
      }

      if (!this.instance) {
        console.error("Drop-in instance is not available.");
        return;
      }

      this.isLoading = true; // Set loader to true before processing payment

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

        Object.keys(this.orderInfo).forEach((key) => {
          localStorage.setItem(key, this.orderInfo[key]);
        });

        axios
          .post(this.baseApiUrl + "payment", paymentData)
          .then(() => {
            this.isProcessing = false; // Set loader to false after payment is successful
            // Svuota il carrello dopo il pagamento

            // Update total items after clearing
            this.updateTotalItems();

            // Update total price after clearing
            this.updateTotalCartPrice();
            this.$router.push({ name: "confirm-order" });
          })
          .catch(() => {
            this.isProcessing = false; // Set loader to false if payment fails
          });
      });
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="errorModal"
    tabindex="-1"
    aria-labelledby="errorModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="errorModalLabel">Error</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Please fill all the required fields!</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-4 mt-5">
    <div class="d-flex row justify-content-center flex-xl-row-reverse">
      <div class="cart_responsive col-12 col-xl-4 position-relative">
        <button class="back_to_store_btn position-absolute">
          <router-link
            class="text-decoration-none"
            :to="{
              name: 'restaurant',
              params: { id: id },
            }"
          >
            Back to Restaurant Page
          </router-link>
        </button>

        <AppCart></AppCart>
      </div>

      <div class="col-12 col-xl-6 d-flex">
        <form
          method="POST"
          @submit.prevent="paymentFunction"
          class="form_data pt-3"
        >
          <h3>{{ restaurant_name }}</h3>
          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_name" class="form-label"
              >Name *</label
            >
            <input
              v-model="orderInfo.customer_name"
              type="text"
              class="form-control"
              id="orderInfo.customer_name"
            />
          </div>

          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_last_name" class="form-label"
              >Lastname *</label
            >
            <input
              v-model="orderInfo.customer_last_name"
              type="text"
              class="form-control"
              id="orderInfo.customer_last_name"
            />
          </div>

          <div class="mb-3 checkout_field">
            <label for="address" class="form-label">Address *</label>
            <input
              v-model="orderInfo.customer_address"
              type="text"
              class="form-control"
              id="address"
            />
          </div>

          <div class="mb-3 checkout_field">
            <label for="phone" class="form-label">Phone *</label>
            <input
              v-model="orderInfo.customer_phone"
              type="text"
              class="form-control"
              id="phone"
            />
          </div>

          <div class="mb-3 checkout_field">
            <label for="email" class="form-label">Email *</label>
            <input
              v-model="orderInfo.customer_email"
              type="text"
              class="form-control"
              id="email"
            />
          </div>

          <div class="mb-3 checkout_field">
            <label for="orderInfo.customer_note" class="form-label">Note</label>
            <textarea
              v-model="orderInfo.customer_note"
              class="form-control"
              id="orderInfo.customer_note"
              rows="3"
            ></textarea>
          </div>

          <div id="dropin-container"></div>
          <div class="loader-container">
            <button
              id="submit-button"
              class="d-flex justify-content-center align-items-center gap-2"
              type="submit"
            >
              Pay with
              <div class="paypal_badge">
                <i class="fa-brands fa-paypal"></i> <span>Braintree</span>
              </div>
            </button>
            <div v-if="isLoading" class="loader-overlay">
              <div class="loader"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
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
    @include checkout_btn;
    background-color: $primary_color;
    border: 2px solid $primary_color;
    color: $background_color;

    &:hover {
      background-color: $background_color;
      color: $primary_color;
    }
  }
}

.loader-container {
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    font-size: 1.2rem;

    .paypal_badge {
      @include tag_type_btn;
      border: none;

      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      padding-left: 0.8rem;
      padding-right: 0.8rem;
    }

    i {
      font-size: 1.2rem;
    }

    span {
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Sfondo scuro con opacità */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Assicura che il loader sia sopra tutti gli altri elementi */
}

/* Stile per il loader */
.loader {
  border: 5px solid #f3f3f3; /* Grigio chiaro */
  border-top: 5px solid $secondary_color; /* Blu */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite; /* Animazione di rotazione */
  transform: translateY(-50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// .loader {
//   @include loader;
// }

// @keyframes l9 {
//   to {
//     transform: rotate(1turn);
//   }
// }

.cart_responsive {
  @include shopping_cart_behavior;
  z-index: 1000;

  @media (max-width: 1200px) {
    height: fit-content;
  }

  .back_to_store_btn {
    cursor: pointer;
    transform: translate(20px, -40px);
    max-width: fit-content;

    padding: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    border: 2px solid $background_color_dark;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    display: flex;
    justify-content: start;

    color: $background_color;
    background-color: $primary_color;

    text-align: center;
    font-weight: 600;

    a {
      color: $background_color;
    }

    &:hover {
      transition: 0.2s;
      font-weight: 600;
      background-color: $background_color-dark;
      color: $primary_color;
      border-bottom: none;

      a {
        color: $primary_color;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .cart_responsive::v-deep .shopping_cart_main_content {
    min-height: fit-content;
    margin-bottom: 2rem !important;
  }

  .cart_responsive::v-deep .cart_body {
    display: block;
  }

  .cart_responsive::v-deep .cart_box {
    padding: 1rem !important;
  }

  .cart_responsive::v-deep .curtain_checkout_btn {
    height: fit-content;
    background-color: $background_color_dark;
  }

  .cart_responsive::v-deep .checkout_btn {
    border-radius: 2rem;

    &:hover {
      background-color: $secondary_color;
      cursor: default;
    }
  }
}

.cart_responsive::v-deep .checkout_btn {
  &:hover {
    background-color: $secondary_color;
    cursor: default;
  }
}
</style>
