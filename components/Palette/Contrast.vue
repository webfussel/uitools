<template>
  <section class="Contrast">
    <header class="options">
      <div class="top">
        <div class="button-group">
          <button v-for="bg in bgs" :key="bg.name" @click="changeBg(bg)" :class="{ active: currentBg.name === bg.name }">
            {{bg.name}}
          </button>
        </div>
        <InputTextField
          label="Custom Background (hex)"
          v-model="customBg"
        />
      </div>
      <div class="bottom">
        <div class="color-buttons">
          <button
              v-for="(color, index) in generateColors(baseColor, shades)"
              :key="index"
              :style="{background: color.color, '--contrast': color.contrast}"
              :class="{active: currentShade === shades[index]}"
              @click="changeCurrentShade(shades[index])"
          >
            <Icon class="icon" name="check"/>
            <span>{{getShadeName(shades[index])}}</span>
          </button>
        </div>
      </div>
    </header>
    <main>
      <header>
        <span>Contrast based on <a target="_blank" href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">WCAG<Icon name="external"/></a></span>
        <ul class="compliance">
          <li class="compliance-level" v-for="comp in compliance" :class="{pass: comp[1]}">
            <span>{{comp[0]}}:</span>
            <div :style="{color: comp[1] ? 'var(--color-green)' : 'var(--color-red)'}">
              <Icon :name="comp[1] ? 'pass' : 'fail'" />
              <span>{{comp[1] ? 'Pass' : 'Fail'}}</span>
            </div>
          </li>
        </ul>
      </header>
      <div class="compliance-components" :style="{ 'background-color': isHex(customBg) ? `#${customBg}` : currentBg.color}">
        <div>
          <button :style="{'background': getColorOfShade().color, 'color': getColorOfShade().contrast}">
            Some Button
          </button>
        </div>
        <div class="compliance-text">
          <p class="big" :style="{color: getColorOfShade().color}">
            This is some big text
          </p>
          <p :style="{color: getColorOfShade().color}">
            This is some small text
          </p>
        </div>
        <div class="compliance-icons">
          <Icon v-for="icon in icons" :name="icon" :style="{color: getColorOfShade().color}" size="2em" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
type Props = {
  shades: number[]
  baseColor: string
}

const props = defineProps<Props>()

type Bg = {
  name: string
  color: string
}

const bgs : Bg[] = [
  {
    name: 'Dark',
    color: '#333'
  },
  {
    name: 'Light',
    color: '#fff',
  }
]

const icons = ['load', 'share', 'eye', 'picker']

const currentBg = ref(bgs[0])
const currentShade = ref(0)

const customBg = ref('')

const changeBg = (bg: Bg) => currentBg.value = bg
const changeCurrentShade = (shade: number) => currentShade.value = shade

const getColorOfShade = () => {
  const index = props.shades.findIndex(shade => shade === currentShade.value)
  if (index === -1) { currentShade.value = 0 }
  return generateColors(props.baseColor, props.shades)[index > -1 ? index : 0]
}
const getCompliance = () => checkCompliance(getColorOfShade().color, isHex(customBg.value) ? customBg.value : currentBg.value.color)

const compliance = ref(getCompliance())

watch(currentBg, () => {
  compliance.value = getCompliance()
})

watch(currentShade, () => {
  compliance.value = getCompliance()
})

watch(customBg, () => {
  compliance.value = getCompliance()
})
</script>
