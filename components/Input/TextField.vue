<template>
  <div class="TextField" :class="{full: fullWidth}">
    <div class="InputBase field" :class="{disabled: disabled}">
      <span v-if="icon" class="prefix">
        <Icon :name="icon"/>
      </span>
      <input :id="id" @keyup.enter="$emit('enterAction')" :min="min" :maxlength="maxLength" :type="type" :placeholder="placeholder || ' '" v-model="value" @input="$emit('change')" :disabled="disabled"/>
      <label :for="id" :class="{'move-left': !!icon}">{{ label }} <span class="req" v-if="required">*</span></label>
      <button v-if="action && action.show" class="suffix" @click="action.execute()" :aria-label="action.label">
        <Icon :name="action.icon"/>
      </button>
    </div>
    <span v-if="$slots.default" class="message">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string | number | Date
  label: string
  placeholder ?: string
  icon?: string
  type?: string
  required?: boolean
  fullWidth?: boolean
  disabled?: boolean
  maxLength?: number
  min?: string | number
  action?: {
    show: boolean
    icon: string
    label: string
    execute: () => void
  }
}

const id = useId()

const emit = defineEmits(['update:modelValue', 'blur', 'change', 'enterAction'])

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  maxLength: 100
})

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
</script>
