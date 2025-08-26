<template>
  <div class="h-full">
    <section
      class="filter-search-role-export-add-new-user section-limit-height mb-24 rounded-md py-6 px-8 table-l bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] mt-5 md:min-h-[280px]"
    >
      <div class="mt-4 py-4">
        <h1 class="font-semibold text-gray-600 text-xl">
          All Students completed the exam
        </h1>
        <div
          @click.self="openedUserId = null"
          class="mt-4 border-t-2 border-gray-200 rounded-md shadow-sm"
        >
          <div class="overflow-y-auto table-limit-height">
            <table class="min-w-full divide-y divide-gray-200 bg-white">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    User
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Email
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Role
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Phone
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.userId">
                  <td class="px-4 py-3 flex items-center space-x-3">
                    <img
                      :src="API_BASE_PROFILE_URL + '/' + user.profile"
                      alt="Profile"
                      class="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p class="font-medium text-gray-700">
                        {{ user.firstName }} {{ user.lastName }}
                        <span
                          v-if="user.id === userStore.user.id"
                          class="text-blue-500"
                        >
                          (You)
                        </span>
                      </p>
                    </div>
                  </td>
                  <td>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-500">
                    <div class="flex items-center space-x-1">
                      <template v-if="user.role === 'ADMIN'">
                        <AdminDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <template v-else-if="user.role === 'TEACHER'">
                        <TeacherDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <template v-else-if="user.role === 'STUDENT'">
                        <StudentDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <span class="leading-none">{{ user.role }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-500">
                    {{ formatPhone(user.phone) }}
                  </td>
                  <td
                    class="relative px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <button
                        @click="handeCheck(user.examId, user.userId)"
                        class="bg-green-400 px-2 py-1 rounded cursor-pointer text-white"
                      >
                        Check
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import CloseIcon from "../icons/CloseIcon.vue";
import SuccessIcon from "../icons/SuccessIcon.vue";
import SearchIcon from "../icons/SearchIcon.vue";
import StudentIcon from "../icons/StudentIcon.vue";
import TeacherIcon from "../icons/TeacherIcon.vue";
import AdminIcon from "../icons/AdminIcon.vue";
import RippleButton from "../Custom/RippleButton.vue";
import RigularEyeIcon from "../icons/RigularEyeIcon.vue";
import RigularTrashIcon from "../icons/RigularTrashIcon.vue";
import OptionIcon from "../icons/OptionIcon.vue";
import { useToast } from "vue-toastification";
import AdminDisplayInTheTableIcon from "../icons/AdminDisplayInTheTableIcon.vue";
import StudentDisplayInTheTableIcon from "../icons/StudentDisplayInTheTableIcon.vue";
import TeacherDisplayInTheTableIcon from "../icons/TeacherDisplayInTheTableIcon.vue";
import { API_BASE_PROFILE_URL, API_BASE_URL } from "@/config/useWebSocket";
import { useUserStore } from "@/store/store";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
export default {
  components: {
    CloseIcon,
    SuccessIcon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    TransitionRoot,
    TransitionChild,
    TeacherIcon,
    AdminIcon,
    StudentIcon,
    SearchIcon,
    RippleButton,
    RigularEyeIcon,
    RigularTrashIcon,
    OptionIcon,
    AdminDisplayInTheTableIcon,
    TeacherDisplayInTheTableIcon,
    StudentDisplayInTheTableIcon,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      id: this.$route.params.id,
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      users: [],
      Subject: [],
      selectedLimit: "",
      searchQuery: "",
      openedUserId: null,
    };
  },
  watch: {
    "userForm.shift"(newVal) {
      console.log("Shift changed to:", newVal, typeof newVal);
    },
  },
  computed: {
    selectedSubjectsNames() {
      return this.Subjects.filter((dp) =>
        this.selectedSubjects.includes(dp.id)
      ).map((dp) => dp.name);
    },
  },
  methods: {
    formateShift(name, start, end) {
      return `${name} (${start} - ${end})`;
    },
    formateLocation(buildingName, FloorNumber, romeName) {
      return `Building: ${buildingName} Floor: ${FloorNumber} Room: ${romeName}`;
    },
    toggleSubject(id) {
      const index = this.selectedSubjects.indexOf(id);
      if (index === -1) {
        this.selectedSubjects.push(id);
      } else {
        this.selectedSubjects.splice(index, 1);
      }

      console.log("Selected Subjects:", this.selectedSubjects);
    },
    formatPhone(phone) {
      if (!phone) return "-";
      return phone.startsWith("0") ? "+855" + phone.substring(1) : phone;
    },
    async getSubject() {
      const response = await axios.get(`${API_BASE_URL}/api/teacherSubject`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        this.Subject = response.data.data; // this is likely an array
        console.log("Subjects:", this.Subject);

        // If you want the first subject's name
        if (this.Subject.length > 0) {
          console.log("First subject name:", this.Subject[0].name);
        }
      }
    },
    async getAllStudentCompleted() {
      const response = await axios.get(
        API_BASE_URL + `/api/complete-exams/${this.id}/submitted-students`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        this.users = response.data.data;
      }

      console.log("Users loaded:", this.users);
    },
    toggleMenu(id) {
      this.openedUserId = this.openedUserId === id ? null : id;
    },
    handeCheck(id, uId) {
      this.$router.push({
        name: "viewAnswer",
        params: { id: id, userId: uId },
      });
    },
  },
  mounted() {
    this.getAllStudentCompleted();
    this.getSubject();
  },
  watch: {
    selectedRole() {
      this.getAllStudentCompleted();
    },
    selectedLimit() {
      this.getAllStudentCompleted();
    },
  },
};
</script>
<style scoped>
/* Gray background fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide panel push in/out */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-height: 820px) {
  .table-limit-height {
    max-height: 350px;
    /* or any value you want */
    overflow-y: auto;
  }
}
</style>
