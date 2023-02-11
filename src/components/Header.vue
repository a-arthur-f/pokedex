<script lang="ts" setup>
import PokeballIcon from "./icons/PokeballIcon.vue";
import { usePokedexStore } from "@/stores/pokedex";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import config from "../config/config.json";

const store = usePokedexStore();
const { loading } = storeToRefs(store);
const { fetchPokemons } = store;
const searchValue = ref("");
const router = useRouter();

function onSubmit() {
  if (!searchValue.value) return;
  router.push("/details/" + searchValue.value);
  searchValue.value = "";
}
</script>

<template>
  <header>
    <RouterLink to="/">
      <img
        src="../assets/img/pokemon-png-logo.webp"
        class="logo"
        @click="fetchPokemons(`${config.baseUrl}/pokemon?limit=21`)"
      />
    </RouterLink>

    <form @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="search by name or id"
        v-model="searchValue"
      />

      <button type="submit" :class="loading ? 'loading' : ''">
        <PokeballIcon />
      </button>
    </form>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/variables";

header {
  display: grid;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: variables.$bg-header;
  color: white;
  column-gap: 2rem;
  z-index: 999;

  .logo {
    width: 16rem;
    display: none;
  }

  form {
    align-self: center;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    input {
      all: unset;
      width: 100%;
      height: 2.5rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background-color: variables.$bg-input;
      color: #fff;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      svg {
        width: 4rem;
        height: 4rem;
      }
    }
  }

  .loading {
    animation-name: loading;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;

    .logo {
      display: block;
    }
    padding: 0.5rem 4rem;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
