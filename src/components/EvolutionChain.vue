<script lang="ts" setup>
import axios from "axios";
import PokemonList from "./PokemonList.vue";
import { onMounted, ref, toRefs } from "vue";
import config from "../config/config.json";

const props = defineProps<{ evolutionChain: EvolutionChain }>();
const { evolutionChain } = toRefs(props);
const pokeList = ref<Pokemon[]>();

onMounted(async () => {
  pokeList.value = await chainToPokeList();
});

async function chainToPokeList() {
  const chainList: Array<Pokemon> = [];
  const { data: pokemon } = await axios<Pokemon>(
    `${config.baseUrl}/pokemon/${evolutionChain.value.chain.species.name}`
  );

  chainList.push(pokemon);
  chainList.push(...(await recursive(evolutionChain.value.chain.evolves_to)));

  pokeList.value = chainList;

  async function recursive(chainLink: ChainLink[]) {
    try {
      const evolutionCahin: Pokemon[] = [];
      if (chainLink.length === 0) return [];
      for (let e of chainLink) {
        const { data: pokemon } = await axios<Pokemon>(
          `${config.baseUrl}/pokemon/${e.species.name}`
        );

        evolutionCahin.push(pokemon);
        evolutionCahin.push(...(await recursive(e.evolves_to)));
      }

      return evolutionCahin;
    } catch (e) {
      throw e;
    }
  }

  return chainList;
}
</script>

<template>
  <div class="evolution-chain__container bg-secondary" v-if="pokeList">
    <p class="evolution-chain__title">Evolution chain</p>
    <PokemonList :pokemons="pokeList" />
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/variables";
.evolution-chain {
  &__container {
    padding: 2rem 2rem;
    border-radius: 0.5rem;

    @media (min-width: 768px) {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  &__title {
    text-transform: uppercase;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
}
</style>
