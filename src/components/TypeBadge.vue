<script lang="ts" setup>
defineProps<{ type: NamedApiResource }>();
</script>

<template>
  <div :class="`type-badge__container ${type.name}`">
    <p>{{ type.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/variables";
.type-badge {
  &__container {
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;

    p {
      font-size: 1.2rem;
      text-transform: uppercase;
    }

    &.normal {
      background-color: variables.$type-normal;
    }

    &.fire {
      background-color: variables.$type-fire;
    }

    &.water {
      background-color: variables.$type-water;
    }

    &.electric {
      background-color: variables.$type-electric;
    }

    &.grass {
      background-color: variables.$type-grass;
    }

    &.ice {
      background-color: variables.$type-ice;
    }

    &.fighting {
      background-color: variables.$type-fighting;
    }

    &.poison {
      background-color: variables.$type-poison;
    }

    &.ground {
      background-color: variables.$type-ground;
    }

    &.flying {
      background-color: variables.$type-flying;
    }

    &.psychic {
      background-color: variables.$type-psychic;
    }

    &.bug {
      background-color: variables.$type-bug;
    }

    &.rock {
      background-color: variables.$type-rock;
    }

    &.ghost {
      background-color: variables.$type-ghost;
    }

    &.dragon {
      background-color: variables.$type-dragon;
    }

    &.dark {
      background-color: variables.$type-dark;
    }

    &.steel {
      background-color: variables.$type-steel;
    }

    &.fairy {
      background-color: variables.$type-fairy;
    }
  }
}
</style>
