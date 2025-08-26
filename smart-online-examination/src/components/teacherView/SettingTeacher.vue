<template>
  <div class="mt-7 w-full">
    <RouterLink
    to="/teacher-dashboard/setting/teacher-account"
      @click="selected = 'account'"
      class="inline-flex items-center gap-2 px-4 py-2 rounded transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      :class="selected === 'account' ? ' bg-blue-500 text-white font-medium' : 'text-gray-700 hover:text-violet-600 hover:bg-gray-200'"
    >
      <AccountIcon :class="['w-5 h-5', selected === 'account' ? 'text-white' : 'text-gray-700']" />
      <span>Account</span>
    </RouterLink>

    <RouterLink
    to="/teacher-dashboard/setting/security"
      @click="selected = 'security'"
      class="ms-2 inline-flex items-center gap-2 px-4 py-2 rounded transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      :class="selected === 'security' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:text-violet-600 hover:bg-gray-200'"
    >
      <SecurityIcon :class="['w-5 h-5', selected === 'security' ? 'text-white' : 'text-gray-700']" />
      <span>Security</span>
    </RouterLink>

    <RouterView>

    </RouterView>
  </div>
</template>

<script>
import AccountIcon from '../icons/AccountIcon.vue';
import SecurityIcon from '../icons/SecurityIcon.vue';

export default {
  components: {
    AccountIcon,
    SecurityIcon
  },
  data() {
    return {
      selected: 'account' // default selected tab
    };
  }
};
</script>
