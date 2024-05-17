<script>

import AppCardItem from './AppCardItem.vue';

export default {
    name: 'AppMainContent',

    components: {
        AppCardItem,
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

        <section id="cards_section">
            <AppCardItem></AppCardItem>
            <AppCardItem></AppCardItem>
            <AppCardItem></AppCardItem>
            <AppCardItem></AppCardItem>
            <!-- card -->
        </section>
    </section>

</template>

<style lang="scss" scoped>
    // @use '../style/variables' as *;
    // @use '../style/mixins' as *;

    section {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        background-color: #eceff4;
        padding: 30px 0;

        border-radius: 50px;

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;

            max-width: 70vw;
            width: 100%;

            h3 {
                color: #36373b;
                cursor: default;
                
                span {
                    font-weight: normal;
                }
            }

            #food_types {
                display: flex;
                gap: 3rem;

                button {
                    padding: 6px 12px;
                    width: 7rem;
                    border-radius: 20px;
                    border: 1px solid whitesmoke;

                    background-color: whitesmoke;
                    color: #36373b;

                    transition: all 0.2s linear;

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
                color: #36373b;
                background-color: whitesmoke;

                border: 2px solid #36373b;
                border-radius: 20px;

                padding: 6px 12px;
                width: 12rem;

                transition: all 0.2s linear;

                &:hover {
                    background-color: #36373b;
                    color: whitesmoke;
                }
            }
        }
        #cards_section {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-evenly;
            align-items: center;

            max-width: 70vw;
            width: 100%;
        }
    }
</style>