<template>
  <div class="App" :style="{
    background: page.value,
    color: page.contrast
  }">
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

useHead({
  title: 'UI Tools'
})

// const main = ref<Color[]>(generateColors('#736c8e', [-60, -40, -20, 0, 20, 40, 60]))
// const accent = ref<Color[]>(generateColors('#607e97', [-60, -40, -20, 0, 20, 40, 60]))

const generateFromColor = (color: string, name: string) => ({
  name,
  value: color,
  contrast: generateContrast(color),
})

const mainInit = '#174951'
const accentInit = '#1d5d69'
const infoInit = '#0984e3'
const successInit = '#00b894'
const warningInit = '#fdcb6e'
const errorInit = '#d63031'

const main = ref<Color>(generateFromColor(mainInit, 'Main'))
const accent = ref<Color>(generateFromColor(accentInit, 'Accent'))
const info = ref<Color>(generateFromColor(infoInit, 'Info'))
const success = ref<Color>(generateFromColor(successInit, 'Success'))
const warning = ref<Color>(generateFromColor(warningInit, 'Warning'))
const error = ref<Color>(generateFromColor(errorInit, 'Error'))

const page = ref<Color>(lightTheme)

provide('colorMain', main)
provide('colorAccent', accent)
provide('colorInfo', info)
provide('colorSuccess', success)
provide('colorWarning', warning)
provide('colorError', error)
provide('page', page)

watch(() => main.value.value, () => main.value.contrast = generateContrast(main.value.value))
watch(() => accent.value.value, () => accent.value.contrast = generateContrast(accent.value.value))
</script>
