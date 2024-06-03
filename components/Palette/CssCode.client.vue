<template>
  <section class="CssCode">
    <section class="options">
      <div class="style-buttons">
        <button @click="changeCodeStyle('hex')">hex</button>
        <button @click="changeCodeStyle('HEX')">HEX</button>
        <button @click="changeCodeStyle('rgb')">rgb</button>
      </div>
      <InputTextField label="Prefix" v-model="prefix" @change="regenerate" />
      <IconButton name="copy" tip="Copy Code" height="2em" />
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
    const shadeName = getShadeName(props.shades[index])

    const col = getCodeStyle(color.color, codeStyle)
    const colContrast = getCodeStyle(color.contrast, codeStyle)

    let line = `    --color${prefix.value && `-${prefix.value}`}${shadeName && `-${shadeName}`}: ${col};\n`
    line += `    --color${prefix.value && `-${prefix.value}`}${shadeName && `-${shadeName}`}-contrast: ${colContrast};`
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

const regenerate = () => {
  code.value = generateCSS(codeStyle.value)
}

</script>
