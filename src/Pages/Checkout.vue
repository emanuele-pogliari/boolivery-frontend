<script>
import axios from "axios";
export default {
  data() {
    return {
      clientToken: null,
      instance: null,
      baseApiUrl: "http://127.0.0.1:8000/api/",
    };
  },

  methods: {
    // paymentFunction() {
    //   axios
    //     .post(this.baseApiUrl + "checkout");{
    //       nonce: "fake-valid-nonce",
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    //get client token
    getClientToken() {
      axios.get(this.baseApiUrl + "token").then((response) => {
        this.clientToken = response.data.token;
        console.log(this.clientToken);
      });
    },
  },

  mounted() {
    this.getClientToken(),
      braintree.dropin.create({
        authorization: this.clientToken,
        selector: "#dropin-container",
      });
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
