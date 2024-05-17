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

    <footer class="text-center p-0 rounded-top-5">
        <!-- <hr class=""> -->
        <div class="d-flex justify-content-around gap-5 pt-5 pb-5 px-3">


            <div class="d-flex flex-column align-items-start">
                <h5 class="pt-2">Boolivery</h5>
                <p class="">All your favorites dishes are just one click away.</p>
                <a href="#" class="btn primary-btn ">ORDER NOW</a>
            </div>

            <div class="d-flex flex-wrap gap-4 align-content-center">
                <h5>HOME</h5>
                <h5>DELIVERY</h5>
                <h5>PAYMENT</h5>
                <h5>CONTACT</h5>
            </div>




            <div class="d-flex gap-3 flex-wrap align-content-center">
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
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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
                    <a href="https://github.com/rpalanga">Luca</a>
                </span>
                <span class="badge rounded-pill">
                    <a href="">Christian</a>
                </span>
                <span class="badge rounded-pill">
                    <a href="https://github.com/emanuele-pogliari">Emanuele</a>
                </span>
                <span class="badge rounded-pill">
                    <a href="">Christian</a>
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


    background-color: $secondary_color;

    img {
        height: 100px;
    }

    .primary-btn {
        @include primary_button_style;
    }


    .developers-pills {
        background-color: $primary_color;
        color: white;
        font-size: 1rem;
        font-weight: 500;

        span {

            width: 150px;

            @include footer_button_style;

            a {
                text-decoration: none;
                color: $secondary_color;

                &:hover {
                    color: white;
                }

            }
        }
    }
}
</style>