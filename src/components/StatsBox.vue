<script lang="ts" setup>
defineProps<{ pokemon: Pokemon }>();
function getStatBarStyle(baseStat: number) {
  return {
    width: getStatBarWidth(baseStat),
    backgroundColor: getBarColor(baseStat),
  };
}

function getBarColor(baseStat: number) {
  if (baseStat < 50) return "red";
  if (baseStat < 70) return "yellow";
  return "green";
}

function getStatBarWidth(baseStat: number): string {
  return baseStat < 100 ? `${baseStat}%` : "100%";
}

function decimeterToM(dec: number) {
  return (dec * 10) / 100;
}

function hectogramToKg(hec: number) {
  return hec / 10;
}
</script>

<template>
  <div class="stats-box__container bg-primary">
    <div class="stats-box__weight-height">
      <p>Weight: {{ hectogramToKg(pokemon.weight) }}kg</p>
      <p>Height: {{ decimeterToM(pokemon.height) }}m</p>
    </div>

    <div class="stats-box__divider"></div>

    <ul class="stats-box__stats-list">
      <li class="stats-box__stat" v-for="stat of pokemon.stats">
        <p class="stats-box__stat-name">
          {{ stat.stat.name.replace("-", " ") }}
        </p>
        <p class="stats-box__stat-base">{{ stat.base_stat }}</p>
        <div class="stats-box__stat-bar bg-secondary">
          <div :style="getStatBarStyle(stat.base_stat)"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/variables";
.stats-box {
  &__container {
    box-sizing: border-box;
    height: 100%;
    border-radius: 0.5rem;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
      padding: 2rem 6rem;
      grid-row-start: 1;
    }
  }

  &__pokemon-card {
    @media (min-width: 768px) {
      grid-column-start: 2;
    }
  }

  &__weight-height {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    gap: 4rem;

    p {
      white-space: nowrap;
    }
  }

  &__stats-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 2rem;
  }

  &__stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &-name {
      min-width: 6rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    &-bar {
      height: 0.5rem;
      width: 100%;

      div {
        height: 100%;
        width: 0;
        animation: chargeBar 2s;
      }
    }
  }

  &__divider {
    width: 100%;
    border: 1px solid variables.$bg-secondary;
  }

  @keyframes chargeBar {
    from {
      width: 0;
    }
  }
}
</style>
