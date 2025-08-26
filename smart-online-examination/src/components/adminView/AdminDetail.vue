<template>
  <div class="min-h-full">
    <div class="container px-0 py-0 mx-auto sm:px-4 sm:py-10">
      <div
        class="bg-white rounded-xl shadow-lg p-2 py-4 md:p-4 lg:p-6 flex flex-col lg:flex-row gap-8"
      >
        <!-- Left Section -->
        <div
          class="lg:w-1/3 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 overflow-hidden rounded-full border-4 border-[#00b4d8] shadow-md"
          >
            <img
              @click="showModal = true"
              class="w-full h-full object-cover"
              :src="API_BASE_PROFILE_URL + '/' + adminInfo.info.profilePicture"
              alt="Teacher Avatar"
            />
            <div
              v-if="showModal"
              class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              @click.self="showModal = false"
            >
              <img
                :src="
                  API_BASE_PROFILE_URL + '/' + adminInfo.info.profilePicture
                "
                alt="Student Avatar"
                class="max-w-full max-h-full rounded"
              />
            </div>
          </div>
          <h2 class="text-3xl font-bold mt-2 text-[#03045e]">
            {{ adminInfo.info?.name }}
          </h2>
          <div class="text-sectio text-start">
            <p class="text-gray-600 text-md">
              Ful name: {{ adminInfo.info?.name }}
            </p>
            <p class="text-gray-600 text-md">
              Gender: {{ adminInfo.info?.gender }}
            </p>
            <p class="text-gray-600 text-md">
              Role: {{ formatRole(adminInfo.info?.role) }}
            </p>
            <p
              class="text-gray-600 text-md"
              v-if="adminInfo?.info.departments?.length"
            >
              Departments:
              <span
                v-for="(dept, index) in adminInfo.info.departments"
                :key="index"
              >
                {{ dept.name
                }}<span v-if="index !== adminInfo.info.departments.length - 1"
                  >,
                </span>
              </span>
            </p>
            <p class="text-gray-600 text-md">
              Email: {{ adminInfo.info?.email }}
            </p>
            <p class="text-gray-600 text-md">
              Phone: {{ adminInfo.info?.phone }}
            </p>
          </div>
          <div class="flex flex-row gap-3 mt-4">
            <div class="flex flex-row">
              <button
                class="flex items-center gap-2 px-4 py-2 rounded-md shadow-md text-white bg-blue-500 font-normal text-md"
              >
                <MessageRigularIcon class="w-5 h-5" />
                Message
              </button>
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div class="lg:w-2/3 space-y-10" id="for-user-activities">
          <!-- Admin Permissions Section -->
          <section>
            <header class="flex flex-row justify-between items-center">
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Permissions
              </h2>
              <p class="text-sm text-gray-600 font-semibold">Manage</p>
            </header>
            <div class="space-y-2">
              <!-- Inside your v-for loop -->
              <div
                v-for="perm in adminInfo.permissions"
                :key="perm.id"
                class="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition"
              >
                <div>
                  <p class="text-md font-medium text-gray-800">
                    {{ perm.name }}
                  </p>
                  <p class="text-sm text-gray-500">{{ perm.description }}</p>
                </div>

                <!-- Toggle Switch -->
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="perm.enabled"
                    @change="togglePermission(perm)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"
                  >
                    <div
                      class="w-5 h-5 bg-white border border-gray-300 rounded-full transform translate-y-[2px] transition-all"
                      :class="
                        perm.enabled ? 'translate-x-[22px]' : 'translate-x-1'
                      "
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          <!-- Activity Feed -->
          <section>
            <header class="flex flex-row justify-between items-center">
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Recent Activities
              </h2>
              <p class="text-sm font-semibold text-gray-600">View all</p>
            </header>
            <!-- Minimal Recent Activities (Icon + Description + Time) -->
            <div
              v-if="adminInfo.recentActivities.length"
              class="space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
            >
              <div
                v-for="a in adminInfo.recentActivities"
                :key="a.id"
                class="flex items-start gap-3 p-3 rounded-md border border-gray-200 hover:-translate-y-1 hover:shadow-md transition"
              >
                <!-- icon -->
                <ActionIcon :type="a.type.toLowerCase()" />

                <!-- description + timestamp -->
                <div class="flex-1 flex flex-col">
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {{ a.description }}
                  </p>
                  <time
                    :datetime="a.timestamp"
                    class="text-sm text-gray-600 line-clamp-2"
                  >
                    {{ formatDate(a.timestamp) }}
                  </time>
                </div>

                <time
                  :datetime="a.timestamp"
                  class="text-xs text-gray-400 whitespace-nowrap"
                >
                  {{ formatAgo(a.timestamp) }}
                </time>
              </div>
            </div>

            <!-- Empty state -->
            <div
              v-else
              class="flex flex-col items-center justify-center h-[240px] text-gray-400"
            >
              <svg
                class="w-10 h-10 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 13h6m-6 4h3m4 3H6a2 2 0 0 1-2-2V8
         a2 2 0 0 1 2-2h2l2-2h4l2 2h2a2 2 0 0 1 2 2v10
         a2 2 0 0 1-2 2z"
                />
              </svg>
              <span>No recent activity</span>
            </div>
          </section>
        </div>
      </div>

      <div class="bg-white mt-4 rounded-xl shadow-lg p-6 flex flex-col gap-8">
        <section class="w-full mt-4 h-full">
          <header class="flex flex-row justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">
              Recent Devices
            </h2>
            <p class="text-sm font-semibold text-gray-600">View all</p>
          </header>
          <div
            class="overflow-x-auto border-t-2 border-gray-200 rounded-md shadow-sm"
          >
            <table
              class="min-w-full text-left divide-y divide-gray-200 bg-white rounded-md shadow-md"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                  >
                    BROWSER
                  </th>
                  <th
                    class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                  >
                    DEVICE
                  </th>
                  <th
                    class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                  >
                    LOCATION
                  </th>
                  <th
                    class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                  >
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody class="text-gray-700 bg-white">
                <tr
                  v-for="recent in adminInfo.recentDevices"
                  :key="recent.id"
                  class="border-t hover:bg-gray-100 transition"
                >
                  <td class="py-3 px-4 flex items-center">
                    <ActionIcon :type="recent.deviceType" />
                    <span class="ps-2">{{ recent.browser }}</span>
                  </td>
                  <td class="py-3 px-4">{{ recent.device }}</td>
                  <td class="py-3 px-4">{{ recent.location }}</td>
                  <td class="py-3 px-4">
                    {{ formatDate(recent.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import SuccessIcon from "../icons/SuccessIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import MessageRigularIcon from "../icons/MessageRigularIcon.vue";
import EditIcon from "../icons/EditIcon.vue";
import PasswordInput from "../studentView/PasswordInput.vue";
import ActionIcon from "../icons/ActionIcon.vue";
import axios from "axios";
import RippleButton from "../Custom/RippleButton.vue";
import { API_BASE_PROFILE_URL, API_BASE_URL } from "@/config/useWebSocket";
export default {
  name: "TeacherDetail",
  components: {
    MessageRigularIcon,
    ActionIcon,
    EditIcon,
    PasswordInput,
    RippleButton,
    CloseIcon,
    SuccessIcon,
  },
  data() {
    return {
      showModal: false,
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      adminInfo: {
        permissions: [
          {
            id: 1,
            name: "User Management",
            description: "Create, update and delete users",
            enabled: true,
          },
          {
            id: 2,
            name: "Exam Approval",
            description: "Approve or reject exams",
            enabled: true,
          },
          {
            id: 3,
            name: "System Settings",
            description: "Configure system preferences",
            enabled: true,
          },
        ],
        info: {},
        recentActivities: [],
        recentDevices: [],
      },
      userId: this.$route.params.id,
      exams: [
        {
          id: 1,
          name: "Math Final",
          date: "2025-07-25",
          status: "Upcoming",
          type: "FINAL",
          score: null,
        },
        {
          id: 2,
          name: "Science Quiz",
          date: "2025-07-10",
          type: "FINAL",
          status: "Completed",
          score: 84,
        },
        {
          id: 3,
          name: "History Test",
          date: "2025-07-01",
          type: "QUIZ",
          status: "Missed",
          score: 0,
        },
      ],
    };
  },
  methods: {
    togglePermission(perm) {
      perm.enabled = !perm.enabled;
      // You can also make an API call here
      console.log(`Permission ${perm.name} toggled to`, perm.enabled);
    },
    formatDate(dateStr) {
      return dayjs(dateStr).format("MMMM DD, YYYY hh:mm A");
    },
    formatDateTime(datetimeStr) {
      try {
        // Replace space with 'T' for ISO parsing if needed
        const dateObj = parseISO(datetimeStr.replace(" ", "T"));
        return format(dateObj, "EEE, MMM d, yyyy • hh:mm a");
      } catch {
        return datetimeStr;
      }
    },
    formatAgo(iso) {
      const diff = Date.now() - new Date(iso).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "just now";
      if (mins < 60) return `${mins} m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs} h ago`;
      const days = Math.floor(hrs / 24);
      return `${days} d ago`;
    },
    async loadAdminInfo() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/admins/" + this.userId,
          { withCredentials: true }
        );
        this.adminInfo.info = response.data.data;
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    },
    formatRole(role) {
      if (!role) return "";
      return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    },
    async fetchRecentDevices() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/session-logs/" + this.userId,
          { withCredentials: true }
        );
        const data = response.data.data;

        // Sort by date (assuming "createdAt" or similar field)
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Take top 5
        this.adminInfo.recentDevices = sortedData.slice(0, 5);
        console.log(this.adminInfo.recentDevices);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchUserRecentAction() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/actions/" + this.userId,
          { withCredentials: true }
        );
        const data = response.data.data;

        // Sort by date (assuming "createdAt" or "date")
        const sortedData = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        console.log(sortedData);

        // Take top 5
        this.adminInfo.recentActivities = sortedData.slice(0, 5);
        console.log(this.adminInfo.recentActivities);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.loadAdminInfo();
    this.fetchRecentDevices();
    this.fetchUserRecentAction();
  },
};
</script>

<style scoped>
/* Optional: Custom Scrollbar */
::-webkit-scrollbar-track {
  background: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  background: #90e0ef;
  border-radius: 4px;
}
</style>
