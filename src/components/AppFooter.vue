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
  <footer class="text-center p-0">
    <!-- <hr class=""> -->
    <div class="container d-flex justify-content-around gap-5 pt-5 pb-5 px-3">
      <div class="d-flex flex-column align-items-start gap-1">
        <!-- <img src="\img\logo\Logo.png" alt=""> -->
        <h5 class="pt-2">Boolivery</h5>
        <a href="#" class="btn primary-btn">ORDER NOW</a>
      </div>

      <div class="footer_links d-flex flex-column flex-wrap gap-4">
        <h6>Home</h6>
        <h6>Delivery</h6>
        <h6>Payment</h6>
        <h6>Contact</h6>
        <h6>About Us</h6>
      </div>

      <div class="footer_links d-flex flex-column flex-wrap gap-4">
        <h6>FAQ</h6>
        <h6>Help Center</h6>
        <h6>Privacy Policy</h6>
        <h6>Terms of Service</h6>
      </div>

      <div class="d-flex flex-column align-items-lg-start gap-2">
        <div>
          <h5>Subscribe</h5>
        </div>
        <form>
          <div class="d-flex flex-column align-items-lg-start b-3">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input
              type="email"
              class="form-control mb-2"
              id="exampleInputEmail1"
              placeholder="enter email adress"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="my_text">
              Subscribe to our newsletter
            </div>
          </div>
        </form>

        <div>
          <h5 class="mt-5">Our Socials</h5>
        </div>

        <div
          class="social_media_contacts d-flex gap-3 flex-wrap justify-content-center"
        >
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

      <div></div>
    </div>

    <div class="d-flex justify-content-center pb-5 pt-5 pb-5 developers-pills">
      <div class="d-flex justify-content-around my_width">
        <div>Website created by</div>
        <span class="badge rounded-pill">
          <a href="https://github.com/lucafagiolini">Luca F.</a>
        </span>
        <span class="badge rounded-pill">
          <a href="">Christian DG.</a>
        </span>
        <span class="badge rounded-pill">
          <a href="https://github.com/emanuele-pogliari">Emanuele P.</a>
        </span>
        <span class="badge rounded-pill">
          <a href="">Christian S.</a>
        </span>
      </div>
    </div>

    <div class="d-flex justify-content-center p-4">Boolean class 118</div>
  </footer>
</template>

<style lang="scss">
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

footer {
  color: $deactivated_text;
  background-color: $primary_color;

  .container {
    max-width: 1200px;
    width: 100%;
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
    h6 {
      font-size: 1rem;
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
    font-size: 1rem;
    font-weight: 500;
    color: $primary_color;

    span {
      width: 150px;

      a {
        text-decoration: none;
        @include footer_button_style_pills;
        cursor: default;

        &:hover {
          background-color: $secondary_color;
        }
      }
    }
  }
}

.my_width {
  max-width: 1200px;
  width: 100%;
}

.my_text {
  color: $deactivated_text;
}
</style>
