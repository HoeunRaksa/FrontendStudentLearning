<template>
  <div class="min-h-screen px-4 py-6 lg:px-8 lg:py-10 bg-gray-100">
    <div class="max-w-6xl mx-auto lg:p-6 p-0">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6 space-x-4">
        <h2 class="text-2xl font-semibold text-gray-700 flex-shrink-0">
          Exam Management
        </h2>

        <!-- Search input -->
        <input v-model="searchQuery" type="text" placeholder="Search title or description..."
          class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#57cc99] flex-grow max-w-md" />
        <div>
          <RouterLink to="/teacher-dashboard/exam-management/new">
            <button
              class="bg-[#57cc99] hover:-translate-y-1 transform transition text-white text-md font-medium py-2 m-1 px-4 rounded-sm hover:bg-[#48b57f] flex-shrink-0">
              New exam
            </button>
          </RouterLink>
        </div>
      </header>

      <!-- exam List -->
      <div class="bg-white rounded-md lg:p-4 p-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-auto min-h-56">
        <table class="min-w-full table-auto border-collapse relative">
          <thead>
            <tr class="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th class="py-2 px-4 text-gray-500 font-normal">#</th>
              <th class="py-2 px-4 text-gray-500 font-normal">Title</th>
              <th class="py-2 px-4 text-gray-500 font-normal">Description</th>
              <th class="py-2 px-4 text-gray-500 font-normal">Start Time</th>
              <th class="py-2 px-4 text-gray-500 font-normal">End Time</th>
              <th class="py-2 px-4 text-gray-500 font-normal">Duration</th>
              <th class="py-2 px-4 text-gray-500 font-normal relative cursor-pointer select-none"
                @click="toggleStatusDropdown">
                Status
                <span class="inline-block ml-1 text-gray-600 transition-transform duration-200"
                  :class="{ 'rotate-180': statusDropdownOpen }">
                  ▼
                </span>
                <!-- Dropdown menu -->
                <div v-if="statusDropdownOpen"
                  class="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-30">
                  <ul class="divide-y divide-gray-200 max-h-48 overflow-auto">
                    <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      :class="{ 'font-semibold': statusFilter === '' }" @click="selectStatus('')">
                      All
                    </li>
                    <li v-for="status in statuses" :key="status.value"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize" :class="{
                        'font-semibold': statusFilter === status.value,
                      }" @click="selectStatus(status.value)">
                      {{ status.label }}
                    </li>
                  </ul>
                </div>
              </th>
              <th class="py-2 px-4 text-gray-500 font-normal">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(exam, index) in filteredexams" :key="exam.id"
              :class="' group relative border-b hover:bg-gray-50 transition-colors duration-300'">
              <td class="py-3 px-4 text-gray-600 flex items-center">{{ index + 1 }}</td>
              <td class="py-3 px-4 whitespace-nowrap font-semibold text-blue-700">
                {{ exam.title }}
              </td>
              <td
                class="relative group py-3 px-4 text-gray-500 max-w-[200px]  whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
                <div class="truncate">
                  {{ exam.description }}
                </div>
                <div
                  class="absolute inset-0 p-2 bg-white text-gray-900 rounded shadow-lg hover:text-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50"
                  style="white-space: normal; overflow-wrap: break-word;">
                  {{ exam.description }}
                </div>
              </td>
              <td class="py-3 px-4 text-gray-500 whitespace-nowrap">
                {{ formatDate(exam.datetime) }}
              </td>
              <td class="py-3 px-4 text-gray-500 whitespace-nowrap">
                {{ formatDate(exam.deadline) }}
              </td>
              <td class="py-3 px-4 text-gray-500 whitespace-nowrap">
                {{ formatDuration(exam.duration) }}
              </td>
              <td class="py-3 px-4 whitespace-nowrap capitalize">
                {{ exam.status }}
              </td>
              <td class="flex items-center">

                  <button @click="viewCompletedStudent(exam.id)"  v-if="exam.status.toLowerCase() === 'completed' " 
                    class="bg-[#57cc99] hover:-translate-y-1 transform transition text-white text-xs font-semibold py-2 m-1 px-2 rounded-sm hover:bg-[#48b57f] flex-shrink-0">
                    ViewAnswer
                  </button>
                      <!-- Published -->
                <button v-if="exam.status.toLowerCase() === 'published'" @click="endexam(exam.id)"
                  class="hover:-translate-y-1 transform text-xs text-center bg-orange-400 h-7 w-16 text-white hover:duration-500">
                  End
                </button>

                <!-- Ended -->
                <button v-if="exam.status.toLowerCase() === 'ended'" @click="editexam(exam.id)"
                  class="hover:-translate-y-1 transform bg-blue-400 py-1 m-[2px] px-4 text-white hover:duration-500">
                  Recover
                </button>

                <!-- Coming -->
                <button v-if="exam.status.toLowerCase() === 'coming'" @click="editexam(exam.id)"
                  class="hover:-translate-y-1 transform bg-blue-400 py-1 m-[2px] px-4 text-white text-sm hover:duration-500">
                  Edit
                </button>
                <button v-if="exam.status.toLowerCase() === 'coming'" @click="deleteexam(exam.id)"
                  class="hover:-translate-y-1 transform hover:duration-500 bg-green-400 m-[2px] text-xs text-center h-7 w-16 text-white">
                  Delete
                </button>

                <!-- Deleted -->
                <button v-if="exam.status.toLowerCase() === 'deleted'" @click="recoverexam(exam.id)"
                  class="hover:-translate-y-1 transform hover:duration-500 bg-green-400 m-[2px] text-xs text-center h-7 w-16 text-white">
                  Recover
                </button>

                <!-- Expired -->
                <button v-if="exam.status.toLowerCase() === 'expired'" @click="recoverexam(exam.id)"
                  class="hover:-translate-y-1 transform hover:duration-500 bg-green-400 m-[2px] text-xs text-center h-7 w-16 text-white">
                  Recover
                </button>
                <button v-if="exam.status.toLowerCase() === 'expired'" @click="deleteexam(exam.id)"
                  class="hover:-translate-y-1 transform hover:duration-500 bg-red-400  m-[2px] text-xs text-center h-7 w-16 text-white">
                  Delete
                </button>

                <!-- Draft -->
                <button v-if="exam.status.toLowerCase() === 'draft'" @click="deleteexam(exam.id)"
                  class="hover:-translate-y-1 transform hover:duration-500 bg-red-400 text-xs m-[2px] text-center h-7 w-16 text-white">
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredexams.length === 0">
              <td colspan="8" class="text-center py-4 text-gray-500">
                No exams found for selected filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { API_BASE_URL } from '@/config/useWebSocket';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useUserStore } from '@/store/store';
