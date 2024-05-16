<script>

export default {
    name: 'AppCardItem',

    components: {
    },  

    data() {
        return {
            
        }
    }
}


</script>

<template>
    
    <div class="card py-3 px-3" style="width: 15rem;">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiiK7GcmVeLr_tbOQIgB1Otfspbc64nLvXnwGBleYCXw&s" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">Nome Ristorante</h5>
            <p class="card-text text-center">$$$</p>
            <p class="card-text text-center">Qua ci sarà l'anteprima della descrizione inserita dal ristoratore</p>
            <div class="text-center">
                <a href="#" class="btn btn-primary">Visita</a>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    // @use '../style/variables' as *;
    // @use '../style/mixins' as *;
</style>