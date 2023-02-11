<script lang="ts" setup>
import TypeBadge from "./TypeBadge.vue";

defineProps<{ pokemon: Pokemon }>();
function padID(id: number): string | number {
  return id < 999 ? id.toString().padStart(3, "0") : 0;
}
</script>

<template>
  <div :class="'pokemon-card__container bg-' + pokemon.types[0].type.name">
    <figure>
      <img
        :src="pokemon.sprites.other.home.front_default"
        :alt="'image of ' + pokemon.name"
      />
    </figure>
    <p class="pokemon-card__id">#{{ padID(pokemon.id) }}</p>
    <p class="pokemon-card__name">{{ pokemon.name }}</p>

    <ul class="pokemon-card__type-list">
      <li v-for="{ type: pokeType } of pokemon.types">
        <TypeBadge :type="pokeType" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.pokemon-card {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: #fff;
    padding-bottom: 2rem;
    font-weight: 600;

    figure {
      width: 14rem;
      height: 14rem;
      margin-bottom: 2rem;
    }

    img {
      width: 100%;
      height: 100%;
    }

    p {
      text-transform: uppercase;
    }
  }

  &__name {
    font-size: 2rem;
  }

  &__type-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }
}
</style>
