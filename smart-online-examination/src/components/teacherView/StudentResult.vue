<template>
  <div class="min-h-screen px-4 py-6 lg:px-8 lg:py-10 bg-gray-100">
    <!-- Container max width -->
    <div class="max-w-6xl mx-auto">

      <!-- Header above the filter row -->
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        📊 Student Results
      </h2>

      <!-- Filters + search + export button row -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <!-- Assignment Dropdown -->
        <div class="w-full md:w-[350px]">
          <select v-model="selectedAssignment"
            class="w-full truncate rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled value="">Select Assignment</option>
            <option v-for="assign in assignments" :key="assign.id" :value="assign" :title="formatAssignment(assign)">
              {{ formatAssignment(assign) }}
            </option>
          </select>
        </div>

        <!-- Exam Dropdown -->
        <div class="w-full md:w-[250px]">
          <select v-model="selectedExamId"
            class="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled value="">Select Exam</option>
            <option v-for="exam in exams" :key="exam.id" :value="exam.id">
              {{ exam.title }}
            </option>
          </select>
        </div>

        <!-- Search Input grows -->
        <input v-model="search" type="text" placeholder="Search student..."
          class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow max-w-md" />

        <!-- Export Button aligned right -->
        <button @click="exportResults"
          class="bg-[#57cc99] hover:-translate-y-1 transform transition text-white text-md font-medium py-2 px-4 rounded-md flex-shrink-0">
          Export to Excel
        </button>
      </div>

      <!-- White box for table + modal -->
      <div class="p-6 bg-white rounded-md shadow-md">
        <div class="overflow-auto">
          <table class="min-w-full table-auto border-collapse">
            <thead>
              <tr class="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th class="py-2 px-4 text-gray-500 font-normal">#</th>
                <th class="py-2 px-4 text-gray-500 font-normal">Student</th>
                <th class="py-2 px-4 text-gray-500 font-normal">Score</th>
                <th class="py-2 px-4 text-gray-500 font-normal">Status</th>
                <th class="py-2 px-4 text-gray-500 font-normal">Submitted At</th>
                <th class="py-2 px-4 text-gray-500 font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(result, index) in filteredResults" :key="result.id" class="hover:bg-gray-50 border-b">
                <td class="py-3 px-4">{{ index + 1 }}</td>
                <td class="py-3 px-4 font-semibold">{{ result.studentName }}</td>
                <td class="py-3 px-4">{{ result.score }}</td>
                <td class="py-3 px-4 font-semibold" :class="result.score >= 50 ? 'text-green-600' : 'text-red-600'">
                  {{ result.score >= 50 ? 'Pass' : 'Fail' }}
                </td>
                <td class="py-3 px-4">{{ formatDate(result.submittedAt) }}</td>
                <td class="py-3 px-4">
                  <button @click="viewResult(result)" class="text-blue-600 text-sm hover:underline">
                    View
                  </button>
                </td>
              </tr>
              <tr v-if="filteredResults.length === 0">
                <td colspan="6" class="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Result Modal -->
      <div v-if="selectedResult" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 space-y-4">
          <h3 class="text-xl font-semibold text-gray-800">📄 Result Details</h3>
          <p><strong>Student:</strong> {{ selectedResult.studentName }}</p>
          <p><strong>Score:</strong> {{ selectedResult.score }}</p>
          <p>
            <strong>Status:</strong>
            {{ selectedResult.score >= 50 ? "Pass" : "Fail" }}
          </p>
          <p><strong>Submitted At:</strong> {{ formatDate(selectedResult.submittedAt) }}</p>

          <div class="bg-gray-50 p-3 rounded">
            <p class="text-sm text-gray-600 italic">
              * Answers and feedback coming soon *
            </p>
          </div>

          <div class="text-right">
            <button @click="selectedResult = null"
              class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from '@/config/useWebSocket';
import axios from 'axios';
import { useUserStore } from '@/store/store';
import { useToast } from 'vue-toastification';
const toast = useToast();
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      API_BASE_URL,
      userStore : null,
      assignments: [
      ],
      exams: [
        { id: 1, title: "Java Basics" },
        { id: 2, title: "Spring Boot Test" },
      ],
      selectedAssignment: "",
      selectedExamId: "",
      search: "",
      results: [
        {
          id: 1,
          studentName: "Sok Dara",
          score: 85,
          submittedAt: "2025-06-29T14:03:00",
          examId: 1,
        },
        {
          id: 2,
          studentName: "Chan Vanny",
          score: 45,
          submittedAt: "2025-06-28T10:15:00",
          examId: 2,
        },
      ],
      selectedResult: null,
    };
  },
  computed: {
    filteredResults() {
         return this.results
        .filter((r) => r.studentName.toLowerCase().includes(this.search.toLowerCase()))
        .filter((r) => {
          if (this.selectedAssignment && r.examId !== this.selectedAssignment.id)
              return false;
          if (this.selectedExamId && r.examId !== this.selectedExamId) return false;
          return true;
        });
    },
  },
     setup() {
        const router = useRouter();
        const userStore = useUserStore()
        return { userStore, router };
    },
  methods: {
    async getAssignment() {
      try {
        const teacherId = this.userStore?.user.id;
        console.log(`teacherId: `,teacherId)
        const response = await axios.get(`${API_BASE_URL}/api/assignments/teacher/${teacherId}`, {
          withCredentials: true
        })
        this.assignments = response.data;    
      } catch (err) {
        toast.error(err?.message);
      }
    },
    formatAssignment(assign){
       return `Batch ${assign.batch} - Year ${assign.year} - ${assign.major} - ${assign.location} - Shift: ${assign.shiftName} (${assign.shiftTime})`;
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString();
    },
    viewResult(result) {
      this.selectedResult = result;
    },
    exportResults() {
      alert("Export to Excel triggered (implement later)");
    },
  },
  mounted(){
    this.getAssignment();
  }
};
</script>


<style scoped>
.popup-container {
  opacity: 0;
  scale: 0.9;
  pointer-events: none;

  transition: all 0.3s ease-in-out;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;

  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);

  font-size: 0.875rem;
  color: #374151;

  transform-origin: center right;
}

tbody tr.group:hover .popup-container {
  opacity: 1 !important;
  scale: 1 !important;
  pointer-events: auto !important;
}

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

.edit-btn {
  background-color: #2563eb;
}

.edit-btn:hover {
  background-color: #1d4ed8;
  transform: scale(1.05);
  box-shadow: 0 0 8px #1d4ed8;
}

.popup-arrow {
  position: absolute;
  bottom: -6px;
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
