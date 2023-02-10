<template>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 1rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 4rem;
  }
}
</style>
