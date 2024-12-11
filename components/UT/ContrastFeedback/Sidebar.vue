<template>
  <section
      class="ContrastFeedback"
      :class="{ open }"
  >
    <button
      class="z-2"
      :class="buttonColor"
      @click="open = !open"
    >
      <Icon :name="icon" size="2em" />
    </button>
    <main>
      <h2>Contrasts</h2>
      <ul>
        <li v-for="message in messages" :key="message.message">
          <UTContrastFeedbackListItem :message="message" />
        </li>
      </ul>
    </main>
  </section>
</template>

<script setup lang="ts">
import type { Color } from '~/types/Colors'
import type { ComplianceType, Message, Severity } from '~/types/Message'

const colorText = inject<Ref<Color>>('colorText')!
const colorBackground = inject<Ref<Color>>('colorBackground')!
const colorMain = inject<Ref<Color>>('colorMain')!

const getSeverityFromContrast = (type: ComplianceType, foreground: Color, background: Color) : Severity => {
  const compliance = type === 'normal' ? checkComplianceNormal(foreground, background) : checkComplianceLarge(foreground, background)
  if (compliance.AAA) return 'success'
  if (compliance.AA) return 'warning'
  return 'error'
}

const getTextFromContrast = (type: ComplianceType, foreground: Color, background: Color) => {
  const compliance = type === 'normal' ? checkComplianceNormal(foreground, background) : checkComplianceLarge(foreground, background)
  if (compliance.AAA) return 'great'
  if (compliance.AA) return 'not good enough'
  return 'terrible'
}

const open = ref(false)

const messages = computed<Message[]>(() => [
  {
    severity: getSeverityFromContrast('large', colorText.value, colorBackground.value),
    severityText: getTextFromContrast('large', colorText.value, colorBackground.value),
    message: 'Contrast ratio for large normal Text on Background is',
    elements: [
      ['Headline', document.querySelector('h1')!]
    ]
  },
  {
    severity: getSeverityFromContrast('large', colorMain.value, colorBackground.value),
    severityText: getTextFromContrast('large', colorMain.value, colorBackground.value),
    message: 'Contrast ratio for large main color Text on Background is',
    elements: [
      ['Headline', document.querySelector('h1')!]
    ]
  }
])

const hasErrors = computed(() => messages.value.some(message => message.severity === 'error'))
const hasWarnings = computed(() => messages.value.some(message => message.severity === 'warning'))

const buttonColor = computed(() => {
  if (hasErrors.value) return 'error'
  if (hasWarnings.value) return 'warning'
  return 'success'
})

const icon = computed(() => {
  if (hasErrors.value) return 'solar:close-circle-broken'
  if (hasWarnings.value) return 'solar:shield-warning-broken'
  return 'solar:check-read-broken'
})
</script>

<style scoped>
.ContrastFeedback {
  --right: 100%;
  height: 100dvh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100000;
  background: var(--color-background);
  border-left: var(--hero-line);
  translate: var(--right);
  transition: translate var(--transition-time);

  &.open {
    --right: 0;
  }
}

main {
  padding: 1rem;
  height: 100%;
  width: 30rem;
}

ul {
  display: flex;
  flex-direction: column;

  li {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: var(--hero-line);
  }
}

button {
  all: unset;
  --size: 3rem;
  position: absolute;
  height: var(--size);
  width: var(--size);
  top: 10%;
  translate: -100%;
  border: 1px solid var(--color-text);
  border-right: none;
  border-top-left-radius: var(--radius-standard);
  border-bottom-left-radius: var(--radius-standard);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.success {
    border-color: var(--color-success);
    color: var(--color-success);
    background: var(--color-success-lightest);
  }

  &.warning {
    border-color: var(--color-warning);
    color: var(--color-warning);
    background: var(--color-warning-lightest);
  }

  &.error {
    border-color: var(--color-error);
    color: var(--color-error);
    background: var(--color-error-lightest);
  }
}

</style>