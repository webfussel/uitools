<template>
  <section class="Toolbar">
    <div :class="[spread ? 'spread' : '']">
      <strong>{{headline}}</strong>
      <slot name="top" />
    </div>
    <slot name="bottom" />
  </section>
</template>

<script setup lang="ts">
type Props = {
  headline: string
  spread?: boolean
}

defineProps<Props>()
</script>
