<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-5 right-5 z-50 px-5 py-3 rounded-md shadow-lg text-white flex items-center gap-2',
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      <svg v-if="type === 'success'" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "success" }, // success | error
    message: { type: String, required: true },
    duration: { type: Number, default: 3000 }
  },
  data() {
    return { visible: true };
  },
  mounted() {
    setTimeout(() => (this.visible = false), this.duration);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
