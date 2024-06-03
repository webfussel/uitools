<template>
  <button class="IconButton">
    <span class="icon">
      <Icon :name="name" />
    </span>
    <span class="tip">{{tip}}</span>
  </button>
</template>

<script setup lang="ts">
type Props = {
  name: string
  tip: string
}

defineProps<Props>()

</script>
