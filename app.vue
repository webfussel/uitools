<template>
  <div class="App" :style="{
    background: background.hex,
    color: text.hex,
    '--color-main': main.hex,
    '--color-accent': accent.hex,
    '--color-info': info.hex,
    '--color-success': success.hex,
    '--color-warning': warning.hex,
    '--color-error': error.hex,
    '--color-main-contrast': main.contrast,
    '--color-accent-contrast': accent.contrast,
    '--color-info-contrast': info.contrast,
    '--color-success-contrast': success.contrast,
    '--color-warning-contrast': warning.contrast,
    '--color-error-contrast': error.contrast,
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

const generateFromColor = (color: string, name: string) : Color => ({
  name,
  hex: color,
  rgb: hexToRgb(color),
  contrast: generateContrast(color),
})

const backgroundInit = '#ffffff'
const textInit = '#2d2d2b'
const mainInit = '#174951'
const accentInit = '#1d5d69'
const infoInit = '#0984e3'
const successInit = '#00b894'
const warningInit = '#fdcb6e'
const errorInit = '#d63031'

const background = ref<Color>(generateFromColor(backgroundInit, 'Background'))
const text = ref<Color>(generateFromColor(textInit, 'Text'))
const main = ref<Color>(generateFromColor(mainInit, 'Main'))
const accent = ref<Color>(generateFromColor(accentInit, 'Accent'))
const info = ref<Color>(generateFromColor(infoInit, 'Info'))
const success = ref<Color>(generateFromColor(successInit, 'Success'))
const warning = ref<Color>(generateFromColor(warningInit, 'Warning'))
const error = ref<Color>(generateFromColor(errorInit, 'Error'))

provide('colorBackground', background)
provide('colorText', text)
provide('colorMain', main)
provide('colorAccent', accent)
provide('colorInfo', info)
provide('colorSuccess', success)
provide('colorWarning', warning)
provide('colorError', error)

const createWatcher = (ref : Ref<Color>) => {
  watch(() => ref.value.hex, () => {
    ref.value.contrast = generateContrast(ref.value.hex)
    ref.value.rgb = hexToRgb(ref.value.hex)
  })
}

createWatcher(background)
createWatcher(text)
createWatcher(main)
createWatcher(accent)
createWatcher(info)
createWatcher(success)
createWatcher(warning)
createWatcher(error)

</script>

<style scoped>
.App {
  min-height: 100dvh;
}
</style>
