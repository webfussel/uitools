<template>
  <section class="CssCode">
    <section class="options">
      <div class="top">
        <div class="button-group">
          <button v-for="s in codeStyles" :key="s" @click="changeCodeStyle(s)" :class="{ active: currentCodeStyle === s }">
            {{s}}
          </button>
        </div>
        <IconButton @click="copy" :icon="{clicked: 'check', base: 'copy'}" :tip="{clicked: 'Copied!', base: 'Copy Code', position: 'left'}" size="2em" />
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
const codeStyles : CodeStyle[] = ['hex', 'HEX', 'rgb']

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
const currentCodeStyle = ref<CodeStyle>('hex')
const changeCodeStyle = (style : CodeStyle) => {
  currentCodeStyle.value = style
  regenerate()
}

watch(() => props.shades, () => {
  regenerate()
})

watch(() => props.baseColor, () => {
  regenerate()
})

const regenerate = () => {
  code.value = generateCSS(currentCodeStyle.value)
}

const copy = () => {
  useClipbord().copy(code.value)
}

</script>
