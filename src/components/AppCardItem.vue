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
  <div class="card my_card py-3 gap-2" style="width: 15.5rem">
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
    <div class="card-body">
      <h5 class="card-title text-center">{{ restaurant.name }}</h5>
      <div class="card-text text-center restaurant_type">
        <span v-for="type in restaurant.types">
          {{ type.type }}
        </span>
      </div>
      <p class="card-text text-center" style="font-weight: 500">
        {{ restaurant.address }}
      </p>
      <a href="#" class="btn btn-primary my_btn"
        ><i class="fa-solid fa-eye"></i
      ></a>
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

  position: relative;

  box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.1);
  background-color: $background_color;

  cursor: default;

  img {
    border-radius: 16px;

    height: 10rem;
    object-fit: cover;
  }

  p {
    margin: 0.1rem 0.1rem 0.25rem 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .restaurant_type {
    color: $deactivated_text;
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
    padding: 0.7rem 0.9rem;

    transition: all 0.2s linear;
    background: linear-gradient(to bottom right, #f2ca39, #c59a00);
    color: $background_color_dark;
    border: none;

    box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);

    &:hover {
      transform: translate(-50%, 50%) scale(1.1);
    }
  }
}
</style>
