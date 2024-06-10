<template>
  <button class="IconButton" @click="clickedAction">
    <span class="icon">
      <Icon :name="clicked ? icon.clicked : icon.base" :size />
    </span>
    <span class="Tip" :class="[tip.position || 'top']">{{clicked ? tip.clicked : tip.base}}</span>
  </button>
</template>

<script setup lang="ts">
type Props = {
  icon: {
    base: string
    clicked: string
  }
  tip: {
    base: string
    clicked: string
    position ?: 'left' | 'right' | 'top' | 'bottom'
  }
  size?: string
}

defineProps<Props>()
const emit = defineEmits(['click'])

const clicked = ref(false)
const clickedAction = () => {
  if (clicked.value) return

  clicked.value = true
  setTimeout(() => {
    clicked.value = false
  }, 1000)
  emit('click')
}

</script>
