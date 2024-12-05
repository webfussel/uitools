<template>
  <section class="CssCode">
    <div class="code-wrapper">
      <Shiki lang="css" :code="code" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type CodeStyle = 'hex' | 'HEX' | 'rgb'
const codeStyles : CodeStyle[] = ['hex', 'HEX', 'rgb']

type Props = {
  prefix: string
}

const props = defineProps<Props>()
const emit = defineEmits(['codeChange', 'changePrefix'])

const baseColor = inject<Ref<string>>('baseColor')!
const shades = inject<Ref<number[]>>('shades')!

const prefix = ref(props.prefix)

const getCodeStyle = (color : string, style : CodeStyle) => {
  switch (style) {
    case 'hex': return color
    case 'HEX': return color.toUpperCase()
    case 'rgb': return `rgb(${hexToRgb(color).join(', ')})`
    default: return color
  }
}

const generateCSS = (codeStyle : CodeStyle) : string => {
  const colors = generateColors(baseColor.value, shades.value)
  let ret = ':root {\n'
  ret += colors.map((color, index) => {
    const shadeName = getShadeName(shades.value[index]).toLowerCase()

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

watch(() => shades.value, () => {
  regenerate()
})

watch(() => baseColor.value, () => {
  regenerate()
})

const regenerate = () => {
  code.value = generateCSS(currentCodeStyle.value)
}

const copy = () => {
  useClipbord().copy(code.value)
}

const changePrefix = () => {
  emit('changePrefix', prefix.value)
}

</script>
