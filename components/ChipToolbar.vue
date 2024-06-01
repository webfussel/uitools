<template>
  <section class="Toolbar z-1">
    <strong>{{headline}}</strong>
    <InputTextField label="Add Chip" v-model="textField" />
    <Chip v-for="(chip, index) in chips" :value="chip" @close="removeChip(index)" />
  </section>
</template>

<script setup lang="ts">
type Props = {
  headline: string
  chips: string[] | number[]
}

const textField = ref('')

defineProps<Props>()
const emit = defineEmits(['remove-chip'])

const removeChip = (index : number) => emit('remove-chip', index)
</script>
