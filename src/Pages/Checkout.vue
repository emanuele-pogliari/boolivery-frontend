<script>
import axios from "axios";
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
      braintree.dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          if (err) {
            console.error(err);
            return;
          }
          this.instance = instance;
        }
      );
    },

    paymentFunction() {
      axios
        .post(this.baseApiUrl + "payment", {
          nonce: "fake-valid-nonce",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
