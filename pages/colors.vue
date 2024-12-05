<template>
  <section class="Colors content full">
    <h2 class="content-paddings">Colors</h2>
    <section class="flex-col">
      <article class="Palettes content-paddings flex-col gap-small">
        <PaletteColorPalette :palette="main" />
        <PaletteColorPalette :palette="accent" />
      </article>
      <Preview class="content-paddings" />
    </section>
  </section>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title ?: string) => `${title ? `${title} - ` : ''}Colors`
})

const main = generateColors('#aa0000', [-60, -40, -20, 0, 20, 40, 60])
const accent = generateColors('#00ff00', [-60, -40, -20, 0, 20, 40, 60])
provide('colorMain', main[3])
provide('paletteMain', main)
provide('colorAccent', accent[3])
provide('paletteAccent', accent)
provide('bg', '#fff')

</script>
