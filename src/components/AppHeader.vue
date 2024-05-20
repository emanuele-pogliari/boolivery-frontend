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
            <div class="d-flex w-100">
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
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">about</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active text-uppercase" aria-current="page" href="#">payment</a>
                        </li>
                        <li
                            class="shopping-cart-icon d-flex justify-content-center align-items-center nav-item rounded-circle p-1">
                            <i class="nav-link fa-solid fa-cart-shopping"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="d-flex nav-restaurant-login d-flex justify-content-end rounded-start-pill gap-3">
                <a class="navbar-brand d-flex gap-2 align-items-center text-uppercase" href="#">
                    <i class="fa-solid fa-utensils"></i>
                    <link rel="stylesheet" href="">Restaurant Login
                </a>

            </div>
        </nav>

        <!-- --------------------------- -->
        <!-- END NAVBAR -->













        <!-- --------------------------- -->
        <!-- START JUMBOTRON -->
        <div class="jumbotron container">
            <div class="rounded-bottom-circle border-black">
                <img class="jumbotron-picture" src="/img/homepage/boolivery-jumbo-img-1.jpg" alt="">
            </div>
            <div class="jumbotron-content">
                <h1 class="text-uppercase">flying food</h1>
                <h1 class="text-uppercase">delivery</h1>
                <p>But i must explain to you how all this mistaken idea of denauncing of a pleasure</p>
                <div>
                    <button href="#"> RESTAURANTS </button>
                </div>
            </div>



        </div>
        <!-- --------------------------- -->
        <!-- END JUMBOTRON -->

    </header>



</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

// ---------------------------
// START NAVBAR

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

        .shopping-cart-icon {

            i {

                color: $primary_color !important;

                &:hover {
                    color: $primary_color !important;
                }

            }

            background-color: $secondary_color;


            &:hover {
                background-color: $background_color;
            }



        }


    }

    .nav-restaurant-login {
        background-color: $primary_color;
        padding: 0.4rem 1.4rem 0.4rem 1.4rem;

        a {
            @include nav_links_style
        }

    }
}

// ---------------------------
// END NAVBAR   









// ---------------------------
// START JUMBOTRON

.jumbotron {

    position: relative;

    img {
        object-fit: cover;
        width: 100%;
        height: 700px;

        border-bottom-left-radius: 4.5rem;
    }

    .jumbotron-content {
        position: absolute;
        top: 50%;
        left: 45%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        transform: translate(-50%, -50%);
        text-align: start;
        color: $background_color;

        h1 {
            font-size: 3rem;
            font-weight: 700;
        }

        p {
            font-size: 1rem;
            font-weight: 400;
        }

        button {
            @include footer_button_style_pills;
        }
    }


}
</style>

// END JUMBOTRON
// ---------------------------