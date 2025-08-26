<template>
  <div class="h-full">
    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4 flex items-center">
        <div>
          <h2 class="font-semibold text-4xl mb-2 text-blue-600">
            {{ subjects.length }}
          </h2>
          <p class="text-gray-500 font-medium">Subjects</p>
        </div>
        <div class="bg-blue-100 p-3 rounded-full ml-auto">
          <BookIcon />
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex items-center">
        <div>
          <h2 class="font-semibold text-4xl mb-2 text-green-600">
            {{ departments.length }}
          </h2>
          <p class="text-gray-500 font-medium">Departments</p>
        </div>
        <div class="bg-blue-100 p-3 rounded-full ml-auto">
          <DepartmentIcon />
        </div>
      </div>
      <div class="bg-white shadow rounded-lg p-4 flex items-center">
        <div>
          <h2 class="font-semibold text-4xl mb-2 text-purple-600">
            {{ majors.length }}
          </h2>
          <p class="text-gray-500 font-medium">Majors</p>
        </div>
        <div class="bg-blue-100 p-3 rounded-full ml-auto">
          <AcademicInAcademicIcon class="text-red-500" />
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="border-b mb-4 flex space-x-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="[
          'px-4 py-2 font-medium',
          currentTab === tab
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-800',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Tab Content -->
    <div>
      <!-- Subjects Tab -->
      <div
        v-if="currentTab === 'Subjects'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Subjects</h2>
          <RippleButton
            label="Add Subject"
            @click="openSubjectPanel()"
            class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Subject
          </RippleButton>
        </header>
        <table class="w-full text-sm">
          <thead
            class="bg-gray-50 sticky top-0 z-10 border-t-2 border-gray-200 border-b-[1px]"
          >
            <tr>
              <!-- New select all checkbox -->
              <th class="px-3 py-3 flex justify-start">
                <input type="checkbox" />
              </th>

              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Name
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjects" :key="subject.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="subject.id"
                />
              </td>

              <td class="py-2 px-3">{{ subject.name }}</td>

              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6 me-1 cursor-pointer"
                  @click="openEditSubjectPanel(subject)"
                >
                  Edit
                </EditSolidIcon>
                <DeleteIcon
                  @click="deletesSubject(subject.id)"
                  class="text-red-500 cursor-pointer"
                >
                  Delete
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Departments Tab -->
      <div
        v-if="currentTab === 'Departments'"
        class="bg-white shadow rounded p-4"
      >
        <header class="flex flex-row justify-between items-center">
          <h2 class="text-lg font-semibold mb-4">Departments</h2>
          <RippleButton
            label="Add new department"
            @click="showDepartmentPanel = true"
            class="mb-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
          </RippleButton>
        </header>
        <table class="w-full text-sm">
          <thead
            class="bg-gray-50 sticky top-0 z-10 border-t-2 border-gray-200 border-b-[1px]"
          >
            <tr>
              <th class="py-3 px-3 flex justify-start text-left">
                <input type="checkbox" aria-label="Select all departments" />
              </th>
              <th class="py-3 px-3 text-left">Name</th>
              <th class="py-3 px-3 text-left">Teachers</th>
              <th class="py-3 px-3 text-left">Majors</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dept in departments" :key="dept.id" class="border-b">
              <td class="py-2 px-3">
                <input type="checkbox" aria-label="Select department" />
              </td>
              <td class="py-2 px-3">{{ dept.name }}</td>
              <td class="py-2 px-3">{{ dept.teacherCount }}</td>
              <td class="py-2 px-3">{{ dept.majorCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Majors Tab -->
      <div
        v-if="currentTab === 'Majors'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Majors</h2>
          <RippleButton
            label="Add Major"
            @click="openMajorPanel()"
            class="mb-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Major
          </RippleButton>
        </header>

        <table class="w-full text-sm">
          <thead
            class="bg-gray-50 sticky top-0 z-10 border-t-2 border-gray-200 border-b-[1px]"
          >
            <tr>
              <!-- Select all checkbox -->
              <th class="px-3 py-3 flex justify-start">
                <input type="checkbox" />
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Major Name
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Department
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="major in majors" :key="major.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedMajors"
                  :value="major.id"
                />
              </td>
              <td class="py-2 px-3">{{ major.name }}</td>
              <td class="py-2 px-3">{{ major.departmentName }}</td>
              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6"
                  @click="openEditMajorPanel(major)"
                >
                  Edit
                </EditSolidIcon>
                <DeleteIcon class="text-red-500 w-6 h-6" @click="deleteMajor(major.id)">
                  Delete
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Academic1 />
      <Academic2 />
      <Assignment />
    </div>
  </div>

  <!-- subject form -->
  <transition name="fade">
    <div
      v-if="showPanel"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showPanel = false"
    ></div>
  </transition>
  <transition name="slide">
    <div
      v-if="showPanel"
      class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
    >
      <header>
        <div class="flex items-center justify-between py-5 px-5">
          <h2 class="text-xl font-normal text-gray-700">
            {{ formSubejctTitle }}
          </h2>
          <CloseIcon
            class="h-8 w-8 cursor-pointer"
            @click="showPanel = false"
          />
        </div>
      </header>
      <hr />
      <div class="flex flex-col items-center justify-between py-5 px-5 h-full">
        <form class="w-full flex flex-col h-full">
          <!-- Subject Name -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">
              Subject Name
            </label>
            <input
              type="text"
              v-model="subjectForm.name"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2 mb-2"
              placeholder="Enter subject name"
            />
          </div>

          <!-- Major Select -->
          <div class="mt-3">
            <label class="block mb-2 text-sm font-medium text-gray-700">
              Select Major
            </label>
            <select
              v-model="subjectForm.majorId"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2"
            >
              <option value="">-- Select Major --</option>
              <option v-for="major in majors" :key="major.id" :value="major.id">
                {{ major.name }}
              </option>
            </select>

            <p class="mt-2 text-sm text-gray-600 font-normal">
              Link your subject with major here.
            </p>
          </div>

          <!-- Push button to bottom -->
          <div class="mt-auto mb-20 flex justify-between items-center">
            <button
              label="Cancel"
              bg-color="bg-gray-600"
              icon="CloseIcon"
              @click.prevent="showPanel = false"
              class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >Close</button>
            <button
              label="Save Subject"
              @click.prevent="submitSubjectForm()"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <!-- department form -->
  <transition name="fade">
    <div
      v-if="showDepartmentPanel"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showDepartmentPanel = false"
    ></div>
  </transition>
  <transition name="slide">
    <div
      v-if="showDepartmentPanel"
      class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
    >
      <header>
        <div class="flex items-center justify-between py-5 px-5">
          <h2 class="text-xl font-normal text-gray-700">
            {{ formDepartmentTitle }}
          </h2>
          <CloseIcon
            class="h-8 w-8 cursor-pointer"
            @click="showDepartmentPanel = false"
          />
        </div>
      </header>
      <hr />
      <div class="flex flex-col items-center justify-between py-5 px-5 h-full">
        <form
          class="w-full flex flex-col h-full"
          @submit.prevent="submitDepartmentForm"
        >
          <!-- Department Name -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              v-model="departmentForm.name"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2 mb-4"
              placeholder="Enter department name"
              required
            />
          </div>

          <!-- Checkbox & Select Major -->
          <div class="mb-4">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="includeMajor" class="mr-2" />
              Include Major?
            </label>

            <select
              v-if="includeMajor"
              v-model="departmentForm.majorId"
              class="mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2"
            >
              <option value="">-- Select Major --</option>
              <option v-for="major in majors" :key="major.id" :value="major.id">
                {{ major.name }}
              </option>
            </select>
          </div>

          <!-- Checkbox & Select Teacher -->
          <div class="mb-4">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="includeTeacher" class="mr-2" />
              Include Teacher?
            </label>

            <select
              v-if="includeTeacher"
              v-model="departmentForm.teacherId"
              class="mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2"
            >
              <option value="">-- Select Teacher --</option>
              <option
                v-for="teacher in teachers"
                :key="teacher.userId"
                :value="teacher.userId"
              >
                {{ teacher.fullName }}
              </option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="mt-auto mb-20 flex justify-between items-center">
            <button
              label="Cancel"
              bg-color="bg-gray-600"
              :icon="CloseIcon"
              @click.prevent="showDepartmentPanel = false"
              class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >Close</button>

            <button
              label="Save Department"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit" >Save</button>
          </div>
        </form>
      </div>
    </div>
  </transition>

  <!-- Major Form -->
  <transition name="fade">
    <div
      v-if="showMajorPanel"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showMajorPanel = false"
    ></div>
  </transition>

  <transition name="slide">
    <div
      v-if="showMajorPanel"
      class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
    >
      <header>
        <div class="flex items-center justify-between py-5 px-5">
          <h2 class="text-xl font-normal text-gray-700">
            {{ formMajorTitle }}
          </h2>
          <CloseIcon
            class="h-8 w-8 cursor-pointer"
            @click="showMajorPanel = false"
          />
        </div>
      </header>
      <hr />

      <div class="flex flex-col items-center justify-between py-5 px-5 h-full">
        <form
          class="w-full flex flex-col h-full"
          @submit.prevent="submitMajorForm"
        >
          <!-- Major Name -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">
              Major Name
            </label>
            <input
              type="text"
              v-model="majorForm.name"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2 mb-4"
              placeholder="Enter major name"
              required
            />
          </div>

          <!-- Checkbox & Select Department -->
          <div class="mb-4">
            <label class="inline-flex items-center">
              <input type="checkbox" v-model="includeDepartment" class="mr-2" />
              Include Department?
            </label>

            <select
              v-if="includeDepartment"
              v-model="majorForm.departmentId"
              class="mt-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2"
            >
              <option value="">-- Select Department --</option>
              <option
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="mt-auto mb-20 flex justify-between items-center">
            <button
              label="Cancel"
              bg-color="bg-gray-600"
              :icon="CloseIcon"
              @click.prevent="showMajorPanel = false"
              class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >Save</button>

            <button
              label="Save Major"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit"
            >Close</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import RippleButton from "../Custom/RippleButton.vue";
import DepartmentIcon from "../icons/DepartmentIcon.vue";
import BookIcon from "../icons/BookIcon.vue";
import AcademicIcon from "../icons/AcademicIcon.vue";
import EditIcon from "../icons/EditIcon.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";
import EditSolidIcon from "../icons/EditSolidIcon.vue";
import AcademicInAcademicIcon from "../icons/AcademicInAcademicIcon.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { API_BASE_URL } from "@/config/useWebSocket";
import CloseIcon from "../icons/CloseIcon.vue";
import Button from "../Custom/Button.vue";
import Swal from "sweetalert2";
import Assignment from "./Assignment.vue";
import Academic1 from "./Academic1.vue";
import Academic2 from "./Academic2.vue";
const toast = useToast();

export default {
  components: {
    BookIcon,
    DepartmentIcon,
    AcademicIcon,
    AcademicInAcademicIcon,
    CloseIcon,
    EditSolidIcon,
    RippleButton,
    Button,
    Assignment,
    Academic1,
    Academic2,
    EditIcon,
    DeleteIcon,
  },
  name: "AcademicManagement",
  data() {
    return {
      includeDepartment: false,
      majorForm: {
        id: "",
        name: "",
        departmentId: null,
      },

      departmentForm: {
        name: "",
        majorId: null,
        teacherId: null,
      },

      includeMajor: false,
      includeTeacher: false,
      // Populate this list with API call or props
      teachers: [], // Populate this list with API call or props

      subjectForm: {
        id: "" || 0,
        name: "",
        majorId: "",
      },
      isEditSubjectMode: false,

      showPanel: false,
      showDepartmentPanel: false,
      showMajorPanel: false,
      showAssignmentPanel: false,

      formSubejctTitle: "Add New Subject",
      formDepartmentTitle: "Add New Department",
      formMajorTitle: "Add New Major",
      formAssignmentTitle: "Add New Assignment",

      API_BASE_URL,
      tabs: ["Subjects", "Departments", "Majors"],
      currentTab: "Subjects",

      // data sources
      subjects: [],
      departments: [],
      majors: [],
    };
  },
  methods: {
    async submitMajorForm() {
      const payload = {
        id: this.majorForm.id,
        name: this.majorForm.name,
        departmentId: this.includeDepartment
          ? this.majorForm.departmentId
          : null,
      };

      try {
        let response;
        if (this.isEditMajorMode && payload.id) {
          // UPDATE
          response = await axios.put(
            `${API_BASE_URL}/api/admins/updateMajor`,
            payload,
            { withCredentials: true }
          );
        } else {
          // CREATE
          response = await axios.post(
            `${API_BASE_URL}/api/admins/createMajor`,
            payload,
            { withCredentials: true }
          );
        }

        if (response.data.success) {
          toast.success(
            this.isEditMajorMode
              ? "Major updated successfully"
              : "Major added successfully",
            { position: "bottom-center" }
          );
          this.fetchMajors();
          this.showMajorPanel = false;
        } else {
          toast.error(response.data.message || "Failed to save major", {
            position: "bottom-center",
          });
        }
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to save major", {
          position: "bottom-center",
        });
      }
    },
    async deleteMajor(id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) return;

      try {
        const response = await axios.delete(
          API_BASE_URL + `/api/admins/deleteMajor/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success("Major deleted successfully", {
            position: "bottom-center",
          });
          this.fetchMajors();
        } else {
          toast.error(response.data.message || "Failed to delete major", {
            position: "bottom-center",
          });
        }
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to delete major", {
          position: "bottom-center",
        });
      }
    },
    openMajorPanel() {
      this.isEditMajorMode = false;
      this.formMajorTitle = "Add New Major";
      this.majorForm = { id: null, name: "", departmentId: null };
      this.includeDepartment = false;
      this.showMajorPanel = true;
    },
    openEditMajorPanel(major) {
      this.isEditMajorMode = true;
      this.formMajorTitle = "Edit Major";

      this.majorForm = {
        id: major.id,
        name: major.name,
        departmentId: major.departmentId ? Number(major.departmentId) : null,
      };

      this.includeDepartment = !!major.departmentId;
      this.showMajorPanel = true;

      console.log("major id: ", this.majorForm.id);
      console.log("department id: ", this.majorForm.departmentId);
    },
    async submitDepartmentForm() {
      // Prepare payload only if includeMajor/includeTeacher is checked
      const payload = {
        name: this.departmentForm.name,
        majorId: this.includeMajor ? this.departmentForm.majorId : null,
        teacherId: this.includeTeacher ? this.departmentForm.teacherId : null,
      };

      console.log("Submit department data:", payload);

      try {
        const response = await axios.post(
          API_BASE_URL + "/api/admins/createDepartment",
          payload,
          { withCredentials: true }
        );
        if (response.data.success) {
          toast.success("Department added successfully", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.error(response.data.message || "failed to save department!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message || "failed to save department", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }

      // Make your API call here with payload
      // axios.post('/api/departments', payload) ...
    },
    async submitSubjectForm() {
      if (!this.subjectForm.name) {
        toast.error("Subject name is required.", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      try {
        let res;

        if (this.isEditSubjectMode && this.subjectForm.id) {
          // EDIT mode → send PUT request
          res = await axios.put(
            `${this.API_BASE_URL}/api/subjects`,
            this.subjectForm,
            { withCredentials: true }
          );
        } else {
          // ADD mode → send POST request
          res = await axios.post(
            `${this.API_BASE_URL}/api/subjects`,
            this.subjectForm,
            { withCredentials: true }
          );
        }

        if (res.data.success) {
          if (this.isEditSubjectMode) {
            // Update local array without fetching again
            const index = this.subjects.findIndex(
              (s) => s.id === this.subjectForm.id
            );
            if (index !== -1) {
              this.subjects[index] = res.data.data;
            }
            this.fetchSubjects();
            toast.success("Subject updated successfully.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            this.fetchSubjects();
            toast.success("Subject added successfully.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          // Close panel & reset
          this.resetSubjectForm();
        } else {
          toast.error("Operation failed: " + res.data.message, {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (err) {
        console.error("Error saving subject", err);
        toast.error("An error occurred while saving the subject.", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
    resetSubjectForm() {
      this.subjectForm = { id: 0, name: "", majorId: "" };
      this.isEditSubjectMode = false;
      this.showPanel = false;
    },
    openEditSubjectPanel(subject) {
      this.subjectForm = {
        id: subject.id, // keep id for update
        name: subject.name || "",
        majorId: subject.majorId || "", // or however you get major ID from subject
      };
      for (const [key, value] of Object.entries(subject)) {
        console.log(`${key}: ${value}`);
      }
      this.isEditSubjectMode = true;
      this.formSubejctTitle = "Edit Subject";
      this.showPanel = true;
    },
    openSubjectPanel() {
      this.resetSubjectForm();
      this.showPanel = true;
      this.formSubejctTitle = "Add New Subject";
    },
    async fetchTeachers() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/admins/getTeacherForAddingDepartment",
          { withCredentials: true }
        );
        console.table(response.data.data);
        if (response.data.success) {
          this.teachers = response.data.data;
        } else {
          toast.error("falied to fetch teacher!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
          this.teachers = [];
        }
      } catch (e) {
        console.log(e);
        toast.error("falied to fetch teacher!", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
        this.teachers = [];
      }
    },
    async fetchSubjects() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/subjects", {
          withCredentials: true,
        });

        console.log(res.data);
        if (res.data.success) this.subjects = res.data.data;
      } catch (err) {
        console.error("Subjects fetch error", err);
      }
    },
    async fetchMajors() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/majors", {
          withCredentials: true,
        });
        if (res.data.success) this.majors = res.data.data;
      } catch (err) {
        console.error("Majors fetch error", err);
      }
    },
    async fetchDepartments() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/departments/summary", {
          withCredentials: true,
        });
        this.departments = res.data;
      } catch (err) {
        console.error("Departments fetch error", err);
      }
    },
    async deletesSubject(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel",
        });

        if (!result.isConfirmed) {
          return; // User cancelled
        }

        const response = await axios.delete(
          API_BASE_URL + `/api/subjects/${id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          this.fetchSubjects();
          toast.success("Subject deleted successfully!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.error("Subject deleted failed!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (e) {
        console.log(e);
        toast.error(e.getMessage || "failed to delete subject", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
  },
  mounted() {
    this.fetchTeachers();
    this.fetchSubjects();
    this.fetchMajors();
    this.fetchDepartments();
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
</style>
