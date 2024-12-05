<template>
  <div class="ColorStrip" :style="{ backgroundColor: color, color: contrast}">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  name: string
  color: string
  contrast: string
}

defineProps<Props>()
</script>

<style scoped>
.ColorStrip {
  padding: 0.5em;
  text-align: center;
}
</style>