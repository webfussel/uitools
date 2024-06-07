<template>
  <div class="TabCard z-2">
    <header>
      <button v-for="(tab, index) in tabs" @click="scrollCard(index)" :class="{active : currentScrollable === index}">
        <Icon :name="tab.icon" />
        <span>{{tab.name}}</span>
      </button>
    </header>
    <div class="scrollable">
      <div class="scroll-container" ref="scrollContainer">
        <PaletteColorPalette
            :base-color="baseColor"
            :shades="shades"
            @change-color="changeColor"
        />
        <PaletteCssCode
            :base-color="baseColorToUse"
            :shades="shades"
        />
        <Contrast
            :base-color="baseColorToUse"
            :shades="shades"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Contrast from '~/components/Palette/Contrast.vue'

type Props = {
  baseColor: string
  shades: number[]
}

const props = defineProps<Props>()
const emit = defineEmits(['changeColor'])

const baseColorToUse = ref(props.baseColor)

const currentScrollable = ref(0)
const scrollContainer = ref<HTMLElement | null>()
const scrollCard = (section: number): void => {
  currentScrollable.value = section
  const container = scrollContainer.value!
  container.style.left = `-${100 * section}%`
}

const tabs = [
  {
    icon: 'palette',
    name: 'Palette'
  },
  {
    icon: 'code',
    name: 'Code'
  },
  {
    icon: 'eye',
    name: 'Contrast'
  }
]

const changeColor = (color : string) => {
  baseColorToUse.value = color
  emit('changeColor', color)
}
</script>
