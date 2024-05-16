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
                
                <img class="logo-nav" src="/img/Logo2.png" alt="">

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

            </div>

            <div class="right-nav">

            </div>

        </div>

    </nav>

</header>
</template>

<style lang="scss" scoped>

.nav-container {
    display: flex;
}

.left-nav {
    background-color: rgb(121, 121, 121);
    border-radius: 45px;
    padding: 5px 25px;
}

.logo-nav {
    width: 100px;
}

</style>