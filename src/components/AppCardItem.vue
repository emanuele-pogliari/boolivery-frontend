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
  <div class="container card my_card py-3 gap-2" style="width: 15.5rem">
    <img
      src="https://img.freepik.com/foto-gratuito/pizza-hawaiana_1203-2455.jpg?t=st=1715969805~exp=1715973405~hmac=7ae6002232c8be51caf786f83822757cc37badce87ef60bee7d71515671884c2&w=1380"
      class="card-img-top" alt="..." />
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
      <a href="#" class="btn btn-primary my_btn"><i class="fa-solid fa-eye"></i></a>
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
    background: $primary_color;
    color: $background_color;
    border: none;

    box-shadow: 10px 10px 15px rgba(20, 20, 20, 0.15);

    &:hover {
      transform: translate(-50%, 50%) scale(1.1);
    }
  }
}
</style>
