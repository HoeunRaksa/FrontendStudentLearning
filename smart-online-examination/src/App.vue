<template>
    <RouterView />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import LoginView from './components/Auth/LoginView.vue'
import StudentDashboard from '@/components/studentView/StudentDashborad.vue'
// import TeacherDashboard from './components/teacherViews/TeacherDashboard.vue'
// import AdminDashboard from './components/adminViews/AdminDashboard.vue'

export default {
  name: 'App',
  setup() {
    const route = useRoute()

    const role = localStorage.getItem('userRole') || null

    const layoutComponent = computed(() => {
      if (route.meta.layout === 'auth') {
        return LoginView
      } 
      
      if (route.meta.layout === 'dashboard') {
        if (role === 'student') return StudentDashboard
        // if (role === 'teacher') return "TeacherDashboard"
        // if (role === 'admin') return "AdminDashboard"
        // // fallback
        return LoginView
      }

      // Default layout if no meta set
      return LoginView
    })

    return {
      layoutComponent,
    }
  }
}
</script>
