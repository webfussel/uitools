<template>
  <span class="Chip">
    <span>{{value}}</span>
    <button @click="close()">
      <Icon name="close" />
    </button>
  </span>
</template>

<script setup lang="ts">
type Props = {
  value : string | number
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const close = () => emit('close')
</script>
