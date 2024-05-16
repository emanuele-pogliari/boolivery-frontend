<script>

export default {
    name: 'AppMainContent',

    components: {
    },  

    data() {
        return {
            
        }
    }
}


</script>

<template>
    
    <section>
        <nav>

            <h3>
                Our Things
            </h3>

            <div id="food_types">
                <button>Italian</button>
                <button>Chinese</button>
                <button>Korean</button>
                <button>Sushi</button>
            </div>

            <a href="">
                Catalogo
            </a>
        </nav>

        <section>
            <!-- card -->
        </section>
    </section>

</template>

<style lang="scss">
    // @use '../style/variables' as *;
    // @use '../style/mixins' as *;

    section {
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #eceff4;
        padding: 30px 0;

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;

            max-width: 70vw;
            width: 100%;

            #food_types {
                display: flex;
                gap: 3em;

                button {
                    padding: 6px 12px;
                    width: 7em;
                    border-radius: 20px;
                }
            }
        }
    }
</style>