const toast = useToast();
export default {
  name: "examManagement",
  data() {
    return {
      API_BASE_URL,
      statusFilter: "",
      statusDropdownOpen: false,
      searchQuery: "",
      statuses: [
        { label: "Expired", value: "expired" },
        { label: "Draft", value: "draft" },
        { label: "Coming", value: "coming" },
        { label: "Deleted", value: "deleted" },
        { label: "Published", value: "published" },
        { label: "Ended", value: "ended" },
      ],
      exams: [
      ],
      recover: [

      ],
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  },

  computed: {
    filteredexams() {
      let filtered = this.exams;

      // Filter by teacherId
      if (filtered.length > 0 && this.userStore?.user?.id) {
        filtered = filtered.filter(
          (exam) => exam.teacherId === this.userStore.user.id
        );
      }

      // Filter by status
      if (this.statusFilter) {
        filtered = filtered.filter((exam) => exam.status === this.statusFilter);
      }

      // Search filter
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (exam) =>
            exam.title.toLowerCase().includes(q) ||
            exam.description.toLowerCase().includes(q)
        );
      }

      return filtered;
    },
  },
  methods: {
    toggleStatusDropdown() {
      this.statusDropdownOpen = !this.statusDropdownOpen;
    },
    selectStatus(status) {
      const upperStatus = status.toUpperCase();
      this.statusFilter = upperStatus;
      this.statusDropdownOpen = false;

      if (upperStatus === 'DELETED') {
        this.getRecover();
      } else {
        this.getAllexam();
      }
    }, formatDate(dateString) {
      return dateString
        ? dayjs(dateString).format("YYYY-MM-DD hh:mm A")
        : "N/A";
    },
   formatDuration(durationStr) {
  if (!durationStr) return "0s";

  let hours = 0, minutes = 0, seconds = 0;

  // Extract hours, minutes, seconds using regex
  const hMatch = durationStr.match(/(\d+)h/);
  const mMatch = durationStr.match(/(\d+)m/);
  const sMatch = durationStr.match(/(\d+)s/);

  if (hMatch) hours = parseInt(hMatch[1]);
  if (mMatch) minutes = parseInt(mMatch[1]);
  if (sMatch) seconds = parseInt(sMatch[1]);

  // Format output cleanly
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  return parts.join(" ") || "0s";
}
,
    calculateDuration(start, end) {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMs = endTime - startTime;
      const minutes = Math.floor(diffMs / 60000);

      if (minutes < 60) return `${minutes} min`;
      const hours = Math.floor(minutes / 60);
      const remainingMin = minutes % 60;

      return `${hours} hr${hours > 1 ? "s" : ""}${remainingMin ? ` ${remainingMin} min` : ""
        }`;
    },
    statusClass(status) {
      switch (status) {
        case "draft":
          return "bg-yellow-50";
        case "published":
          return "bg-blue-50";
        case "pending":
          return "bg-green-50";
        case "expired":
          return "bg-red-50";
        case "deleted":
          return "bg-red-50";
        case "ended":
          return "bg-red-50";
        default:
          return "";
      }
    },
    async endexam(id) {
      const index = this.exams.findIndex(exam => exam.id === id);
      if (index === -1) {
        alert("exam not found.");
        return;
      }
      if (confirm("Are you sure you want to stop this exam?")) {
        axios.put(`${API_BASE_URL}/api/exams/${id}/end`, null, {
          withCredentials: true,   // if backend uses session cookies
          // headers: { Authorization: 'Bearer <token>' } // if using JWT
        })
          .then(() => {
            this.exams[index].status = 'ENDED';
            this.getAllexam();
            toast.success("exam was successfully end!", {
              position: 'bottom-center'
            });
          })
          .catch(error => {
            console.error("Failed to end exam:", error);
            alert("Failed to end exam. Please try again.");
          });
      }
    },
    editexam(id) {
      this.$router.push({ name: "editexams", params: { id: id } });
    },
    viewCompletedStudent(id) {
      this.$router.push({ name: "StudentCompleted", params: { id: id } });
    },
    recoverexam(id) {
      this.$router.push({ name: "recoverexams", params: { id: id } });
    },
    deleteexam(id) {
      const index = this.exams.findIndex(exam => exam.id === id);
      if (index === -1) {
        alert("exam not found.");
        return;
      }

      if (confirm("Are you sure you want to cancel this exam?")) {
        axios.put(`${API_BASE_URL}/api/exams/deleted/${id}`, null, {
          withCredentials: true,   // if backend uses session cookies
          // headers: { Authorization: 'Bearer <token>' } // if using JWT
        })
          .then(() => {
            this.exams[index].status = 'DELETED';
            this.getAllexam();
            toast.success("Deleted successfully!", {
              position: 'bottom-center'
            });
          })
          .catch(error => {
            console.error("Failed to cancel exam:", error);
            alert("Failed to cancel exam. Please try again.");
          });
      }
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector("th.relative");
      if (dropdown && !dropdown.contains(event.target)) {
        this.statusDropdownOpen = false;
      }
    },
    async getAllexam() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/exams/all",
          { withCredentials: true }
        );
        console.log(response)
        this.exams = response.data;
        console.log("API exams:", response.data);

      } catch (ex) {

      }
    },
    async getRecover() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/exams/recover",
          { withCredentials: true }
        );
        console.log(response);
        this.exams = response.data;
      } catch (err) {
        toast.error("Fetch datas false!")
        console.log("fetch false!", err)
      }
    },
  },
  mounted() {
    this.getAllexam();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
tr {
  position: relative;
}

/* Initially hide popup buttons */
.popup-container {
  opacity: 0;
  scale: 0.9;
  pointer-events: none;

  transition: all 0.3s ease-in-out;
  position: absolute;
  right: 1rem;
  top: -2.5rem;
  display: flex;
  gap: 0.5rem;

  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);

  font-size: 0.875rem;
  color: #374151;

  transform-origin: bottom right;
}

/* Show popup buttons on row hover only */
tbody tr.group:hover .popup-container {
  opacity: 1 !important;
  scale: 1 !important;
  pointer-events: auto !important;
}

/* Popup buttons style */
.popup-btn {
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  transition: all 0.25s ease;
  border: none;
  color: white;
  user-select: none;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

/* Edit button */
.edit-btn {
  background-color: #2563eb;
  /* blue-600 */
}

.edit-btn:hover {
  background-color: #1d4ed8;
  /* blue-700 */
  transform: scale(1.05);
  box-shadow: 0 0 8px #1d4ed8;
}

/* Delete button */
.delete-btn {
  background-color: #dc2626;
  /* red-600 */
}

.delete-btn:hover {
  background-color: #b91c1c;
  /* red-700 */
  transform: scale(1.05);
  box-shadow: 0 0 8px #b91c1c;
}

/* Arrow under popup buttons */
.popup-arrow {
  position: absolute;
  bottom: -6px;
  /* just below the popup */
  right: 16px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group:hover .popup-arrow {
  opacity: 1;
}
</style>
