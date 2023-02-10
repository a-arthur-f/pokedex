<script lang="ts" setup>
defineProps<{ pokemon: Pokemon }>();
function padID(id: number): string | number {
  return id < 999 ? id.toString().padStart(3, "0") : 0;
}
</script>

<template>
  <li :class="pokemon.types[0].type.name">
    <figure>
      <img
        :src="pokemon.sprites.other.home.front_default"
        :alt="'image of ' + pokemon.name"
      />
    </figure>
    <p>#{{ padID(pokemon.id) }}</p>
    <p>{{ pokemon.name }}</p>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 3rem;
  color: #fff;
  padding-bottom: 1rem;
  font-weight: 600;

  figure {
    width: 16rem;
    height: 16rem;
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
    height: 100%;
  }

  p {
    text-transform: uppercase;
  }
}
</style>
