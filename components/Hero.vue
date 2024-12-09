<template>
  <section class="Hero full-width">
    <div ref="grid" aria-hidden="true" class="grid-container" :style="{ '--rows': rows, '--cols': cols, '--cell-size': cellSize + 'px' }">
      <div v-for="row in rows" class="grid-row">
        <div v-for="col in cols" class="cell" />
      </div>
    </div>
    <div class="hero-content small-max-width">
      <slot name="content" />
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = ref(15)
const cols = ref(0)
const grid = ref<HTMLElement>()
const cellSize = 50

const resizeObserver = new ResizeObserver(([gridContainer]) => {
  cols.value = Math.ceil(gridContainer.contentRect.width / cellSize)
})

onMounted(() => {
  resizeObserver.observe(grid.value!)
})

onUnmounted(() => {
  resizeObserver.disconnect()
})


</script>

<style scoped>
.grid-container {
  --border: var(--hero-line);

  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-rows: repeat(var(--rows), var(--cell-size));
  overflow: hidden;
}

.grid-row {
  display: flex;
  flex-direction: row;

  & > .cell:first-child {
    border-left: var(--border);
  }

  & > .cell {
    flex: 1 1 50px;
    border-left: var(--border);
    border-bottom: var(--border);
  }
}

.cell {
  width: 100%;
  height: 100%;
  background: var(--color-background);
  transition: background 400ms;

  &:hover {
    background: var(--color-main-light);
    transition: background 50ms;
  }
}

.hero-content {
  z-index: 10;
  margin: 4rem 0;
  padding: 2rem;
}
</style>