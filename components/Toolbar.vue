<template>
  <section class="IconToolbar Toolbar z-1" :class="[spread ? 'spread' : '']">
    <strong>{{headline}}</strong>
    <slot />
  </section>
</template>

<script setup lang="ts">
type Props = {
  headline: string
  spread?: boolean
}

defineProps<Props>()
</script>
