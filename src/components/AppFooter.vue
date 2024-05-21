<script>

export default {
    name: 'AppFooter',

    components: {
    },

    data() {
        return {

        }
    }
}


</script>

<template>

    <footer class="text-center p-0">
        <!-- <hr class=""> -->
        <div class=" container d-flex justify-content-around gap-5 pt-5 pb-5 px-3">


            <div class="d-flex flex-column align-items-start">
                <h5 class="pt-2">Boolivery</h5>
                <p class="">All your favorites dishes are just one click away.</p>
                <a href="#" class="btn primary-btn ">ORDER NOW</a>
            </div>

            <div class="foter_links d-flex flex-wrap gap-4 align-content-center">
                <h6>HOME</h6>
                <h6>DELIVERY</h6>
                <h6>PAYMENT</h6>
                <h6>CONTACT</h6>
            </div>




            <div class="social_media_contacts d-flex gap-3 flex-wrap align-content-center">
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

            <div class="d-flex flex-column align-items-lg-start">
                <div>
                    <h5>Subscribe</h5>
                </div>
                <form>
                    <div class="d-flex flex-column align-items-lg-start b-3">
                        <label for="exampleInputEmail1" class="form-label"></label>
                        <input type="email" class="form-control" id="exampleInputEmail1"
                            placeholder="enter email adress" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text text-light">Subscribe to our newsletter</div>
                    </div>
                </form>

            </div>

            <div>

            </div>

        </div>

        <div class="d-flex justify-content-center pb-5 pt-5 pb-5 developers-pills gap-2">
            <div>
                Website created by
            </div>
            <div class="d-flex gap-2">
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

        <div class="d-flex justify-content-center p-4">
            Boolean class 118
        </div>
    </footer>

</template>

<style lang="scss">
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

footer {

    color: $deactivated_text;
    background-color: $primary_color;

    img {
        height: 100px;
    }

    .primary-btn {
        @include primary_button_style;
    }

    .foter_links {
        h6 {
            font-size: 1rem;
            color: $deactivated_text;

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

            }
        }
    }
}
</style>