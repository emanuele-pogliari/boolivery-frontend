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
  //NEW VERSION

  mounted() {
    this.getClientToken();
  },

  methods: {
    //test orderinfo
    checkOrderInfo() {
      console.log(this.orderInfo);
    },

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

    paymentFunction() {
      this.checkOrderInfo();
      if (!this.instance) {
        console.error("Drop-in instance is not available.");
        return;
      }

      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Error requesting payment method:", err);
          return;
        }

        if (!payload || !payload.nonce) {
          console.error("Invalid payload received:", payload);
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
        console.log("pd " + paymentData);

        axios
          .post(this.baseApiUrl + "payment", paymentData)
          .then((response) => {
            console.log(response);
            console.log("Payment successful");
          })
          .catch((error) => {
            console.log(error);
            console.log("Payment failed");
          });
      });
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-8 d-flex">
        <form method="POST" @submit.prevent>
          <div id="dropin-container"></div>
          <button
            id="submit-button"
            type="submit"
            class="button button--small button--green"
            @click="paymentFunction"
          >
            Purchase
          </button>
          <div class="mb-3">
            <label for="orderInfo.customer_name" class="form-label">Name</label>
            <input
              v-model="orderInfo.customer_name"
              type="text"
              class="form-control"
              id="orderInfo.customer_name"
            />
          </div>
          <div class="mb-3">
            <label for="orderInfo.customer_last_name" class="form-label"
              >Lastname</label
            >
            <input
              v-model="orderInfo.customer_last_name"
              type="text"
              class="form-control"
              id="orderInfo.customer_last_name"
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              v-model="orderInfo.customer_address"
              type="text"
              class="form-control"
              id="address"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">phone</label>
            <input
              v-model="orderInfo.customer_phone"
              type="text"
              class="form-control"
              id="phone"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">email</label>
            <input
              v-model="orderInfo.customer_email"
              type="text"
              class="form-control"
              id="email"
            />
          </div>
          <div class="mb-3">
            <label for="rderInfo.customer_note" class="form-label">Note</label>
            <textarea
              v-model="orderInfo.customer_note"
              class="form-control"
              id="orderInfo.customer_note"
              rows="3"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="col-4">
        <AppCart></AppCart>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
</style>
