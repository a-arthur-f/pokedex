<template>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 2rem 1rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 2rem 4rem;
  }
}
</style>
