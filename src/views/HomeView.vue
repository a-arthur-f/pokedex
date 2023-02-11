<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import Button from "@/components/Button.vue";
import { usePokedexStore } from "../stores/pokedex";
import { storeToRefs } from "pinia";
import PokemonList from "@/components/PokemonList.vue";
import FilterByTypeList from "@/components/FilterByTypeList.vue";

const store = usePokedexStore();

const { pokedex, next, previous, loading } = storeToRefs(store);
const { fetchPokemons } = store;
</script>

<template>
  <MainContainer v-if="!loading" class="home__container">
    <FilterByTypeList />
    <PokemonList :pokemons="pokedex" />
    <div class="home__button-container" v-if="previous || next">
      <Button
        :disabled="!previous"
        @click="fetchPokemons(previous)"
        text="previous"
      />
      <Button :disabled="!next" @click="fetchPokemons(next)" text="next" />
    </div>
  </MainContainer>
</template>

<style lang="scss" scoped>
.home {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__button-container {
    display: flex;
    justify-content: center;
    gap: 4rem;

    button {
      min-width: 126px;
    }
  }
}
</style>
