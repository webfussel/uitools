<template>
  <div class="ColorStrip" :style="{ backgroundColor: color, color: contrast}">
    <span v-if="!!name" class="part">{{name}}</span>
    <span v-if="!name" class="part">Base</span>
    <div v-if="!!name" class="part">
      <span class="interactive" @click="event => copy(event, 'color')">{{color}}</span>
      <span class="Tip" :class="{'active': successMessageColor}">Copied!</span>
      <span class="Tip" :class="{'active': failMessageColor}">Couldn't copy :(</span>
    </div>
    <div v-if="!name" class="container">
      <input v-model="currentColor" @change="changeColor()" maxlength="7" />
      <label>
        <Icon :name="name" />
        <input type="color" v-model="currentColor" @change="changeColor()" />
      </label>
    </div>
    <div class="part">
      <span  class="interactive" @click="event => copy(event, 'contrast')">{{contrast}}</span>
      <span class="Tip" :class="{'active': successMessageContrast}">Copied!</span>
      <span class="Tip" :class="{'active': failMessageContrast}">Couldn't copy :(</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string
  color: string
  contrast: string
}

const props = defineProps<Props>()
const emit = defineEmits(['colorChange'])

const currentColor = ref(props.color)

const changeColor = () => {
  emit('colorChange', currentColor.value)
}

const successMessageColor = ref(false)
const failMessageColor = ref(false)
const successMessageContrast = ref(false)
const failMessageContrast = ref(false)
const copy = (event : Event, target : string) => {
  const element = event.target as HTMLElement
  const text = element?.innerText
  useClipbord().copy(text, () => {
    if (target === 'color') {
      successMessageColor.value = true
      setTimeout(() => successMessageColor.value = false, 1000)
    } else {
      successMessageContrast.value = true
      setTimeout(() => successMessageContrast.value = false, 1000)
    }
  }, () => {
    if (target === 'color') {
      failMessageColor.value = true
      setTimeout(() => failMessageColor.value = false, 1000)
    } else {
      failMessageContrast.value = true
      setTimeout(() => failMessageContrast.value = false, 1000)
    }
  })
}
</script>
