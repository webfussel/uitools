<template>
  <section class="ColorPalette">
    <section class="options">
      <div class="top">
        <div />
        <IconButton :name="grid ? 'stripes' : 'grid'" tip="Change View" height="2em" @click="changeView" />
      </div>
    </section>
    <div class="colors" :class="{ rows: !grid }">
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

const grid = ref(false)
const changeView = () => grid.value = !grid.value

const baseColorToUse = ref(props.baseColor)
const changeColor = (color: string) => {
  baseColorToUse.value = color
  emit('changeColor', color)
}

</script>
