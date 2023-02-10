<script lang="ts" setup>
defineProps<{ text: string; disabled?: boolean }>();
</script>
<template>
  <button :disabled="disabled">{{ text }}</button>
</template>

<style lang="scss" scoped>
@use "../assets/variables";
button {
  all: unset;
  background-color: variables.$button;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 300;
  transition: all 0.5s;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    background-color: variables.$button-hover;
  }

  &:disabled {
    background-color: variables.$button-disabled;
    cursor: default;
  }
}
</style>
