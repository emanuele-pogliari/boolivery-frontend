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
                Cerchi altro?
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
    @use "/src/variabiles.scss" as *;
    @use "/src/mixins.scss" as *;

    section {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        background-color: $background_color_dark;
        padding: 30px 0;

        border-radius: 50px;

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;

            max-width: 70vw;
            width: 100%;

            h3 {
                font-size: 2.1rem;               
                color: $text_color;

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
                    width: 8rem;
                    border-radius: 20px;
                    border: 1px solid $background_color;

                    background-color: $background_color;
                    color: $text_color;
                    font-weight: 600;

                    transition: all 0.2s linear;

                    &:hover {
                    background-color: $text_color;
                    color: $background_color;
                    }
                }
            }

            a {
                display: flex;
                justify-content: center;
                align-items: center;

                text-decoration: none;
                color: $background_color;
                background-color: $text_color;
                
                font-weight: 600;
                word-spacing: 2px;
                letter-spacing: 0.5px;

                border: 2px solid $text_color;
                border-radius: 20px;

                padding: 6px 12px;
                width: 12rem;

                transition: all 0.2s linear;

                &:hover {
                    background-color: $secondary_color;
                    border-color: $secondary_color;
                    color: $text_color;
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