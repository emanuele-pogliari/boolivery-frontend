<script>
export default {
  name: "AppCardItem",
  components: {},

  props: {
    restaurant: Object,
  },

  data() {
    return {};
  },
};
</script>

<template>
  <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" class="card my_card p-0">
    <div class="nunito-card">

      <div class="img-container">
        <img v-if="restaurant.image" :src="restaurant.image.startsWith('http')
          ? restaurant.image
          : 'http://localhost:8000/storage/' + restaurant.image
          " class="card-img-top" alt="..." />
        <img v-else class="card-img-top" src="/img/homepage/placeholdertemp.jpg" alt="..." />


      </div>
      <div>
        <div class="card-body px-1 py-2">
          <h5 class="card-title text-start">{{ restaurant.name }}</h5>
        </div>

        <div class="d-flex">
          <span class="type_text types-single-pill d-flex type_bg" v-for="type in restaurant.types">
            {{ type.type }}
          </span>
        </div>

      </div>
    </div>
  </router-link>
</template>




<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.nunito-card {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.my_card {
  border-radius: 24px;
  border: none;
  max-width: 290px;
  min-width: fit-content;
  width: 100%;

  background-color: $background_color_dark;
  color: $text_color;

  cursor: pointer;
  text-decoration: none;


  @media screen and (min-width: 768px) {
    max-width: 325px;

  }

  @media screen and (max-width: 768px) {
    max-width: 100%;

  }

  @media screen and (min-width: 1200px) {
    max-width: 250px;

  }

  .img-container {

    position: relative;

    img {
      border-radius: 16px;
      object-fit: cover;

      height: 125px;

      box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);
    }

    .types-pill {
      font-weight: 700;
      gap: .1rem;

      position: absolute;
      bottom: 10px;
      left: 10px;


      .type_bg {
        background-color: $primary_color;
        opacity: 0.8;

        .type_text {
          color: white (1);
        }
      }

      @include type_single_pill;
      font-size: 0.8;
      color: #ffffff (1);
    }

  }

  .restaurant_type {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;

    span {
      font-weight: 500;

      color: $background_color;
      background-color: $primary_color;

      padding: 0.1rem 0.6rem;
      border-radius: 16px;
    }
  }

  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 800;
    font-size: 1.2rem;
  }

  // .my_btn {
  //   position: absolute;
  //   bottom: 0%;
  //   right: 5%;
  //   transform: translate(0%, 0%);

  //   border-radius: 50%;
  //   padding: .5rem .7rem;

  //   transition: all 0.2s linear;
  //   background: linear-gradient(to bottom right, #f2ca39, #eeba00);
  //   color: $background_color;
  //   border: none;

  //   box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);
  // } 

}

.my_card:hover .my_btn {
  transform: translate(0%, 0%) scale(1.1);
}
</style>
