<template>
  <div class="ColorStrip" :style="{ backgroundColor: color, color: contrast}">
    <span v-if="!!name" class="part">{{name}}</span>
    <span v-if="!name" class="part">Base</span>
    <div v-if="!!name" class="part interactive" @click="event => copy(event)">
      <span>{{color}}</span>
      <span v-if="successMessage">Copied!</span>
      <span v-if="failMessage">Couldn't copy :(</span>
    </div>
    <div v-if="!name" class="container">
      <input v-model="currentColor" @change="changeColor()" maxlength="7" />
      <label>
        <Icon :name="name" />
        <input type="color" v-model="currentColor" @change="changeColor()" />
      </label>
    </div>
    <div class="part interactive" @click="event => copy(event)">
      <span>{{contrast}}</span>
      <span v-if="successMessage">Copied!</span>
      <span v-if="failMessage">Couldn't copy :(</span>
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

const successMessage = ref(false)
const failMessage = ref(false)
const copy = (event : Event) => {
  const element = event.target as HTMLElement
  const text = element?.innerText
  useClipbord().copy(text, () => {
    successMessage.value = true
    setTimeout(() => successMessage.value = false, 1000)
  }, () => {
    failMessage.value = true
    setTimeout(() => failMessage.value = false, 1000)
  })
}
</script>
