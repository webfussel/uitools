<template>
  <div class="toggle-switch" @click="toggle" :style="{ '--bg' : page.value, '--fg': page.contrast}">
    <div class="toggle-knob" :class="{ active: isToggled }">
      <Icon :name="isToggled ? 'solar:moon-stars-broken' : 'solar:sun-2-broken'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

const page = inject<Ref<Color>>('page')!

const emit = defineEmits(['toggle'])

const isToggled = ref(false)
const toggle = () => {
  isToggled.value = !isToggled.value
  emit('toggle', isToggled.value)
}
</script>

<style scoped>
.toggle-switch {
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
}

.toggle-knob {
  width: 26px;
  height: 26px;
  color: var(--fg);
  background-color: var(--bg);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: left 300ms, transform 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-knob.active {
  left: 32px;
  transform: rotate(360deg);
}
</style>