<template>
  <section class="Colors content-paddings content">
    <article class="color-fields">
      <ColorField v-for="color in colors" :key="color.name" :name="color.name" v-model="color.value" />
    </article>
    <h2>Accessibility</h2>
    <em>is important for all of us</em>
    <section class="flex-col">
      <article class="Palettes flex-col gap-small">
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

useHead({
  titleTemplate: (title ?: string) => `${title ? `${title} - ` : ''}Colors`
})

const colorMain = inject<Ref<Color>>('colorMain')!
const colorAccent = inject<Ref<Color>>('colorAccent')!
const colorInfo = inject<Ref<Color>>('colorInfo')!
const colorSuccess = inject<Ref<Color>>('colorSuccess')!
const colorWarning = inject<Ref<Color>>('colorWarning')!
const colorError = inject<Ref<Color>>('colorError')!

const colors = [
    colorMain.value,
    colorAccent.value,
    colorInfo.value,
    colorSuccess.value,
    colorWarning.value,
    colorError.value,
]
</script>

<style scoped>
.color-fields {
  display: flex;
  gap: 3rem;
}
</style>