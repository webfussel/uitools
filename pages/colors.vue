<template>
  <section clasS="Colors content content-paddings full">
    <Toolbar headline="Palette View" :spread="true">
      <div class="palette-actions">
        <IconButton
            v-for="(icon, index) in paletteActions"
            v-bind="icon"
            @click="paletteActions[index].action()"
            :key="`Palette-${icon.name}`"
        />
      </div>
    </Toolbar>
    <Toolbar headline="Shades">
      <InputTextField label="Add Shade" @enterAction="shadeButtonAction.execute()" v-model="shadesField" :action="shadeButtonAction" placeholder="-100 >=< 100">
        <span class="error">{{error}}</span>
      </InputTextField>
      <div class="palette-shades">
        <Chip v-for="(shade, index) in shades" :key="`Shade-${shade}`" :value="shade" @close="removeChip(index)" />
      </div>
    </Toolbar>

    <div class="grid">
      <TabCard
          v-for="(palette, index) in palettes"
          :key="palette.baseColor"
          :base-color="palette.baseColor"
          :shades="getShadesWithZero(shades)"
          @change-color="color => changeColor(color, index)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
type Palette = {
  name: string
  baseColor: string
}

const storageKey = 'uitools_palette'
const newPaletteName = ref('')
const newPaletteColor = ref('')

const shadesField = ref(0)
const shades = ref([-60, -45, -30, -15, 15, 30, 45, 60])

let palettesToSave : Palette[] = []
const palettes = ref<Palette[]>([])

onMounted(() => {
  const url = new URL(location.href)
  const data = url.searchParams.get('data')
  if (!!data) {
    try {
      const decoded = atob(data)
      const loaded = JSON.parse(decoded)
      shades.value = loaded.shades
      palettes.value = loaded.palettes as Palette[]
      palettesToSave = loaded.palettes as Palette[]
    } catch (e) {
      generateRandom()
    }
  } else {
    useStorage().get(storageKey).shades ? loadFromStorage() : generateRandom()
  }
})

const changeColor = (color : string, paletteIndex : number) => {
  palettesToSave[paletteIndex].baseColor = color
}

const generateRandom = () => {
  shades.value = [-60, -45, -30, -15, 15, 30, 45, 60]
  const pals = [{
    name: 'Some Fancy Color',
    baseColor: generateRandomColor()
  }]
  palettes.value = pals
  palettesToSave = pals
}

const generateRandomColor = () => {
  const single = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  return `#${single()}${single()}${single()}`
}

const loadFromStorage = () => {
  const storage = useStorage().get(storageKey)
  if (storage.shades) {
    shades.value = storage.shades
    palettes.value = storage.palettes
    palettesToSave = storage.palettes
  }
}

const saveToStorage = () => {
  const newLocalStorage = generateDataString()
  useStorage().set(storageKey, newLocalStorage)
}

const generateDataString = () => JSON.stringify({
  shades: shades.value,
  palettes: palettesToSave
})

const generateUrl = () => {
  const base64 = btoa(generateDataString())
  const loc = location.toString()
  const url = `${loc.includes('?') ? loc.substring(0, loc.indexOf('?')) : loc}?data=${base64}`
  useClipbord().copy(url)
}

const paletteActions = [
  {
    name: 'refresh',
    tip: 'Reset Palette',
    action: generateRandom,
  },
  {
    name: 'load',
    tip: 'Load palette from storage',
    action: loadFromStorage,
  },
  {
    name: 'save',
    tip: 'Save palette to storage',
    action: saveToStorage,
  },
  {
    name: 'share',
    tip: 'Share palette',
    action: generateUrl,
  },
]

const error = ref('')

const addChip = () => {
  const parsed = +shadesField.value
  if (isNaN(parsed) || parsed < -100 || parsed > 100) {
    error.value = 'Not a valid number!'
    return
  }

  if (shades.value.includes(parsed)) {
    error.value = 'Already added!'
    return
  }

  if (parsed === 0) {
    error.value = '0 is Base Color!'
    return
  }

  const shadesNew = [...shades.value]
  shadesNew.push(parsed)
  shadesNew.sort((a, b) => a - b)
  shades.value = sortShades(shadesNew)
  shadesField.value = 0
}
const removeChip = (index : number) => shades.value.splice(index, 1)

const shadeButtonAction = {
  show: true,
  icon: 'add',
  execute: () => addChip()
}
</script>
