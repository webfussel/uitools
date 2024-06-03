<template>
  <section clasS="Colors content content-paddings full">
    <Toolbar headline="Palette View" :spread="true">
      <div class="palette-actions">
        <IconButton v-for="icon in paletteActions" v-bind="icon" :key="`Palette-${icon.name}`" />
      </div>
    </Toolbar>
    <Toolbar headline="Shades">
      <InputTextField label="Add Shade" @enterAction="shadeButtonAction.execute()" v-model="shadesField" :action="shadeButtonAction" placeholder="-100 >=< 100">
        <span class="error">{{error}}</span>
      </InputTextField>
      <div class="palette-shades">
        <Chip v-for="(shade, index) in shades" :value="shade" @close="removeChip(index)" />
      </div>
    </Toolbar>
  </section>
</template>

<script setup lang="ts">

import Toolbar from '~/components/Toolbar.vue'

const paletteActions = [
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

const shadesField = ref('')
const shades = ref([-60, -45, -30, -15, 15, 30, 45, 60])

const error = ref('')

const addChip = () => {
  const parsed = +shadesField.value
  if (isNaN(parsed) || parsed < -100 || parsed > 100) {
    error.value = 'Not a valid number!'
    return
  }

  const shadesNew = [...shades.value]
  shadesNew.push(parsed)
  shadesNew.sort((a, b) => a - b)
  shades.value = shadesNew
  shadesField.value = ''
}
const removeChip = (index : number) => shades.value.splice(index, 1)

const shadeButtonAction = {
  show: true,
  icon: 'add',
  execute: () => addChip()
}
</script>
