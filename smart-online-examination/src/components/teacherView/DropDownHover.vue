<template>
  <div
    class="relative inline-block text-left"
    ref="root"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <!-- Button -->
    <button
      @click="onToggle"
      type="button"
      class="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
    >
      {{ selectedOption }}
      <svg class="w-4 h-4 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12l-5-5h10l-5 5z" />
      </svg>
    </button>

    <!-- Menu -->
    <div
      v-show="visible"
      class="absolute left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <ul>
        <li
          v-for="(opt, i) in options"
          :key="i"
          @click="onSelect(opt)"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {{ opt }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ResponsiveDropdown',
  props: {
    options: { type: Array, default: () => [] }
  },
  emits: ['select'],
  data() {
    return {
      selectedOption: this.options[0] || 'Select',
      visible: false,
      isMd: window.innerWidth >= 768
    };
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    document.addEventListener('click', this.onClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    onResize() {
      this.isMd = window.innerWidth >= 768;
      if (!this.isMd) this.visible = false;
    },
    onClickOutside(e) {
      if (!this.$refs.root.contains(e.target)) {
        this.visible = false;
      }
    },
    onToggle() {
      if (!this.isMd) this.visible = !this.visible;
    },
    onEnter() {
      if (this.isMd) this.visible = true;
    },
    onLeave() {
      if (this.isMd) this.visible = false;
    },
    onSelect(opt) {
      this.selectedOption = opt;
      this.$emit('select', opt);
      this.visible = false;
    }
  }
};
</script>

<style scoped>
/* ensure v-show transitions won't conflict */
[v-cloak] [v-show] { display: none; }
</style>
