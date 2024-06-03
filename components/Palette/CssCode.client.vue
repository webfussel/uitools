<template>
  <section class="CssCode">
    <highlightjs class="width" autodetect :code="generateCSS()" />
  </section>
</template>

<script setup lang="ts">
import { getShadeName } from '~/composables/color'

type Props = {
  type: 'hex' | 'HEX' | 'rgb'
  prefix: string
  baseColor: string
  shades: number[]
}

const props = withDefaults(defineProps<Props>(), {
  shades: () => [],
})
const emit = defineEmits(['codeChange'])

const generateCSS = () : string => {
  const colors = generateColors(props.baseColor, props.shades)
  let ret = ':root {\n'
  ret += colors.map((color, index) => {
    const shadeName = getShadeName(props.shades[index])
    const rgb = hexToRgb(color.color)
    const cols: Record<string, string> = {
      hex: color.color,
      HEX: color.color.toUpperCase(),
      rgb: `rgb(${rgb})`,
    }
    const rgbContrast = hexToRgb(color.contrast).join(', ')
    const colsContrast: Record<string, string> = {
      hex: color.contrast,
      HEX: color.contrast.toUpperCase(),
      rgb: `rgb(${rgbContrast})`,
    }

    const col = cols[props.type]
    const colContrast = colsContrast[props.type]

    let line = `    --color${props.prefix && `-${props.prefix}`}${shadeName && `-${shadeName}`}: ${col};\n`
    line += `    --color${props.prefix && `-${props.prefix}`}${shadeName && `-${shadeName}`}-contrast: ${colContrast};`
    return line
  }).join('\n')
  ret += '\n}'
  emit('codeChange', ret)
  return ret
}

</script>
