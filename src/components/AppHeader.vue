<script>
export default {
    name: "AppHeader",
}
</script>

<template>
    <header class="">


        <!-- --------------------------- -->
        <!-- START NAVBAR -->

        <nav class="navbar d-fle justify-content-between navbar-expand-lg gap-1 position-fixed z-1 w-100">
            <div class="nav-logo d-flex justify-content-end rounded-end-pill">
                <!-- <a class="navbar-brand" href="#">BOOLIVERY</a> -->
                <img class="navbar-brand" src="/img/logo/boolivery-logo-1.png" alt="">
            </div>
            <div class="d-flex">
                <div class="nav-links collapse d-flex justify-content-center navbar-collapse accordion rounded-pill"
                    id="navbarSupportedContent">
                    <ul class="navbar-nav mb-lg-0 d-flex justify-content-between align-items-center">
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">delivery</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">about us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">payment</a>
                        </li>
                        <li class="nav-item">
                            <i class="nav-link fa-solid fa-cart-shopping"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="d-flex nav-restaurant-login d-flex justify-content-end rounded-start-pill gap-3">
                <a class="navbar-brand d-flex gap-2 align-items-center text-uppercase" href="#">
                    <i class="fa-solid fa-utensils"></i>
                    <span>Restaurant Login</span>
                </a>

            </div>
        </nav>

        <!-- --------------------------- -->
        <!-- END NAVBAR -->






        <div class="jumbotron">

            <img class="jumbotron-picture" src="/img/boolivery-food.png" alt="">

            <div class="title-jumbotron-1">WE DELIVER</div>

            <div class="title-jumbotron-2">AT YOUR DOOR</div>

            <img class="jumbotron-divider" src="/img/divider.png">

            <div class="jumbotron-subsection">But I must explain to you how all this mistaken
                <br>idea of denouncing of a pleasure
            </div>

            <div class="buy-jumbotron">

                <div class="skew-background"></div>

                <div class="skew-text">GO TO CATALOG</div>

            </div>

        </div>

    </header>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.navbar {
    padding-top: 0;

    .nav-logo {
        background-color: $background_color;
        padding: 0.4rem 1.4rem 0.4rem 1.4rem;

        img {
            height: 39px;
        }
    }

    .nav-links {
        background-color: $primary_color;


        padding: 0.4rem 1.4rem 0.4rem 1.4rem;

        .nav-item {

            a {

                @include nav_links_style
            }

            i {
                @include nav_links_style
            }
        }

    }

    .nav-restaurant-login {
        background-color: $primary_color;
        padding: 0.4rem 1.4rem 0.4rem 1.4rem;

    }
}











.jumbotron {

    position: relative;

    img {
        object-fit: cover;
        width: 100%;
        height: 700px;
    }

    .title-jumbotron-1 {
        font-size: 70px;
        position: absolute;
        top: 175px;
        left: 100px;
    }

    .title-jumbotron-2 {
        font-size: 70px;
        position: absolute;
        top: 250px;
        left: 150px;
    }

    .jumbotron-divider {
        width: 250px;
        height: 30px;
        position: absolute;
        z-index: 99;
        top: 350px;
        left: 200px;
        object-fit: cover;
    }

    .jumbotron-subsection {
        position: absolute;
        top: 390px;
        left: 200px;
    }

    .buy-jumbotron {
        position: absolute;
        width: 250px;
        text-align: center;
        top: 470px;
        left: 250px;

        .skew-background {
            background-color: #f39939;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: skewX(20deg);
            z-index: 1;
            display: inline-block;
        }

        .skew-text {
            position: relative;
            z-index: 2;
            color: black;
            font-size: 24px;
            padding: 15px;
            display: inline-block;
            font-weight: bold;
        }
    }
}
</style>