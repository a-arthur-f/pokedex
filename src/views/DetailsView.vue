<script lang="ts" setup>
import MainContainer from "@/components/MainContainer.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { onMounted, ref, watch, type CSSProperties } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import { storeToRefs } from "pinia";
import StatsBox from "@/components/StatsBox.vue";

const pokemon = ref<Pokemon>();
const store = usePokedexStore();
const { loading } = storeToRefs(store);

const route = useRoute();
const router = useRouter();

async function fetchPokemon() {
  try {
    loading.value = true;
    const { data: poke } = await axios<Pokemon>(
      "https://pokeapi.co/api/v2/pokemon/" + route.params.id
    );
    pokemon.value = poke;
  } catch (e) {
    console.log(e);
    router.push("/");
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPokemon);
watch(() => route.params.id, fetchPokemon);
</script>

<template>
  <MainContainer v-if="pokemon && !loading">
    <div class="details__container">
      <PokemonCard class="details__pokemon-card" :pokemon="pokemon" />
      <StatsBox :pokemon="pokemon" />
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

    .divider {
      border: 1px solid variables.$bg-input;
    }
  }
}
</style>
