<template>
  <component :is="icon" height="1em" aria-hidden="true" />
</template>

<script setup lang="ts">

type Props = {
  name: string
}

const props = defineProps<Props>()

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
  }
}

const icon = await getIcon()
</script>
