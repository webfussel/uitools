<template>
  <div class="App" :style="{
    background: background.hex,
    color: text.hex,
    '--hero-line': `1px solid rgba(${main.rgb.join(',')}, .1)`,
    '--color-main-hover': isDarkBg ? main.light : main.dark,
    '--color-main-hover-contrast': isDarkBg ? main.contrastLight : main.contrastDark,
    '--color-accent-hover': isDarkBg ? main.light : main.dark,
    '--color-accent-hover-contrast': isDarkBg ? main.contrastLight : main.contrastDark,
    ...generateVariables(
        background, text, main, accent, info, success, warning, error
    ),
  }">
    <Header />
    <SectionColors />
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
  get dark () { return generateShade(this.hex, -20) },
  get light () { return generateShade(this.hex, 60) },
  get rgb () { return hexToRgb(this.hex)},
  get contrast () { return generateContrast(this.hex) },
  get contrastDark () { return generateContrast(this.dark) },
  get contrastLight () { return generateContrast(this.light) },
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

const isDarkBg = ref(false)
provide('isDarkBg', isDarkBg)

watch(background.value, () => {
  isDarkBg.value = background.value.contrast === '#ffffff'
})

const generateVariables = (...colors : Color[]) => colors.reduce<Record<string, string>>((result, color) => {
  const low = color.name.toLowerCase()
  result[`--color-${low}`] = color.hex
  result[`--color-${low}-contrast`] = color.contrast
  result[`--color-${low}-dark`] = color.dark
  result[`--color-${low}-dark-contrast`] = color.contrastDark
  result[`--color-${low}-light`] = color.light
  result[`--color-${low}-light-contrast`] = color.contrastLight
  return result
}, {} as Record<string, string>)

</script>

<style scoped>
.App {
  min-height: 100dvh;
}
</style>
