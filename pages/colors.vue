<template>
  <section class="Colors content-paddings content">
    <article class="color-fields flex-row gap-default">
      <ColorField v-for="color in colors" :key="color.name" :name="color.name" v-model="color.hex" />
    </article>
    <article class="intro flex-col gap-default">
      <h2 class="flex-col">Accessibility <strong>matters to all of us</strong></h2>
      <h3>What does "Accessibility" mean?</h3>
      <p>
        Accessibility - or "A11y" as a numeronym, where the "11" represents the 11 letters between the "a" and the "y." - is often used in the context of web design, software development, and other fields to refer to making products, services, and environments usable for everyone, including people with disabilities.
      </p>
      <h3>Key aspects of a11y</h3>
      <div class="info-cards gap-default">
        <InfoCard header="Inclusivity">
          Ensures that people with diverse abilities (visual, auditory, cognitive, or motor impairments)
          can access and use a product or service.
        </InfoCard>
        <InfoCard header="Standards and Guidelines">
          WCAG (Web Content Accessibility Guidelines) Provides technical recommendations for making web content accessible.
        </InfoCard>
        <InfoCard header="Broader Impact">
          While focused on aiding individuals with disabilities, accessibility improvements often benefit all users.
          For instance, captions help those in noisy environments, and well-structured websites load faster and perform better for everyone.
        </InfoCard>
      </div>
      <p>
        By prioritizing a11y, designers and developers create a more inclusive world, ensuring that technology and services are accessible
        to as many people as possible.
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'

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

.intro {
  margin-top: 3rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>