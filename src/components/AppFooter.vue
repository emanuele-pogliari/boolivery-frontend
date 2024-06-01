<script>
export default {
  name: "AppFooter",

  components: {},

  data() {
    return {};
  },
};
</script>

<template>
  <footer class="p-0">
    <!-- <hr class=""> -->
    <div class="container d-flex py-5">

      <div class="row d-flex flex-grow-1 gap-5 gap-sm-0 gap-md-0 inside-container">

        <div
          class="footer_links d-flex align-items-center align-items-sm-start col-12 col-sm-6 col-md-3 flex-column py-3">
          <h5>Company</h5>
          <div>
            <span>Home</span>
          </div>
          <div>
            <span>Delivery</span>
          </div>
          <div>
            <span>Payment</span>
          </div>
          <div>
            <span>Contact</span>
          </div>
          <div>
            <span>About Us</span>
          </div>
        </div>

        <div
          class="footer_links align-items-center align-items-sm-start d-flex col-12 col-sm-6 col-md-3 flex-column py-3">
          <h5>Legal Terms</h5>
          <div>
            <span>FAQ</span>
          </div>
          <div>
            <span>Help Center</span>
          </div>
          <div>
            <span>PrivacyPolicy</span>
          </div>
          <div>
            <span>Terms of Service</span>
          </div>
        </div>


        <div
          class="footer_links social_media_contacts align-items-center align-items-sm-start d-flex col-12 col-sm-6 col-md-3 flex-column py-3">
          <h5 class="">Our Socials</h5>

          <div class="d-flex gap-2">
            <span>
              <a href="">
                <i class="fa-brands fa-twitter"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-facebook"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-google-plus-g"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </span>
          </div>



        </div>

        <div class="d-flex align-items-center align-items-sm-start col-12 col-sm-6 col-md-3 flex-column py-3">

          <div>
            <h5>Subscribe</h5>
          </div>

          <form class="w-100">
            <div class="d-flex flex-column">
              <label for="exampleInputEmail1" class="form-label"></label>
              <input type="email" class="form-control mb-2" id="exampleInputEmail1" placeholder="enter email adress"
                aria-describedby="emailHelp" />
              <div id="emailHelp" class="my_text">
                Subscribe to our newsletter
              </div>
            </div>
          </form>

        </div>


      </div>



    </div>

    <div class="d-flex justify-content-center py-4 developers-pills">
      <div class="d-flex  flex-column align-items-center">
        <span>Website created by</span>
      </div>
    </div>

    <div class="d-flex justify-content-center text-white p-4">
      Boolean class 118
    </div>

  </footer>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

footer {
  color: $deactivated_text;
  background-color: $primary_color;
  border-top-right-radius: 100px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);


  h5 {
    font-size: 1.2rem;
    font-weight: 500;
    color: $background_color;
  }


  img {
    height: 100px;
  }

  .primary-btn {
    @include primary_button_style;

    &:hover {
      background-color: $primary_color;
    }
  }

  .footer_links {


    span {

      font-size: 0.8rem;
      font-weight: 300;
      color: $deactivated_text;
      cursor: pointer;

      &:hover {
        color: $secondary_color;
      }
    }
  }

  .social_media_contacts {
    span {
      font-size: 1rem;
      color: $deactivated_text;

      a {
        color: $deactivated_text;

        &:hover {
          color: $secondary_color;
        }
      }
    }
  }

  .developers-pills {
    background-color: $secondary_color;
    font-size: 0.8rem;
    font-weight: 300;
    color: $primary_color;

    span {

      a {
        // text-decoration: none;
        // @include footer_button_style_pills;
        // cursor: default;

        &:hover {
          background-color: $secondary_color;
        }
      }
    }
  }
}

.my_text {
  color: $deactivated_text;
}
</style>
