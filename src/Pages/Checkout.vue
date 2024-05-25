<script>
import axios from "axios";
import AppCart from "../components/AppCart.vue";
import { matchedRouteKey } from "vue-router";
export default {
  components: {
    AppCart,
  },
  data() {
    return {
      cartAmount: "25,43",
      clientToken: null,
      instance: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",
    };
  },

  mounted() {
    this.getClientToken();
  },

  methods: {
    //get client token
    getClientToken() {
      axios.get(this.baseApiUrl + "token").then((response) => {
        this.clientToken = response.data.token;
        // inizialize drop in when the api is called
        this.dropinStart();
      });
    },

    dropinStart() {
      var button = document.getElementById("submit-button");
      braintree.dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          this.instance = instance;
          if (err) {
            console.error(err);
            return;
          }
          instance.on("onPaymentMethodReceived", (payload) => {
            console.log("Payment method selected:", payload);
            this.paymentFunction(payload);
          });
        }
      );
    },

    paymentFunction() {
      const paymentData = {
        amount: this.cartAmount, // Use the fetched cart amount
        paymentMethodNonce: payload.nonce,
      };
      axios
        .post(this.baseApiUrl + "payment", paymentData)
        .then((response) => {
          console.log(response);
          console.log("no problem");
        })
        .catch((error) => {
          console.log(error);
          console.log("problem");
        });
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div id="dropin-container"></div>
        <button
          id="submit-button"
          class="button button--small button--green"
          @click="paymentFunction"
        >
          Purchase
        </button>
      </div>
      <div class="col-4">
        <AppCart></AppCart>
      </div>
      <div class="col-4">
        <div>
          <form
            id="payment-form"
            @submit.prevent="paymentFunction()"
            :action="this.baseApiUrl + 'payment'"
            method="post"
          >
            <!-- @csrf -->
            <!-- Name field with pattern restriction for letters only -->
            <div class="mb-3">
              <label for="customer_name" class="form-label"
                >Nome e Cognome: *</label
              >
              <input
                v-model="username"
                type="text"
                class="form-control"
                id="customer_name"
                name="customer_name"
                pattern="[A-Za-z\s]+"
                required
                title="Name should only contain letters."
              />
            </div>

            <!-- Email field with built-in email validation -->
            <div class="mb-3">
              <label for="email" class="form-label">Email: *</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
              />
            </div>

            <!-- Phone field with pattern restriction for phone numbers -->
            <div class="mb-3">
              <label for="phone" class="form-label"
                >Numero di telefono: *</label
              >
              <input
                v-model="phone"
                type="tel"
                class="form-control"
                id="phone"
                name="phone"
                pattern="\d{10}"
                required
                title="Phone number should be 10 digits."
              />
            </div>

            <!-- Address field with minlength and maxlength attributes -->
            <div class="mb-3">
              <label for="address" class="form-label">Indirizzo: *</label>
              <input
                v-model="address"
                type="text"
                class="form-control"
                id="address"
                name="address"
                minlength="10"
                maxlength="250"
                required
              />
            </div>

            <input
              type="hidden"
              class="form-control"
              id="date_time"
              name="date_time"
              required
              readonly
            />

            <!-- BRAINTREE DATA -->
            <input type="hidden" name="amount" :value="cartAmount" />
            <!-- <input type="hidden" name="token" @click="getClientToken" /> -->
          </form>
        </div>
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
