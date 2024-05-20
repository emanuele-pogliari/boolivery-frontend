<script>
export default {
      name:"AppHeader",
}
</script>

<template>
<header>
   
    <nav>

        <div class="nav-container">

            <div class="left-nav">
                
                <img class="logo-nav" src="/img/booliverylogo.svg" alt="">

            </div>

            <div class="middle-nav">

                <span>HOME</span>

                <span>MENU</span>

                <span>DELIVERY</span>

                <span>ABOUT US</span>

                <span>PAYMENT</span>

                <span>CONTACT</span>

                <span><i class="fa-solid fa-magnifying-glass"></i></span>

                <span><i class="fa-solid fa-cart-shopping"></i></span>

            </div>

            <div class="right-nav">

                <i class="fa-solid fa-phone"></i>

                <span>NUMERO TELEFONO</span>

            </div>

        </div>

    </nav>

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

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: #f2ca39;
    padding: 10px;
    padding-top: 40px;

    .left-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 45px;
    padding: 15px 25px;
    position: absolute;
    top: 20px;
    left: 0;
    width: 18%;
    z-index: 99;
    }

    .middle-nav {
    display:flex;
    gap: 25px;
    position: absolute;
    top: 20px;
    left: 375px;
    z-index: 99;
    justify-content: center;
    margin: auto;
    background-color: #3d3d3d;
    border-radius: 45px;
    padding: 25px 25px;
    width: 30%;
    font-size: 11px;
    color: white;
    }

    .middle-nav span:hover {
        color: #f2ca39;
    }

    .right-nav {
    background-color: #3d3d3d;
    position: absolute;
    top: 20px;
    left: 980px;
    z-index: 99;
    border-radius: 45px;
    padding: 25px 30px;
    font-size: 11px;
    color: white;
    width: 15%;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    }

}

.logo-nav {
    width: 200px;
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