<script>

export default {
    name: "AppHeader",
};

</script>

<template>
    <div class="container-md mt-3 mt-lg-5 mb-5 nunito-header">

        <div class="jumbotron gap-5 gap-lg-0 row d-flex align-items-center">

            <div class="col-lg-6 col-12 h-100 d-flex justify-content-center">
                <div class="d-flex justify-content-center jumbotron-content">
                    <h1 class="text-uppercase">Boolivery</h1>
                    <h2 class="text-capitalize">Delivery</h2>
                    <p class="text-capitalize">This Delicious Hamburger.</p>
                    <button class="flip-horizontal-bottom">Right To Your Doorstep!</button>
                </div>
            </div>

            <div class="col-lg-6 col-12 justify-content-center p-0 m-0">
                <img src="/img/homepage/boolivery_hamburger_2.jpg" alt="">
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.nunito-header {
    font-family: "Nunito", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

.jumbotron {
    position: relative;
    margin: 1rem 0;

    @media screen and (min-width: 992px) {
        background-color: $background_color_dark;
        border-top-left-radius: 1rem;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 1rem;
        border-bottom-left-radius: 1rem;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: center;
        // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
        border-top-right-radius: 100px;
        border-bottom-right-radius: 1rem;

        @media (max-width: 992px) {
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

        @media (max-width: 992pxpx) {
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
            font-size: 4rem;
            font-weight: 800;

            color: $text_color;

            @media (max-width: 320px) {
                font-size: 3rem;
            }
        }

        h2 {
            font-size: 2.5rem;
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
                transition: 0.3s ease;
                scale: 1.05;
            }

        }

    }

}
</style>