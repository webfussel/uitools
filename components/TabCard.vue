<template>
  <div class="TabCard z-2">
    <header>
      <div class="top-bar">
        <div class="name" v-if="!renaming">
          <span>{{name}}</span>
          <IconButton
              :icon="{ base: 'edit', clicked: 'check' }"
              :tip="{ base: 'Rename Palette', clicked: 'Renaming...', position: 'right' }"
              @click="startRenaming"
          />
        </div>
        <div class="name" v-else>
          <InputTextField label="New name" v-model="newName" @enterAction="rename" :action="{ label: 'Confirm new name', show: true, icon: 'check', execute: rename }" />
        </div>
        <IconButton :icon="{ base : 'close', clicked: 'check' }" :tip="{ base: 'Delete Palette', clicked: 'Deleted!', position: 'left' }" @click="deleteCard" />
      </div>
      <div class="tab-container">
        <button v-for="(tab, index) in tabs" @click="scrollCard(index)" :class="{active : currentScrollable === index}">
          <Icon :name="tab.icon" />
          <span>{{tab.name}}</span>
        </button>
      </div>
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
            :prefix="prefix"
            @change-prefix="changePrefix"
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
  name: string
  baseColor: string
  prefix: string
  shades: number[]
}

const props = defineProps<Props>()
const emit = defineEmits(['changeColor', 'changePrefix', 'delete', 'rename'])

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

const deleteCard = () => {
  emit('delete')
}

const renaming = ref(false)
const startRenaming = () => renaming.value = true

const newName = ref(props.name)
const rename = () => {
  emit('rename', newName.value)
  renaming.value = false
}

const changePrefix = (prefix : string) => {
  emit('changePrefix', prefix)
}
</script>
