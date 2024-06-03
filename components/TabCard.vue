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
            :shades="shades"
            :base-color="baseColor"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  baseColor: string
  shades: number[]
}

defineProps<Props>()
const emit = defineEmits(['changeColor'])

const currentScrollable = ref(0)
const scrollContainer = ref<HTMLElement | null>()
const scrollCard = (section: number): void => {
  currentScrollable.value = section
  const container = scrollContainer.value!
  const parent = container.parentElement!

  const width = parent.getBoundingClientRect().width

  container.style.left = `-${width * section}px`
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
    name: 'Examples'
  }
]

const changeColor = (color : string) => emit('changeColor', color)
</script>
