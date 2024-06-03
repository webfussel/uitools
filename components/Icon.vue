<template>
  <component :is="icon" :height="height" aria-hidden="true" />
</template>

<script setup lang="ts">

type Props = {
  name: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '1em'
})

const getIcon = async () => {
  const base = await import('@iconoir/vue')
  switch (props.name) {
    case 'colors': return base.ColorFilter
    case 'fonts': return base.TextArrowsUpDown
    case 'spacing': return base.AlignHorizontalSpacing
    case 'refresh': return base.RefreshDouble
    case 'load': return base.Upload
    case 'save': return base.Download
    case 'share': return base.ShareAndroid
    case 'close': return base.Xmark
    case 'add': return base.PlusCircle
    case 'copy': return base.Copy
    case 'palette': return base.Palette
    case 'code': return base.Code
    case 'eye': return base.Eye
    default: return base.QuestionMark
  }
}

const icon = await getIcon()
</script>
