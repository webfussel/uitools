<template>
  <section class="ColorPalette">
    <div class="colors">
      <PaletteColorStrip
          v-for="(color, index) of palette"
          :key="index"
          :color="color.value"
          :contrast="color.contrast"
          :name="color.name"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

type Props = {
  palette: Color[]
}

defineProps<Props>()

</script>

<style scoped>
.ColorPalette {
  & .colors {
    display: flex;
    flex-direction: row;
    border-radius: 0.5rem;
    overflow: hidden;

    & .ColorStrip {
      flex: 1;
    }
  }
}
</style>
