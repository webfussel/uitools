<template>
  <section clasS="content content-paddings full">
    <IconToolbar v-bind="paletteToolbar" />
    <ChipToolbar headline="Shades" :chips="shades" @remove-chip="removeChip" />
  </section>
</template>

<script setup lang="ts">

const paletteToolbar = {
  headline: 'Palette View',
  icons: [
    {
      name: 'refresh',
      tip: 'Reset Palette',
    },
    {
      name: 'load',
      tip: 'Load palette from storage',
    },
    {
      name: 'save',
      tip: 'Save palette to storage',
    },
    {
      name: 'share',
      tip: 'Share palette',
    },
  ]
}

const shades = ref([-60, -45, -30, -15, 15, 30, 45, 60])

const removeChip = (index : number) => shades.value.splice(index, 1)
</script>
