<template>
  <button class="Button" :class="[color, type]">
    <span>{{ label }}</span>
    <Icon aria-hidden="true" :name="icon" size="1.5em" class="icon" :class="`animation-${iconHoverEffect}`" />
  </button>
</template>

<script setup lang="ts">
type Props = {
  label: string
  icon: string
  iconHoverEffect: 'left-right'
  color: 'main' | 'accent'
  type: 'solid' | 'outline' | 'ghost'
}

defineProps<Props>()
</script>

<style scoped>
button {
  all: unset;
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem;
  border-radius: var(--radius-standard);
  width: fit-content;
  transition: background var(--transition-time), color var(--transition-time);
  cursor: pointer;
  font-weight: bold;

  &:hover .icon.animation-left-right {
    animation: left-right 500ms alternate infinite;
  }
}

@keyframes left-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(10%);
  }
}

button.main {
  --color: var(--color-main);
  --contrast: var(--color-main-contrast);
  --hover-color: var(--color-main-hover);
  --hover-contrast: var(--color-main-hover-contrast);
}

button.accent {
  --color: var(--color-accent);
  --contrast: var(--color-accent-contrast);
  --hover-color: var(--color-accent-hover);
  --hover-contrast: var(--color-accent-hover-contrast);
}

button.solid {
  background: var(--color);
  color: var(--contrast);

  &:hover {
    background: var(--hover-color);
    color: var(--hover-contrast);
  }
}

button.outline {
  background: transparent;
  border: 2px solid var(--color);
  color: var(--color);

  &:hover {
    background: var(--color);
    color: var(--contrast);
  }
}

button.ghost {
  background: transparent;
  color: var(--color);

  &:hover {
    background: var(--color);
    color: var(--contrast);
  }
}
</style>