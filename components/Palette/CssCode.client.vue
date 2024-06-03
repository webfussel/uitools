<template>
  <div>
    <button @click="changeCodeStyle('hex')">hex</button>
    <button @click="changeCodeStyle('HEX')">HEX</button>
    <button @click="changeCodeStyle('rgb')">rgb</button>
  </div>
  <section class="CssCode">
    <highlightjs class="width" autodetect :code="code" />
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type CodeStyle = 'hex' | 'HEX' | 'rgb'

type Props = {
  prefix: string
  baseColor: string
  shades: number[]
}

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

    let line = `    --color${props.prefix && `-${props.prefix}`}${shadeName && `-${shadeName}`}: ${col};\n`
    line += `    --color${props.prefix && `-${props.prefix}`}${shadeName && `-${shadeName}`}-contrast: ${colContrast};`
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
  code.value = generateCSS(codeStyle.value)
}
</script>
