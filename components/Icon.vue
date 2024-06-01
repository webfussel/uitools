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
  }
}

const icon = await getIcon()
</script>
