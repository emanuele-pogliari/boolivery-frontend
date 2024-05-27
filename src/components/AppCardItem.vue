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
  <div class="container card my_card pt-3 gap-1">
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
      <div class="likes-pill">
        <i class="fa-solid fa-thumbs-up"></i> 90%
      </div>
    </div>

    <div class="card-body">
      <h5 class="card-title text-start">{{ restaurant.name }}</h5>

      <p class="card-text text-start" style="font-weight: 500">
        {{ restaurant.address }}
      </p>

      <div
        class="card-text restaurant_type d-flex gap-1 justify-content-center"
      >
        <span v-for="type in restaurant.types">
          {{ type.type }}
        </span>
      </div>

      <router-link
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
        class="btn btn-primary my_btn"
        ><i class="fa-solid fa-person-biking"></i>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/variabiles.scss" as *;
@use "/src/mixins.scss" as *;

.my_card {
  border-radius: 24px;
  border-color: transparent;
  color: $text_color;

  width: 250px;

  box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.1);
  background-color: $background_color;

  cursor: default;

  .img-container {

    position: relative;

    img {
      border-radius: 16px;
      object-fit: cover;
    }

    .likes-pill {
      font-weight: 500;

      position: absolute;
      bottom: 10px;
      right: 10px;

      background-color: $secondary_color;
      color: $text_color;
      padding: 0.1rem 0.5em;

      border-radius: 12px;
      text-align: center;
    }

  }
  

  p {
    margin: 0.1rem 0.1rem 0.25rem 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    left: 50%;
    transform: translate(-50%, 50%);

    border-radius: 50%;
    padding: 0.7rem 0.9rem;

    transition: all 0.2s linear;
    background: linear-gradient(to bottom right, #f2ca39, #eeba00);
    color: $background_color;
    border: none;

    box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);

    &:hover {
      transform: translate(-50%, 50%) scale(1.1);
    }
  }
}
</style>
