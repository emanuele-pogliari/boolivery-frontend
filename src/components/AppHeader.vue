<script>
export default {
    name: "AppHeader",
}
</script>

<template>
    <header>

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
// START JUMBOTRON

.jumbotron {

    position: relative;
    margin-bottom: 10rem;


    img {
        object-fit: cover;
        width: 100%;
        height: 700px;

        border-bottom-left-radius: 4.5rem;
        border-bottom-right-radius: 4.5rem;
       
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

// END JUMBOTRON
// ---------------------------
</style>
