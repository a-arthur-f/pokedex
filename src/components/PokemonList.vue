<script lang="ts" setup>
import PokemonCard from "./PokemonCard.vue";

defineProps<{ pokemons: Pokemon[] }>();
</script>

<template>
  <ul>
    <template v-for="pokemon of pokemons">
      <li v-if="pokemon.sprites.other.home.front_default">
        <RouterLink :to="'/details/' + pokemon.name">
          <PokemonCard :pokemon="pokemon" />
        </RouterLink>
      </li>
    </template>
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

    & > div {
      transition: scale 0.5s;
    }

    & > div:hover {
      scale: (1.05);
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @keyframes teste {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-1rem);
    }
  }
}
</style>
