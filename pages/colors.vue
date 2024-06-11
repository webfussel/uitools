<template>
  <section class="Colors content content-paddings full">
    <Toolbar headline="Palette View" :spread="true">
      <template #top>
        <div class="palette-actions">
          <IconButton
              v-for="(icon, index) in paletteActions"
              v-bind="icon"
              @click="paletteActions[index].action()"
              :key="`Palette-${icon.tip.base}`"
          />
        </div>
      </template>
    </Toolbar>
    <Toolbar headline="Shades" :spread="true">
      <template #top>
        <InputTextField label="Add Shade" @enterAction="shadeButtonAction.execute()" v-model="shadesField" :action="shadeButtonAction" placeholder="-100 >=< 100">
          <span class="error">{{shadesMessage}}</span>
        </InputTextField>
      </template>
      <template #bottom>
        <div class="palette-shades">
          <Chip v-for="(shade, index) in shades" :key="`Shade-${shade}`" :value="shade" @close="removeChip(index)" />
        </div>
      </template>
    </Toolbar>

    <div class="grid">
      <TabCard
          v-for="(palette, index) in palettes"
          :key="palette.baseColor"
          :base-color="palette.baseColor"
          :shades="getShadesWithZero(shades)"
          :name="palette.name"
          :prefix="palette.prefix"
          @delete="deleteCard(index)"
          @rename="(name : string) => renameCard(name, index)"
          @change-color="(color : string) => changeColor(color, index)"
          @change-prefix="(prefix : string) => changePrefix(prefix, index)"
      />
      <div class="new-card z-1">
        <header>
          <span>Add new color</span>
        </header>
        <main>
          <InputTextField
              label="Color name"
              v-model="newColorName"
              @enterAction="addNewColor"
          />
          <input type="color" v-model="newColorValue" />
        </main>
        <button class="Button primary z-2" @click="addNewColor">Add Color</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title ?: string) => `${title ? `${title} - ` : ''}Colors`
})

type Palette = {
  name: string
  baseColor: string
  prefix: string
}

const storageKey = 'uitools_palette'
const shadesField = ref(0)
const shades = ref([-60, -45, -30, -15, 15, 30, 45, 60])

let palettesToSave : Palette[] = []
const palettes = ref<Palette[]>([])

onMounted(() => {
  try {
    const url = new URL(location.href)
    const data = url.searchParams.get('data')
    if (!!data) {
      const decoded = atob(data)
      const loaded = JSON.parse(decoded)
      shades.value = loaded.shades
      palettes.value = loaded.palettes as Palette[]
      palettesToSave = loaded.palettes as Palette[]
    } else {
      useStorage().get(storageKey).shades ? loadFromStorage() : generateRandom()
    }
  } catch (e) {
    generateRandom()
  }
})

const changeColor = (color : string, paletteIndex : number) => {
  palettesToSave[paletteIndex].baseColor = color
}

const changePrefix = (prefix : string, paletteIndex : number) => {
  palettesToSave[paletteIndex].prefix = prefix
}

const generateRandom = () => {
  shades.value = [-60, -45, -30, -15, 15, 30, 45, 60]
  const pals = [{
    name: 'Some Fancy Color',
    baseColor: generateRandomColor(),
    prefix: '',
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
  palettes: palettesToSave,
})

const generateUrl = () => {
  const base64 = btoa(generateDataString())
  const loc = location.toString()
  const url = `${loc.includes('?') ? loc.substring(0, loc.indexOf('?')) : loc}?data=${base64}`
  useClipbord().copy(url)
}

const paletteActions = [
  {
    icon: {
      base: 'refresh',
      clicked: 'check',
    },
    tip: {
      base: 'Reset Palette',
      clicked: 'Reset done!'
    },
    action: generateRandom,
  },
  {
    icon: {
      base: 'load',
      clicked: 'check',
    },
    tip: {
      base: 'Load palette from storage',
      clicked: 'Loaded!'
    },
    action: loadFromStorage,
  },
  {
    icon: {
      base: 'save',
      clicked: 'check',
    },
    tip: {
      base: 'Save palette to storage',
      clicked: 'Saved!'
    },
    action: saveToStorage,
  },
  {
    icon: {
      base: 'share',
      clicked: 'check',
    },
    tip: {
      base: 'Copy share link',
      clicked: 'Copied link!'
    },
    action: generateUrl,
  },
]

const shadesMessage = ref('')

const addChip = () => {
  const parsed = +shadesField.value
  if (isNaN(parsed) || parsed < -100 || parsed > 100) {
    shadesMessage.value = 'Not a valid number!'
    return
  }

  if (shades.value.includes(parsed)) {
    shadesMessage.value = 'Already added!'
    return
  }

  if (parsed === 0) {
    shadesMessage.value = '0 is Base Color!'
    return
  }

  const shadesNew = [...shades.value]
  shadesNew.push(parsed)
  shadesNew.sort((a, b) => a - b)
  shades.value = sortShades(shadesNew)
  shadesField.value = 0
  shadesMessage.value = ''
}
const removeChip = (index : number) => shades.value.splice(index, 1)

const shadeButtonAction = {
  show: true,
  icon: 'add',
  execute: addChip
}

const deleteCard = (index : number) => {
  // palettesToSave.splice(index, 1)
  palettes.value.splice(index, 1)
}

const renameCard = (name : string, index : number) => {
  palettes.value[index].name = name
  palettesToSave[index].name = name
}

const newColorName = ref('')
const newColorValue = ref(generateRandomColor())

const addNewColor = () => {
  const addNew = {
    name: newColorName.value,
    baseColor: newColorValue.value,
    prefix: '',
  }
  palettes.value.push(addNew)

  newColorName.value = ''
  newColorValue.value = ''
}
</script>
