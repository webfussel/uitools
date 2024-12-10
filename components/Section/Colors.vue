<template>
  <section class="Colors content-paddings content">

    <UTHero>
      <template #content>
        <div class="hero-content">
          <UTMessageBar
              icon="solar:info-circle-broken"
              message="This site is still under construction and in a very early state. Feel free to return whenever you like!"
              type="info"
          />
          <h1 class="center">
            Explore <strong>Accessibility</strong> with the page you see.
          </h1>
          <p class="text-center">
            UI Tools shows you directly which color combinations work and which don't. Create accessible color palettes in easy mode.
          </p>
          <UTButton
              label="Let's go"
              icon="solar:arrow-right-broken"
              color="main"
              type="solid"
              icon-hover-effect="left-right"
          />
          <article class="color-fields flex-row gap-default">
            <UTColorField v-for="color in colors" :key="color.name" :name="color.name" v-model="color.hex" />
          </article>
        </div>
      </template>
    </UTHero>
  </section>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'
import UTMessageBar from '~/components/UTMessageBar.vue'

useHead({
  titleTemplate: (title ?: string) => `${title ? `${title} - ` : ''}Colors`
})

const colorBackground = inject<Ref<Color>>('colorBackground')!
const colorText = inject<Ref<Color>>('colorText')!
const colorMain = inject<Ref<Color>>('colorMain')!
const colorAccent = inject<Ref<Color>>('colorAccent')!
const colorInfo = inject<Ref<Color>>('colorInfo')!
const colorSuccess = inject<Ref<Color>>('colorSuccess')!
const colorWarning = inject<Ref<Color>>('colorWarning')!
const colorError = inject<Ref<Color>>('colorError')!

const colors = [
  colorBackground.value,
  colorText.value,
  colorMain.value,
  colorAccent.value,
  colorInfo.value,
  colorSuccess.value,
  colorWarning.value,
  colorError.value,
]
</script>

<style scoped>
h2 {
  & strong {
    font-size: 2rem;
  }
}

.hero-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  font-size: 5rem;
}

strong {
  color: var(--color-main);
}
</style>