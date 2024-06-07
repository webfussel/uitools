<template>
  <section class="Contrast">
    <header class="options">
      <div class="top">
        <select v-model="currentBg">
          <option v-for="bg in bgs" :value="bg">{{bg.name}}</option>
        </select>
        <select v-model="currentShade">
          <option v-for="shade in shades" :value="shade">{{shade}}</option>
        </select>
      </div>
    </header>
    <main>
      <ul class="compliance">
        <li class="compliance-level" v-for="comp in compliance" :class="{pass: comp[1]}">
          <span>{{comp[0]}}</span>
          <span>{{comp[1] ? 'PASS' : 'FAIL'}}</span>
        </li>
      </ul>
      <div class="compliance-components" :style="{ 'background-color': currentBg.color}">
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

const bgs = [
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

const getColorOfShade = () => generateColors(props.baseColor, props.shades)[props.shades.findIndex(shade => shade === currentShade.value)]
const getCompliance = () => Object.entries(checkCompliance(getColorOfShade().color, currentBg.value.color))

const compliance = ref(getCompliance())

watch(currentBg, () => {
  compliance.value = getCompliance()
})

watch(currentShade, () => {
  compliance.value = getCompliance()
})
</script>
