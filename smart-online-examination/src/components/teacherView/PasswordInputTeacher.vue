<template>
  <div class="w-full">
    <label v-if="label" :for="name" class="text-gray-500 text-sm block mb-1">
      {{ label }}
    </label>

    <div class="relative">
      <input
        type="password"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        v-model="inputValue"
        :class="[
          'px-3 py-2 w-full border rounded-md text-gray-700 text-sm',
          'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300'
        ]"
      />
    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: {
    modelValue: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "----------",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
