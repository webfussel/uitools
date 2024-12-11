<template>
  <aside class="MessageBar" :class="[type]">
    <Icon :name="icon" size="1.5em" />
    <p v-if="message">{{ message }}</p>
  </aside>
</template>

<script setup lang="ts">
type Props = {
  icon: string
  message?: string
  type: 'success' | 'error' | 'warning' | 'info'
}

defineProps<Props>()
</script>

<style scoped>
.MessageBar {
  border-radius: var(--radius-standard);
  border: 1px solid transparent;
  padding: .5rem 1rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  transition: background var(--transition-time), color var(--transition-time);
}

.MessageBar.success {
  border-color: var(--color-success);
  background: var(--color-success-lightest);
  color: var(--color-success);
}

.MessageBar.error {
  border-color: var(--color-error);
  background: var(--color-error-lightest);
  color: var(--color-error);
}

.MessageBar.warning {
  border-color: var(--color-warning);
  background: var(--color-warning-lightest);
  color: var(--color-warning);
}

.MessageBar.info {
  border-color: var(--color-info);
  background: var(--color-info-lightest);
  color: var(--color-info);
}
</style>