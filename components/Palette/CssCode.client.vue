<template>
  <section class="CssCode">
    <section class="options">
      <div class="top">
        <div class="button-group">
          <button @click="changeCodeStyle('hex')">hex</button>
          <button @click="changeCodeStyle('HEX')">HEX</button>
          <button @click="changeCodeStyle('rgb')">rgb</button>
        </div>
        <IconButton @click="copy" :name="copying ? 'check' : 'copy'" :tip="copying ? 'Copied!' : 'Copy Code'" size="2em" />
      </div>
      <InputTextField label="Prefix" v-model="prefix" @change="regenerate" />
    </section>
    <div class="code-wrapper">
      <highlightjs class="width" autodetect :code="code" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type CodeStyle = 'hex' | 'HEX' | 'rgb'

type Props = {
  baseColor: string
  shades: number[]
}

const prefix = ref('primary')
const props = withDefaults(defineProps<Props>(), {
  shades: () => [],
})
const emit = defineEmits(['codeChange'])

const getCodeStyle = (color : string, style : CodeStyle) => {
  switch (style) {
    case 'hex': return color
    case 'HEX': return color.toUpperCase()
    case 'rgb': return `rgb(${hexToRgb(color).join(', ')})`
    default: return color
  }
}

const generateCSS = (codeStyle : CodeStyle) : string => {
  const colors = generateColors(props.baseColor, props.shades)
  let ret = ':root {\n'
  ret += colors.map((color, index) => {
    const shadeName = getShadeName(props.shades[index]).toLowerCase()

    const col = getCodeStyle(color.color, codeStyle)
    const colContrast = getCodeStyle(color.contrast, codeStyle)

    let line = `    --color${prefix.value && `-${prefix.value}`}${shadeName !== 'base' ? `-${shadeName}` : ''}: ${col};\n`
    line += `    --color${prefix.value && `-${prefix.value}`}${shadeName !== 'base' ? `-${shadeName}` : ''}-contrast: ${colContrast};`
    return line
  }).join('\n')
  ret += '\n}'
  emit('codeChange', ret)
  return ret
}

const code = ref(generateCSS('hex'))
const codeStyle = ref<CodeStyle>('hex')
const changeCodeStyle = (style : CodeStyle) => {
  codeStyle.value = style
  regenerate()
}

watch(() => props.shades, () => {
  regenerate()
})

const regenerate = () => {
  code.value = generateCSS(codeStyle.value)
}

const copying = ref(false)
const copy = () => {
  copying.value = true
  useClipbord().copy(code.value, () => {
    setTimeout(() => {
      copying.value = false
    }, 1000)
  })
}

</script>
