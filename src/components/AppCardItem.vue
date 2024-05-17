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
    
    <div class="card my_card py-3 px-3" style="width: 15.5rem;">
        <img src="https://img.freepik.com/foto-gratuito/pizza-hawaiana_1203-2455.jpg?t=st=1715969805~exp=1715973405~hmac=7ae6002232c8be51caf786f83822757cc37badce87ef60bee7d71515671884c2&w=1380" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">L'Orologio</h5>
            <p class="card-text text-center" style="color: grey;">Italiano</p>
            <p class="card-text text-center" style="font-weight: 500;">$$$</p>
            <a href="#" class="btn btn-primary my_btn"><!-- <i class="fa-solid fa-eye"></i>-->👁</a>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    // @use '../style/variables' as *;
    // @use '../style/mixins' as *;

    .my_card {
        border-radius: 24px;
        border-color: transparent;

        position: relative;

        box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.1);

        cursor: default;

        img {
            border-radius: 16px;

            height: 10rem;
            object-fit: cover;
        }

        p {
            margin: 0.1rem 0.1rem 0.25rem 0.1rem;
        }

        .card-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;

            line-height: 1.8rem;
        }

        .my_btn {
            position: absolute;
            bottom: 0%;
            left: 50%;
            transform: translate(-50%, 50%);

            border-radius: 50%;
            padding: 0.7rem 0.8rem;

            transition: all 0.2s linear;
            background: linear-gradient(to bottom right, rgb(28, 28, 255), #0f0f88);
            color: white;
            border: none;

            box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);

            &:hover {
                transform: translate(-50%, 50%) scale(1.1);
            }
        }
    }
</style>