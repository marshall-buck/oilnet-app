<template>
  <div>
    <input
      style="display: none"
      type="file"
      ref="inputRef"
      :multiple="allowMultiple"
      :accept="accept"
      @change="updateFiles"
    />
    <slot :openDialog="openDialog" />
  </div>
</template>
<script>
import { provide, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    allowMultiple: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: Array,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const inputRef = ref(null);
    const openDialog = () => {
      store.dispatch('resetState');

      // Tells backend to reset its currentData
      window.api.send('reset-state');
      inputRef.value.click();
    };

    provide('openDialog', openDialog);

    provide('addFiles', (files) => {
      emit('update:modelValue', [...props.modelValue, ...files]);
    });

    const updateFiles = () => {
      emit('update:modelValue', [...props.modelValue, ...inputRef.value.files]);
    };

    return {
      inputRef,
      openDialog,
      updateFiles,
    };
  },
};
</script>
