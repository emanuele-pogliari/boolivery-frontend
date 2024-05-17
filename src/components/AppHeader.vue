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

                <span>Boolivery - Delivery at your door</span>

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

</header>
</template>

<style lang="scss" scoped>

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.left-nav {
    background-color: rgb(121, 121, 121);
    border-radius: 45px;
    padding: 15px 25px;
}

.logo-nav {
    width: 200px;
}

.middle-nav {
    display:flex;
    gap: 25px;
    justify-content: center;
    margin: auto;
    background-color: #3d3d3d;
    border-radius: 45px;
    padding: 20px 25px;
    width: 700px;
    color: white;
}

.right-nav {
    background-color: #3d3d3d;
    border-radius: 45px;
    padding: 20px 25px;
    color: white;
    width: 400px;
    text-align: center;
}

</style>