<script>
export default {
    name: "AppNavbar",
}
</script>

<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid my_container">
        <!-- Home Icon -->
        <a class="navbar-brand" href="#"><i class="fa-brands fa-slack"></i></a>
        <!-- Toggle button for mobile view -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="d-flex justify-content-between w-100">
                <!-- Centered Navigation Links -->
                <div class="navbar-nav mx-auto">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    <a class="nav-link" href="#">Delivery</a>
                    <a class="nav-link" href="#">Payment</a>
                    <a class="nav-link" href="#">Contact</a>
                    <a class="nav-link" href="#">About</a>
                </div>
                <!-- Login Button -->
                <button class="btn btn-sm btn-outline-secondary ms-auto" type="button">Login</button>
            </div>
        </div>
    </div>
</nav>

</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

// ---------------------------
// START NAVBAR


</style>