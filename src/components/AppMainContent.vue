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
                Our <span>Things</span>
            </h3>

            <div id="food_types">
                <button>Italian</button>
                <button>Chinese</button>
                <button>Korean</button>
                <button>Sushi</button>
            </div>

            <a href="">
                Vai al Catalogo
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

            h3 {
                span {
                    font-weight: normal;
                }
            }

            #food_types {
                display: flex;
                gap: 3em;

                button {
                    padding: 6px 12px;
                    width: 7em;
                    border-radius: 20px;
                    border: 1px solid whitesmoke;

                    background-color: whitesmoke;

                    &:hover {
                    background-color: #36373b;
                    color: whitesmoke;
                    }
                }
            }

            a {
                display: flex;
                justify-content: center;
                align-items: center;

                text-decoration: none;
                color: black;
                background-color: whitesmoke;

                border: 2px solid black;
                border-radius: 20px;

                padding: 6px 12px;
                width: 12em;
            }
        }
    }
</style>