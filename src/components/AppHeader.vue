<script>
export default {
    name: "AppHeader",
}
</script>

<template>
    <header>

        <!-- --------------------------- -->
        <!-- START JUMBOTRON -->
        <div class="jumbotron">
            <div class="my_jumbo">
                <div class="jumbotron-content">
                <h1 class="text-uppercase">Boolivery</h1>
                <h1 class="text-uppercase">Delivery</h1>
                <p>Speedy Delivery, Right to Your Doorstep!</p>
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

    .my_jumbo {
        background-color: $secondary_color;
        width: 100%;
        height: 28rem;
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

            color: $text_color;
        }

        p {
            font-size: 1rem;
            font-weight: 400;

            color: $text_color;
        }

        button {
            @include footer_button_style_pills;
        }
    }


}

// END JUMBOTRON
// ---------------------------
</style>
