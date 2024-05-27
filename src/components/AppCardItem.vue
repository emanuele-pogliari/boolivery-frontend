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
  <router-link
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
        class="card my_card gap-1">
    <div class="img-container">
      <img
        v-if="restaurant.image"
        :src="
          restaurant.image.startsWith('http')
            ? restaurant.image
            : 'http://localhost:8000/storage/' + restaurant.image
        "
        class="card-img-top"
        alt="..."
      />
      <img
        v-else
        class="card-img-top"
        src="/img/homepage/placeholdertemp.jpg"
        alt="..."
      />
      <div class="types-pill">
        <span v-for="type in restaurant.types">
          <i class="fa-solid fa-pizza-slice"></i> {{ type.type }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <h5 class="card-title text-start">{{ restaurant.name }}</h5>

      <btn class="btn btn-primary my_btn">
        <i class="fa-solid fa-person-biking"></i>
      </btn>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.my_card {
  border-radius: 24px;
  border-color: transparent;
  color: $text_color;

  max-width: 275px;
  width: 100%;

  background-color: $background_color_dark;

  cursor: pointer;
  text-decoration: none;

  .img-container {

    position: relative;

    img {
      border-radius: 16px;
      object-fit: cover;
    }

    .types-pill {
      font-weight: 500;

      position: absolute;
      bottom: 10px;
      left: 10px;

      background-color: $secondary_color;
      color: $text_color;
      border: 1px solid $text_color;
      padding: 0.1rem 0.5em;

      border-radius: 12px;
      text-align: center;

      opacity: .85;
    }

  }

  .card-body {
    padding: 0.5rem 0 1.25rem;
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
    line-height: 1.8rem;
  }

  .my_btn {
    position: absolute;
    bottom: 0%;
    right: 0%;
    transform: translate(0%, 50%);

    border-radius: 50%;
    padding: 0.7rem 0.9rem;

    transition: all 0.2s linear;
    background: linear-gradient(to bottom right, #f2ca39, #eeba00);
    color: $background_color;
    border: none;

    box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);
  }
}

.my_card:hover .my_btn{
  transform: translate(0%, 50%) scale(1.1);
}
</style>
