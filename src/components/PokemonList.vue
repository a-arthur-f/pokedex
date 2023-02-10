<script lang="ts" setup>
import PokemonCard from "./PokemonCard.vue";

defineProps<{ pokemons: Pokemon[] }>();
</script>

<template>
  <ul>
    <PokemonCard v-for="pokemon of pokemons" :pokemon="pokemon" />
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

@keyframes load {
  from {
    opacity: 0;
    gap: 0;
  }
  to {
    opacity: 1;
    gap: 2rem;
  }
}
</style>
