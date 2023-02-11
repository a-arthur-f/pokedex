<script lang="ts" setup>
import MainContainer from "@/components/MainContainer.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import EvolutionChain from "@/components/EvolutionChain.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import { storeToRefs } from "pinia";
import StatsBox from "@/components/StatsBox.vue";

const pokemon = ref<Pokemon>();
const evolutionChain = ref<EvolutionChain>();
const store = usePokedexStore();
const { loading } = storeToRefs(store);

const route = useRoute();
const router = useRouter();

onMounted(fetchPokemon);
watch(() => route.params.id, fetchPokemon);

async function fetchPokemon() {
  try {
    loading.value = true;
    const { data: poke } = await axios<Pokemon>(
      "https://pokeapi.co/api/v2/pokemon/" + route.params.id
    );
    pokemon.value = poke;
    const specie = await fetchSpecie();
    evolutionChain.value = await fetchEvolutionChain(specie);
  } catch (e) {
    console.log(e);
    router.push("/");
  } finally {
    loading.value = false;
  }
}

async function fetchEvolutionChain(specie: PokemonSpecie) {
  try {
    const { data: chain } = await axios<EvolutionChain>(
      specie.evolution_chain.url
    );
    return chain;
  } catch (e) {
    throw e;
  }
}

async function fetchSpecie() {
  try {
    const { data: specie } = await axios<PokemonSpecie>(
      "https://pokeapi.co/api/v2/pokemon-species/" + route.params.id
    );

    return specie;
  } catch (e) {
    throw e;
  }
}
</script>

<template>
  <MainContainer v-if="pokemon && evolutionChain && !loading">
    <div class="details__container">
      <PokemonCard class="details__pokemon-card" :pokemon="pokemon" />
      <StatsBox :pokemon="pokemon" />
      <EvolutionChain :evolutionChain="evolutionChain" />
    </div>
  </MainContainer>
</template>

<style lang="scss" scoped>
@use "../assets/variables";
.details {
  &__container {
    display: grid;
    gap: 2rem;
    color: #fff;
    animation-name: load;
    animation-duration: 0.5s;
    grid-template-columns: 100%;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
    }
  }
}
</style>
