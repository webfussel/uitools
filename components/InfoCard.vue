<template>
  <article class="flex-col gap-default">
    <header>{{ header }}</header>
    <slot />
  </article>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

type Props = {
  header: string;
}

defineProps<Props>()

const colorMain = inject<Ref<Color>>('colorMain')!
const colorAccent = inject<Ref<Color>>('colorAccent')!
const colorText = inject<Ref<Color>>('colorText')!
</script>

<style scoped>
article {
  padding: 1rem 1.5rem;
  box-shadow: 0 3px 6px rgba(v-bind('colorText.rgb'), .16), 0 3px 6px rgba(v-bind('colorText.rgb'), .23);

  & header {
    color: var(--color-main);
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>