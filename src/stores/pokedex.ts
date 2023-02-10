import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const usePokedexStore = defineStore("pokedex", () => {
  const pokedex = ref<Pokemon[]>([]);
  const count = ref(0);
  const next = ref("");
  const previous = ref("");

  async function fetchPokemons(url: string) {
    try {
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

      for (let p of pokemons) {
        const { data: pokemon } = await axios<Pokemon>(p.url);
        pokedex.value = [...pokedex.value, pokemon];
      }
    } catch (e) {
      console.log(e);
    }
  }

  onMounted(() => fetchPokemons("https://pokeapi.co/api/v2/pokemon?limit=21"));

  return { pokedex, previous, next, fetchPokemons };
});

interface FetchData {
  count: number;
  next: string;
  previous: string;
  results: NamedApiResource[];
}
