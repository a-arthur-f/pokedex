<script lang="ts" setup>
import PokemonCard from "./PokemonCard.vue";

defineProps<{ pokemons: Pokemon[] }>();
</script>

<template>
  <ul>
    <li v-for="pokemon of pokemons">
      <RouterLink :to="'/details/' + pokemon.name">
        <PokemonCard :pokemon="pokemon" />
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  gap: 2rem;
  animation-name: load;
  animation-duration: 0.5s;
  list-style: none;

  a {
    all: unset;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
