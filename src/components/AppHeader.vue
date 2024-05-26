<script>

export default {
    name: "AppHeader",
};

</script>

<template>
    <div class="container-md">
        <div class="jumbotron gap-5 gap-md-0 row d-flex align-items-center">

            <div class="col-md-6 col-12 h-100 d-flex justify-content-center">
                <div class="d-flex justify-content-center jumbotron-content">
                    <h1 class="text-uppercase">Boolivery</h1>
                    <h1 class="text-uppercase">Delivery</h1>
                    <p class="text-capitalize">This Delicious Hamburger.</p>
                    <button class="flip-horizontal-bottom">Right To Your Doorstep!</button>
                </div>
            </div>

            <div class="col-md-6 col-12 justify-content-center">
                <img class="" src="/img/homepage/boolivery_hamburger_2.jpg" alt="">

            </div>

        </div>

    </div>



</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.jumbotron {
    position: relative;
    margin: 1rem 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: center;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        border-top-right-radius: 100px;
        border-bottom-right-radius: 1rem;

        @media (max-width: 768px) {
            border-radius: 1rem;
            border-radius: 1rem;

        }

    }

    .my_jumbo {
        background-color: $secondary_color;
        width: 100%;
        height: 28rem;
    }

    .jumbotron-content {
        display: flex;
        flex-direction: column;
        justify-content: start;
        text-align: start;
        color: $background_color;

        @media (max-width: 768px) {
            text-align: center;

        }





        animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        animation-delay: 0.3s;

        @keyframes tracking-in-expand {
            0% {
                letter-spacing: -0.5em;
                opacity: 0;
            }

            40% {
                opacity: 0.6;
            }

            100% {
                opacity: 1;
            }
        }




        h1 {
            font-size: 3rem;
            font-weight: 700;

            color: $text_color;
        }

        p {
            font-size: 1rem;
            font-weight: 400;

            color: $text_color;
        }

        button {
            @include shopping_cart_button;

            &:hover {

                background-color: $primary_color;
                color: #ffffff;
                animation: jello-horizontal 0.9s both;

                @keyframes jello-horizontal {
                    0% {
                        transform: scale3d(1, 1, 1);
                    }

                    30% {
                        transform: scale3d(1.25, 0.75, 1);
                    }

                    40% {
                        transform: scale3d(0.75, 1.25, 1);
                    }

                    50% {
                        transform: scale3d(1.15, 0.85, 1);
                    }

                    65% {
                        transform: scale3d(0.95, 1.05, 1);
                    }

                    75% {
                        transform: scale3d(1.05, 0.95, 1);
                    }

                    100% {
                        transform: scale3d(1, 1, 1);
                    }
                }




            }

        }

    }


}
</style>