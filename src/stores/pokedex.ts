import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import config from "../config/config.json";

export const usePokedexStore = defineStore("pokedex", () => {
  const pokedex = ref<Pokemon[]>([]);
  const count = ref(0);
  const next = ref("");
  const previous = ref("");
  const loading = ref(false);

  async function fetchPokemons(url: string) {
    try {
      loading.value = true;
      const {
        results: pokemons,
        count: total,
        next: nextUrl,
        previous: previousUrl,
      } = (await axios<FetchData>(url)).data;

      count.value = total;
      next.value = nextUrl;
      previous.value = previousUrl;
      pokedex.value = [];

      await setPokedex(pokemons);
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchPokemonsByType(url: string) {
    try {
      loading.value = true;
      const { pokemon: pokemons } = (await axios<FetchDataByType>(url)).data;

      next.value = "";
      previous.value = "";
      pokedex.value = [];

      await setPokedex(pokemons);
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }

  async function setPokedex(pokemons: NamedApiResource[] | PokemonList[]) {
    if (isNameResourceList(pokemons)) {
      for (const p of pokemons) {
        const { data: pokemon } = await axios<Pokemon>(p.url);
        pokedex.value = [...pokedex.value, pokemon];
      }
    } else {
      for (const p of pokemons) {
        const { data: pokemon } = await axios<Pokemon>(p.pokemon.url);
        pokedex.value = [...pokedex.value, pokemon];
      }
    }
  }

  function isNameResourceList(
    pokemons: NamedApiResource[] | PokemonList[]
  ): pokemons is NamedApiResource[] {
    return (pokemons as NamedApiResource[])[0].name !== undefined;
  }

  onMounted(() => fetchPokemons(`${config.baseUrl}/pokemon?limit=21`));

  return {
    pokedex,
    previous,
    next,
    fetchPokemons,
    fetchPokemonsByType,
    loading,
  };
});

interface FetchData {
  count: number;
  next: string;
  previous: string;
  results: NamedApiResource[];
}

interface FetchDataByType {
  pokemon: PokemonList[];
  id: number;
}

type PokemonList = { pokemon: NamedApiResource };
