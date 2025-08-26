<!-- TeachingAssignmentsTable.vue -->
<template>
  <div class="bg-white shadow rounded p-4 mt-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Teaching Assignments</h2>
      <button
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        @click="openAssign()"
      >
        + New Assign
      </button>
    </div>

    <!-- Filters -->
    <div class="grid md:grid-cols-6 sm:grid-cols-2 gap-3 mb-4">
      <input
        v-model.trim="filters.search"
        type="text"
        placeholder="Search subject/major/batch"
        class="border rounded px-3 py-2 col-span-2 md:col-span-2"
      />

      <select v-model="filters.batchId" class="border rounded px-3 py-2">
        <option value="" disabled>select batch</option>
        <option v-for="b in batches" :key="b.id" :value="String(b.id)">
          {{ b.name || b.batchName || "Batch " + b.id }}
        </option>
      </select>

      <select v-model="filters.majorId" class="border rounded px-3 py-2">
        <option value="" disabled>Select major</option>
        <option v-for="m in majors" :key="m.id" :value="String(m.id)">
          {{ m.name }}
        </option>
      </select>

      <select v-model="filters.yearId" class="border rounded px-3 py-2">
        <option value="" disabled>Select academic year</option>
        <option v-for="y in years" :key="y.id" :value="String(y.id)">
          {{ y.year || y.name }}
        </option>
      </select>

      <select v-model="filters.semesterId" class="border rounded px-3 py-2">
        <option value="" disabled>Select semester</option>
        <option v-for="s in semesters" :key="s.id" :value="String(s.id)">
          {{ s.name || "Semester " + s.number }}
        </option>
      </select>

      <select v-model="filters.shiftId" class="border rounded px-3 py-2">
        <option value="" disabled>Select shift</option>
        <option v-for="sh in shifts" :key="sh.id" :value="String(sh.id)">
          {{ sh.name }} ({{ sh.startTime }}-{{ sh.endTime }})
        </option>
      </select>

      <!-- Reset Button -->
      <button
        type="button"
        @click="resetFilters"
        class="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
      >
        Reset Filters
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 sticky top-0">
          <tr class="text-left">
            <th class="py-2 px-3">Batch</th>
            <th class="py-2 px-3">Major</th>
            <th class="py-2 px-3">Subject</th>
            <th class="py-2 px-3">Year</th>
            <th class="py-2 px-3">Semester</th>
            <th class="py-2 px-3">Shift</th>
            <th class="py-2 px-3">Room</th>
            <th class="py-2 px-3">Teachers</th>
            <th class="py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filteredAssignedTos"
            :key="row.id"
            class="border-b align-top"
          >
            <td class="py-2 px-3">{{ row.batch }}</td>
            <td class="py-2 px-3">{{ row.major }}</td>
            <td class="py-2 px-3">
              {{ row.subject?.name || row.subjectName }}
            </td>
            <td class="py-2 px-3">{{ row.academicYear?.year || row.year }}</td>
            <td class="py-2 px-3">
              {{
                row.semester?.name ||
                "S" + (row.semester?.number ?? row.semesterNumber)
              }}
            </td>
            <td class="py-2 px-3">
              <span>{{ row.shift?.name || row.shiftName }}</span>
              <span v-if="row.shift?.startTime">
                ({{ row.shift.startTime }}-{{ row.shift.endTime }})</span
              >
              <span v-else-if="row.shiftTime"> ({{ row.shiftTime }})</span>
            </td>
            <td class="py-2 px-3">
              <div
                class="max-w-[160px] truncate"
                :title="
                  formatLocation(
                    row.buildingName,
                    row.floorNumber,
                    row.location
                  )
                "
              >
                {{
                  formatLocation(
                    row.buildingName,
                    row.floorNumber,
                    row.location
                  )
                }}
              </div>
            </td>
            <td class="py-2 px-3">
              <div v-if="teachersByAssigned[row.id]">
                {{ teachersByAssigned[row.id].teacherName || "—" }}
              </div>
              <div v-else class="text-gray-400">—</div>
            </td>

            <td class="py-2 px-3">
              <template v-if="teachersByAssigned[row.id]">
                <!-- When already assigned -->
                <button
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-1"
                  @click="editAssign(row)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mr-1"
                  @click="deleteAssign(row)"
                >
                  Delete
                </button>
                <button
                  class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                  @click="changeTeacher(row)"
                >
                  Midefind
                </button>
              </template>

              <template v-else>
                <!-- When not assigned -->
                <button
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  @click="openAssign(row)"
                >
                  Assign
                </button>
              </template>
            </td>
          </tr>

          <tr v-if="!pagedAssignedTos.length">
            <td colspan="9" class="py-6 text-center text-gray-500">
              No results
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-600">
        Page {{ page }} / {{ totalPages }} •
        {{ filteredAssignedTos.length }} results
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1 border rounded disabled:opacity-40"
          :disabled="page === 1"
          @click="page = 1"
        >
          «
        </button>
        <button
          class="px-3 py-1 border rounded disabled:opacity-40"
          :disabled="page === 1"
          @click="page--"
        >
          Prev
        </button>
        <select v-model.number="pageSize" class="border rounded px-2 py-1">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
        <button
          class="px-3 py-1 border rounded disabled:opacity-40"
          :disabled="page === totalPages || totalPages === 0"
          @click="page++"
        >
          Next
        </button>
        <button
          class="px-3 py-1 border rounded disabled:opacity-40"
          :disabled="page === totalPages || totalPages === 0"
          @click="page = totalPages"
        >
          »
        </button>
      </div>
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="assignDrawer.open"
        class="fixed inset-0 bg-gray-800 bg-opacity-60 z-40"
        @click="closeAssign"
      ></div>
    </transition>

    <!-- Drawer / Panel -->
    <transition name="slide">
      <div
        v-if="assignDrawer.open"
        class="fixed top-0 right-0 h-full w-[420px] bg-white shadow-xl z-50 p-4 overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold">
            {{ assignDrawer.row ? "Edit Assignment" : "Add New Assignment" }}
          </h3>
          <button class="p-2 rounded hover:bg-gray-100" @click="closeAssign">
            ✕
          </button>
        </div>

        <!-- Form -->
        <div class="space-y-3">
          <!-- Batch -->
          <div>
            <label class="block mb-1 font-medium">Batch</label>
            <select
              v-model="assignDrawer.batchId"
              class="border rounded px-3 text-black py-2 w-full"
            >
              <option value="" disabled>Select Batch</option>
              <option
                class="text-black"
                v-for="b in batches"
                :key="b.id"
                :value="b.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ b.batchName }}
              </option>
            </select>
          </div>

          <!-- Major -->
          <div>
            <label class="block mb-1 font-medium">Major</label>
            <select
              v-model="assignDrawer.majorId"
              class="border rounded text-black px-3 py-2 w-full"
            >
              <option value="" disabled>Select Major</option>
              <option
                v-for="m in majors"
                :key="m.id"
                :value="m.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ m.name }}
              </option>
            </select>
          </div>

          <!-- Subject -->
          <div>
            <label class="block mb-1 font-medium">Subject</label>
            <select
              v-model="assignDrawer.subjectId"
              class="border rounded text-black px-3 py-2 w-full"
            >
              <option value="" disabled>Select Subject</option>
              <option
                v-for="s in subjects"
                :key="s.id"
                :value="s.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ s.name }}
              </option>
            </select>
          </div>

          <!-- Academic Year -->
          <div>
            <label class="block mb-1 font-medium">Academic Year</label>
            <select
              v-model="assignDrawer.yearId"
              class="border rounded px-3 text-black py-2 w-full"
            >
              <option value="" disabled>Select Academic Year</option>
              <option
                v-for="y in years"
                :key="y.id"
                :value="y.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ y.name }}
              </option>
            </select>
          </div>

          <!-- Semester -->
          <div>
            <label class="block mb-1 font-medium">Semester</label>
            <select
              v-model="assignDrawer.semesterId"
              class="border rounded text-black px-3 py-2 w-full"
            >
              <option value="" disabled>Select Semester</option>
              <option
                v-for="s in semesters"
                :key="s.id"
                :value="s.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ s.name || "S" + s.number }}
              </option>
            </select>
          </div>

          <!-- Shift -->
          <div>
            <label class="block mb-1 font-medium">Shift</label>
            <select
              v-model="assignDrawer.shiftId"
              class="border rounded text-black px-3 py-2 w-full"
            >
              <option value="" disabled>Select Shift</option>
              <option
                v-for="sh in shifts"
                :key="sh.id"
                :value="sh.id"
                :disabled="assignDrawer.mode === 'edit'"
              >
                {{ sh.name }}
              </option>
            </select>
          </div>

          <!-- Teacher -->
          <div>
            <label class="block mb-1 font-medium">Teacher</label>
            <input
              v-model="teacherSearch"
              type="text"
              placeholder="Search teacher"
              class="border rounded text-black px-3 py-2 w-full mb-2"
            />
            <label
              v-for="t in filteredTeachers"
              :key="t.id"
              class="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50"
            >
              <input
                type="radio"
                :value="t.teacherId"
                v-model="assignDrawer.selectedTeacherId"
              />
              <span class="truncate">{{
                t.name || t.firstName + " " + t.lastName
              }}</span>
            </label>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2 mt-4">
            <button
              class="flex-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              @click="saveAssignForRow"
            >
              Save
            </button>
            <button
              class="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded"
              @click="closeAssign"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config/useWebSocket";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "TeachingAssignmentsTable",
  data() {
    return {
      // data
      assignedTos: [],
      majors: [],
      semesters: [],
      years: [],
      shifts: [],
      subjects: [],
      academicYear: [],
      batches: [],
      teachers: [],
      teachersByAssigned: {}, // { assignedToId: [{id, name}, ...] }

      // filters + paging
      filters: {
        search: "",
        batchId: "",
        majorId: "",
        yearId: "",
        semesterId: "",
        shiftId: "",
      },
      page: 1,
      pageSize: 10,

      // drawer
      assignDrawer: {
        open: false,
        row: null,
        selectedTeacherId: null,
        mode: "create", // single value for the selected teacher
      },

      teacherSearch: "",
      loading: false,
    };
  },
  computed: {
    filteredAssignedTos() {
      console.log("Raw assignedTos:", this.assignedTos);
      console.log("Current filters:", this.filters);

      return this.assignedTos.filter((row) => {
        console.log("Checking row:", row);

        const searchTerm = this.filters.search?.toLowerCase() || "";
        const matchesSearch =
          !searchTerm ||
          row.subjectName?.toLowerCase().includes(searchTerm) ||
          row.major?.toLowerCase().includes(searchTerm) ||
          row.batch?.toLowerCase().includes(searchTerm);

        const matchesBatch =
          !this.filters.batchId ||
          String(row.batchId) === String(this.filters.batchId);

        const matchesMajor =
          !this.filters.majorId ||
          String(row.majorId) === String(this.filters.majorId);

        const matchesYear =
          !this.filters.yearId ||
          String(row.academicYearId) === String(this.filters.yearId);

        const matchesSemester =
          !this.filters.semesterId ||
          String(row.semesterId) === String(this.filters.semesterId) ||
          String(row.semesterNumber) === String(this.filters.semesterId);

        const matchesShift =
          !this.filters.shiftId ||
          String(row.shiftId) === String(this.filters.shiftId);

        const result =
          matchesSearch &&
          matchesBatch &&
          matchesMajor &&
          matchesYear &&
          matchesSemester &&
          matchesShift;

        console.log("Result for row", row.id, ":", result);

        return result;
      });
    },
    pagedAssignedTos() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredAssignedTos.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.max(
        1,
        Math.ceil(this.filteredAssignedTos.length / this.pageSize)
      );
    },
    filteredTeachers() {
      const q = this.teacherSearch.toLowerCase();
      return this.teachers.filter((t) => {
        const name = (t.name || t.firstName + " " + t.lastName).toLowerCase();
        return !q || name.includes(q);
      });
    },
  },
  watch: {
    // reset to first page on filter change
    filters: {
      handler() {
        this.page = 1;
      },
      deep: true,
    },
  },
  methods: {
    resetFilters() {
      this.filters = {
        search: "",
        batchId: "",
        majorId: "",
        yearId: "",
        semesterId: "",
        shiftId: "",
      };
    },
    getSafe(obj, ...keys) {
      for (const k of keys) {
        if (obj?.[k]) return obj[k];
      }
      return null;
    },
    formatLocation(b, f, r) {
      if (!b || !f || !r) return "—";
      return [b, f, r].filter(Boolean).join(" • ");
    },

    // Opens drawer for new assignment or editing
    openAssign(row = null) {
      this.assignDrawer.open = true;
      this.assignDrawer.row = row;
      this.assignDrawer.mode = row ? "fullEdit" : "create";

      if (row) {
        // Editing existing assignment
        const assignedTeacher = this.teachersByAssigned[row.id];
        this.assignDrawer.selectedTeacherIds = assignedTeacher
          ? [assignedTeacher.teacherId] // preselect the currently assigned teacher
          : [];
      } else {
        // Adding new assignment
        this.assignDrawer.selectedTeacherId = [];
      }

      this.teacherSearch = "";
    },

    changeTeacher(row) {
      this.assignDrawer.open = true;
      this.assignDrawer.row = row;
      this.assignDrawer.mode = "edit";

      this.assignDrawer.batchId = row.batchId || "";
      this.assignDrawer.majorId = row.majorId || "";
      this.assignDrawer.subjectId = row.subjectId || "";
      this.assignDrawer.yearId = row.academicYearId || "";
      this.assignDrawer.semesterId = row.semesterId || row.semesterNumber || "";
      this.assignDrawer.shiftId = row.shiftId || "";

      const assignedTeacherRow = this.teachersByAssigned[row.id] || null;

      console.log("assignedTeacherRow:", assignedTeacherRow);

      // Preselect the teacher ID from the full row object
      this.assignDrawer.selectedTeacherId = assignedTeacherRow
        ? assignedTeacherRow.teacherId
        : null;

      console.log("selectedTeacherId:", this.assignDrawer.selectedTeacherId);

      this.teacherSearch = "";
    },
    saveAssignForRow() {
      if (!this.assignDrawer.row) return;

      let payload;

      if (this.assignDrawer.mode === "edit") {
        // Only teacher change
        payload = {
          teachingAssignmentId: this.assignDrawer.row.id, // <-- send this
          teacherId: this.assignDrawer.selectedTeacherId,
        };

        console.table(payload);
      } else {
        // Create or full edit
        payload = {
          assignedToId: this.assignDrawer.row.id,
          teacherId: this.assignDrawer.selectedTeacherId,
          batchId: this.assignDrawer.row.batchId,
          majorId: this.assignDrawer.row.majorId,
          subjectId: this.assignDrawer.row.subjectId,
          yearId: this.assignDrawer.row.academicYearId,
          semesterId:
            this.assignDrawer.row.semesterId ||
            this.assignDrawer.row.semesterNumber,
          shiftId: this.assignDrawer.row.shiftId,
        };
      }

      axios
        .post(API_BASE_URL + "/api/teaching-assignments", payload, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Teacher assignment updated", {
              position: "bottom-center",
            });
            // Update local mapping
            this.teachersByAssigned[this.assignDrawer.row.id] = {
              teacherId: this.assignDrawer.selectedTeacherId,
              teacherName: this.teachers.find(
                (t) => t.id === this.assignDrawer.selectedTeacherId
              )?.name,
            };
            this.closeAssign();
            this.fetchAssignedTos();
          } else {
            toast.error(res.data.message || "Failed to save", {
              position: "bottom-center",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error saving assignment", { position: "bottom-center" });
        });
    },
    closeAssign() {
      this.assignDrawer = { open: false, row: null, selectedTeacherIds: [] };
      this.teacherSearch = "";
    },

    // Data loads
    async fetchAssignedTos() {
      try {
        // Your API should return an array of AssignedTo with nested relations
        const res = await axios.get(API_BASE_URL + "/api/assignments", {
          withCredentials: true,
        });
        this.assignedTos = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data || [];
        console.table(this.assignedTos);
      } catch (e) {
        console.error("fetchAssignedTos", e);
      }
    },
    async fetchTeachers() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/admins/teacher/all", {
          withCredentials: true,
        });
        this.teachers = res.data?.data || [];
      } catch (e) {
        console.error("fetchTeachers", e);
      }
    },
    async fetchMeta() {
      try {
        const [maj, sem, yr, sh, bt, sub] = await Promise.all([
          axios.get(API_BASE_URL + "/api/majors/all", {
            withCredentials: true,
          }),
          axios.get(API_BASE_URL + "/api/semesters", { withCredentials: true }),
          axios.get(API_BASE_URL + "/api/academic-years", {
            withCredentials: true,
          }),
          axios.get(API_BASE_URL + "/api/shifts", { withCredentials: true }),
          axios.get(API_BASE_URL + "/api/batchs", { withCredentials: true }),
          axios.get(API_BASE_URL + "/api/subjects", { withCredentials: true }),
        ]);

        console.log("Log batch: ", bt.data);

        this.majors = maj.data?.data || [];
        this.semesters = sem.data?.data || [];
        this.years = yr.data?.data || [];
        this.shifts = sh.data?.data || [];
        this.batches = bt.data?.data || [];
        this.subjects = sub.data?.data || [];
      } catch (e) {
        console.error("fetchMeta", e);
      }
    },

    // optional: preload mapping assignedToId -> teachers[]
    async fetchTeachersByAssigned() {
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/teaching-assignments",
          { withCredentials: true }
        );
        console.log("teaching assignmnt: ", res.data);

        const map = {};
        (res.data || []).forEach((row) => {
          map[row.assignedToId] = row; // <-- assign the whole row object
        });

        this.teachersByAssigned = map;
      } catch (e) {
        console.error("fetchTeachersByAssigned", e);
      }
    },
  },
  async mounted() {
    await Promise.all([
      this.fetchAssignedTos(),
      this.fetchTeachers(),
      this.fetchMeta(),
      this.fetchTeachersByAssigned(),
    ]);
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

/* optional: shorter fade for internal elements */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
