<template>
  <article>
    <UTMessageBar
      :icon="iconName"
      :type="message.severity"
      message=""
    />
    <div>
      <p>{{ message.message }} <strong>{{ message.severityText }}</strong>.</p>
      <div>
        <UTButton
          v-for="element in message.elements"
          :key="element[0]"
          :label="element[0]"
          type="outline"
          color="main"
          icon="solar:map-arrow-square-broken"
          icon-hover-effect="pulse"
          @click="goToElement(element[1])"
          @mouseenter.native="highlightElement(element[1])"
          @mouseleave.native="unhighlightElement(element[1])"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Message } from '~/types/Message'

type Props = {
  message: Message
}

const props = defineProps<Props>()

const iconName = computed(() => {
  if (props.message.severity === 'error') return 'solar:close-circle-broken'
  if (props.message.severity === 'warning') return 'solar:shield-warning-broken'
  return 'solar:check-read-broken'
})

let fadeTimeout : ReturnType<typeof setTimeout>

const goToElement = (element: HTMLElement) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const highlightElement = (element: HTMLElement) => {
  clearTimeout(fadeTimeout)
  element.classList.remove('fading')
  element.classList.add('highlight')
}

const unhighlightElement = (element: HTMLElement) => {
  element.classList.add('fading')
  fadeTimeout = setTimeout(() => {
    element.classList.remove('fading')
    element.classList.remove('highlight')
  }, 500)
}
</script>

<style scoped>
article {
  display: flex;
  gap: 1rem;

  & div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.icon.error {
  color: var(--color-error);
}

.icon.warning {
  color: var(--color-warning);
}

.icon.success {
  color: var(--color-success);
}
</style>