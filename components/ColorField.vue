<template>
  <label class="color-field flex-col">
    <span class="name">{{ name }}</span>
    <input type="color" v-model="model" />
  </label>
</template>

<script setup lang="ts">
type Props = {
  name : string
}

defineProps<Props>()

const model = defineModel()
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
}

input {
  all: unset;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
}
</style>