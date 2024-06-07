<template>
  <section class="ColorPalette">
    <div class="colors">
      <PaletteColorStrip
          v-for="(color, index) of generateColors(baseColorToUse, shades)"
          :key="index"
          :color="color.color"
          :contrast="color.contrast"
          :name="getShadeName(shades[index])"
          @color-change="changeColor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type Props = {
  shades: number[]
  baseColor: string
}
const props = defineProps<Props>()
const emit = defineEmits(['changeColor'])

const baseColorToUse = ref(props.baseColor)
const changeColor = (color: string) => {
  baseColorToUse.value = color
  emit('changeColor', color)
}

</script>
