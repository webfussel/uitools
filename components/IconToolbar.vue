<template>
  <section class="IconToolbar Toolbar z-1">
    <strong>{{headline}}</strong>
    <div class="buttons">
      <div v-for="icon in icons" :key="`${headline}-${icon.name}`" class="icon">
        <span class="toolbar-button">
          <Icon :name="icon.name" />
        </span>
        <span class="tip">{{icon.tip}}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Props = {
  headline: string
  icons: {
    name: string
    tip: string
  }[]
}

defineProps<Props>()
</script>
