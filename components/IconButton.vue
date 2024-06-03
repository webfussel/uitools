<template>
  <button class="IconButton" @click="$emit('click')">
    <span class="icon">
      <Icon :name :height />
    </span>
    <span class="Tip">{{tip}}</span>
  </button>
</template>

<script setup lang="ts">
type Props = {
  name: string
  height?: string
  tip: string
}

defineProps<Props>()
defineEmits(['click'])

</script>
