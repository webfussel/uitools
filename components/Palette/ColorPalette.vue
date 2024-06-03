<template>
  <section class="ColorPalette" :class="{ rows: !grid}">
    <PaletteColorStrip
        v-for="(color, index) of generateColors(baseColor, shades)"
        :color="color.color"
        :contrast="color.contrast"
        :name="getShadeName(shades[index])"
        @color-change="changeColor"
    />
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type Props = {
  grid: boolean
  shades: number[]
  baseColor: string
}
const props = defineProps<Props>()
const emit = defineEmits(['changeColor'])

const changeColor = (data: string) => {
  emit('changeColor', data)
}

</script>
