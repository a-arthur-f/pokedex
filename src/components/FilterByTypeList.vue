<script lang="ts" setup>
import TypeBadge from "./TypeBadge.vue";
import { usePokedexStore } from "@/stores/pokedex";
import config from "../config/config.json";

const store = usePokedexStore();
const { fetchPokemonsByType } = store;

const types: string[] = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
</script>

<template>
  <ul>
    <li v-for="pokeType of types">
      <TypeBadge
        @click="fetchPokemonsByType(`${config.baseUrl}/type/${pokeType}`)"
        :type="pokeType"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  width: 100%;
  overflow-x: scroll;
  padding: 0.5rem;
  display: flex;
  list-style: none;
  gap: 1rem;

  li {
    cursor: pointer;
  }
}
</style>
