<template>
  <section class="ColorPalette">
    <div class="colors">
      <PaletteColorStrip
          v-for="(color, index) of generateColors(baseColor, shades)"
          :key="index"
          :color="color.color"
          :contrast="color.contrast"
          :name="getShadeName(shades[index])"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

const baseColor = inject<Ref<string>>('baseColor')!
const shades = inject<Ref<number[]>>('shades')!
</script>
