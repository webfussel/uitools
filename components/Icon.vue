<template>
  <component :is="icon" :height="size" :width="size" aria-hidden="true" />
</template>

<script setup lang="ts">
type Props = {
  name: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em'
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
    case 'stripes': return base.TableRows
    case 'grid': return base.ViewGrid
    case 'picker': return base.ColorPicker
    case 'check': return base.CheckCircle
    case 'pass': return base.Emoji
    case 'fail': return base.EmojiSad
    case 'external': return base.ArrowUpRightSquare
    default: return base.QuestionMark
  }
}

const icon = shallowRef(await getIcon())

watch(() => props.name, async () => {
  icon.value = await getIcon()
})
</script>
