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
              @click="showModalImage = true"
              class="w-full h-full object-cover"
              :src="
                API_BASE_PROFILE_URL + '/' + teacherInfo.info.profilePicture
              "
              alt="Teacher Avatar"
            />
            <div
              v-if="showModalImage"
              class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              @click.self="showModalImage = false"
            >
              <img
                :src="
                  API_BASE_PROFILE_URL + '/' + teacherInfo.info.profilePicture
                "
                alt="Student Avatar"
                class="max-w-full max-h-full rounded"
              />
            </div>
          </div>
          <h2 class="text-3xl font-bold mt-2 text-[#03045e]">
            {{ teacherInfo.info?.name }}
          </h2>
          <div class="text-section text-start space-y-1">
            <span class="block text-gray-600 font-semibold text-md">
              Full name:
              <span class="text-gray-600 text-md font-normal">
                {{ teacherInfo.info?.name }}
              </span>
            </span>

            <span class="block text-gray-600 font-semibold text-md">
              Gender:
              <span class="text-gray-600 text-md font-normal">
                {{ teacherInfo.info?.gender }}
              </span>
            </span>

            <span class="block text-gray-600 font-semibold text-md">
              Role:
              <span class="text-gray-600 text-md font-normal">
                {{ formatRole(teacherInfo.info?.role) }}
              </span>
            </span>

            <span
              class="block text-gray-600 font-semibold text-md"
              v-if="teacherInfo?.info.departments?.length"
            >
              Departments:
              <span class="text-gray-600 text-md font-normal">
                <span
                  v-for="(dept, index) in teacherInfo.info.departments"
                  :key="index"
                >
                  {{ dept.name
                  }}<span
                    v-if="index !== teacherInfo.info.departments.length - 1"
                    >,
                  </span>
                </span>
              </span>
            </span>

            <span class="block text-gray-600 font-semibold text-md">
              Email:
              <span class="text-gray-600 text-md font-normal">
                {{ teacherInfo.info?.email }}
              </span>
            </span>

            <span class="block text-gray-600 font-semibold text-md">
              Phone:
              <span class="text-gray-600 text-md font-normal">
                {{ teacherInfo.info?.phone }}
              </span>
            </span>
          </div>

          <div class="flex flex-row gap-3 mt-4">
            <div class="flex flex-row">
              <button
                @click="openEditModal"
                class="flex items-center gap-2 px-4 py-2 rounded-md shadow-md text-white bg-[#8C09F4] font-normal text-md"
              >
                <EditIcon class="w-5 h-5" />
                Edit
              </button>
            </div>
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
          <!-- Exams Table -->
          <section class="">
            <header class="flex flex-row justify-between items-center">
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Recent exams created
              </h2>
              <p class="text-sm text-gray-600 font-semibold">View all</p>
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
                      EXAM
                    </th>
                    <th
                      class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                    >
                      DATE
                    </th>
                    <th
                      class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                    >
                      TYPE
                    </th>
                    <th
                      class="px-4 py-3 text-left text-md font-semibold text-gray-600"
                    >
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 bg-white">
                  <tr
                    v-for="exam in exams"
                    :key="exam.id"
                    class="border-t hover:bg-gray-100 transition"
                  >
                    <td class="py-3 px-4">{{ exam.name }}</td>
                    <td class="py-3 px-4">{{ formatDate(exam.date) }}</td>
                    <td class="py-3 px-4">{{ exam.type }}</td>
                    <td
                      class="py-3 px-4 font-medium"
                      :class="{
                        'text-green-600': exam.status === 'Upcoming',
                        'text-red-600': exam.status === 'Completed',
                        'text-yellow-600': exam.status === 'Missed',
                      }"
                    >
                      {{ exam.status }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
              v-if="teacherInfo.recentActivities.length"
              class="space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
            >
              <div
                v-for="a in teacherInfo.recentActivities"
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
        <!-- security -->
        <section class="w-full mt-4 h-full">
          <header>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Security</h2>
          </header>
          <h2 class="text-xl font-normal text-gray-700 mb-4">
            Change password
          </h2>
          <form action="" @submit.prevent="handleChangePasswordOfThisUser()">
            <div
              class="w-full flex md:flex-row flex-col justify-between gap-3 my-5"
            >
              <div class="w-full">
                <PasswordInput label="New Password" v-model="newPassword" />
              </div>
              <div class="w-full">
                <PasswordInput
                  label="Confirm New Password"
                  v-model="confirmPassowrd"
                />
              </div>
            </div>
            <div v-if="changePassError">
              <p class="text-sm text-red-500 font-normal">
                {{ changePassError }}
              </p>
            </div>
            <div v-if="changePassSuccess">
              <p class="text-sm text-green-500 font-normal">
                {{ changePassSuccess }}
              </p>
            </div>
            <div class="my-5">
              <p class="text-gray-600 font-medium text-sm">
                Password Requirements
              </p>
              <ul class="list-disc pl-8 mt-2 gap-2">
                <li class="text-gray-500 font-normal text-sm py-2">
                  Minimum 8 characters long - the more, the better
                </li>
                <li class="text-gray-500 font-normal text-sm py-2">
                  At least one lowercase character
                </li>
                <li class="text-gray-500 font-normal text-sm py-2">
                  At least one number, symbol, or whitespace character
                </li>
              </ul>
            </div>
            <div class="flex justify-start gap-3">
              <button
                type="submit"
                class="text-white bg-[#8C09F4] px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]shadow-md"
              >
                Save change
              </button>
              <button
                class="text-gray-600 bg-gray-600 bg-opacity-20 font-medium px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

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
                  v-for="recent in teacherInfo.recentDevices"
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
      <header class="flex items-center justify-between py-5 px-5">
        <h2 class="text-xl font-normal text-gray-700">Edit Teacher Info</h2>
        <CloseIcon class="h-8 w-8 cursor-pointer" @click="showPanel = false" />
      </header>
      <hr />

      <div>
        <form
          @submit.prevent="submitEditForm"
          class="flex-1 overflow-y-auto p-4 h-screen"
        >
          <!-- First Name -->
          <div class="mb-4">
            <label class="text-md font-medium text-gray-600 mb-1 block">
              First name
            </label>
            <input
              v-model="editTeacherForm.firstName"
              type="text"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Last Name -->
          <div class="mb-4">
            <label class="text-md font-medium text-gray-600 mb-1 block">
              Last name
            </label>
            <input
              v-model="editTeacherForm.lastName"
              type="text"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Gender -->
          <div class="mb-4">
            <label class="text-md font-medium text-gray-600 mb-1 block">
              Gender
            </label>
            <select
              v-model="editTeacherForm.gender"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="text-md font-medium text-gray-600 mb-1 block">
              Email
            </label>
            <input
              v-model="editTeacherForm.email"
              type="email"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Phone -->
          <div class="mb-4">
            <label class="text-md font-medium text-gray-600 mb-1 block">
              Phone number
            </label>
            <input
              v-model="editTeacherForm.phone"
              type="text"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          <!-- Department(s) -->
          <div class="mb-4 relative w-full">
            <label class="block text-md font-medium text-gray-700 mb-1">
              Department(s)
            </label>
            <div
              class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-600 cursor-pointer focus-within:ring-1 focus-within:ring-purple-500"
              @click="dropdownOpen = !dropdownOpen"
            >
              <span
                class="text-gray-400"
                v-if="selectedDepartments.length === 0"
              >
                Select department(s)
              </span>
              <span class="text-gray-700" v-else>
                {{ selectedDepartments.length }} selected
              </span>
            </div>
            <div
              v-if="dropdownOpen"
              class="absolute left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow z-50"
            >
              <ul>
                <li
                  v-for="dp in departments"
                  :key="dp.id"
                  @click.stop="toggleDepartment(dp.id)"
                  class="flex items-center px-4 py-2 hover:bg-purple-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :checked="selectedDepartments.includes(dp.id)"
                    class="mr-2"
                  />
                  <span>{{ dp.name }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Profile Picture -->
          <div class="mb-4">
            <label class="block text-md font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <div
              @click="$refs.imageInput.click()"
              class="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-purple-500"
            >
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
              />
              <template v-if="imagePreview">
                <img
                  :src="imagePreview"
                  class="h-64 w-full object-cover rounded-md shadow"
                />
                <p class="text-sm text-gray-500 mt-3">Click to change image</p>
              </template>
              <template v-else>
                <svg
                  class="w-14 h-14 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 15a4 4 0 01.88-2.51m0 0A4 4 0 017 11h10a4 4 0 014 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm0 0L4 9m0 0L4 5m0 0h16m0 0l-1 4m0 0l-1 4"
                  />
                </svg>
                <p class="mt-2 text-sm text-gray-500">
                  Click or drag image to upload
                </p>
              </template>
            </div>
          </div>

          <!-- Save button -->
          <div class="flex gap-2">
            <button
              type="submit"
              class="text-white bg-[#8C09F4] px-6 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              @click="showPanel = false"
              class="text-red-500 bg-red-200 px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
          <p class="mt-96"></p>
        </form>
      </div>
    </div>
  </transition>
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
import { POSITION, useToast } from "vue-toastification";

const toast = useToast();
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
      showModalImage: false,
      imagePreview: null,
      dropdownOpen: false,
      showPanel: false,
      updateTeacherModelError: "",
      updateTeacherModelSuccess: "",
      selectedDepartments: [],
      editTeacherForm: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        departments: [],
        profilePicture: null,
        phone: "",
      },
      departments: [],
      showEditModal: false,
      changePassSuccess: "",
      changePassError: "",
      confirmPassowrd: "",
      oldPassword: "",
      newPassword: "",
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      teacherInfo: {
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
    async loadTeacherIfo() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/teachers/" + this.userId,
          { withCredentials: true }
        );
        this.teacherInfo.info = response.data.data;
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
        this.teacherInfo.recentDevices = data;
        console.log(this.teacherInfo.recentDevices);
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
        console.log(response.data);
        this.teacherInfo.recentActivities = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async submitEditForm() {
      try {
        this.editTeacherForm.departments = this.selectedDepartments;

        const formData = new FormData();
        formData.append("userId", this.editTeacherForm.userId);
        formData.append("firstName", this.editTeacherForm.firstName);
        formData.append("lastName", this.editTeacherForm.lastName);
        formData.append("gender", this.editTeacherForm.gender);
        formData.append("email", this.editTeacherForm.email);
        formData.append("phone", this.editTeacherForm.phone);
        formData.append(
          "departments",
          JSON.stringify(this.editTeacherForm.departments)
        );

        if (this.editTeacherForm.profilePicture instanceof File) {
          formData.append(
            "profilePicture",
            this.editTeacherForm.profilePicture
          );
        }

        // Debug
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const response = await axios.put(
          API_BASE_URL + "/api/teachers/update-for-admin",
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success("Teacher updated successfully!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
          this.loadTeacherIfo();
          this.showPanel = false;
        } else {
          toast.error( response.data.message || "Failed to update teacher!", {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (error) {
        console.error("Error updating teacher info:", error);
      }
    },
    // ...existing methods
    async openEditModal() {
      // Ensure latest teacher data is loaded
      await this.loadTeacherIfo();
      // Ensure all departments list is loaded
      await this.fetchDepartments();

      const s = this.teacherInfo.info;

      this.editTeacherForm = {
        userId: s.teacherId || "",
        firstName: s.firstName || "",
        lastName: s.lastName || "",
        profilePicture: s.profilePicture || null,
        gender: s.gender || "",
        email: s.email || "",
        phone: s.phone || "",
        departments: s.departments || [],
      };

      // Preselect department IDs
      this.selectedDepartments = (s.departments || []).map((dep) => dep.id);

      // Show profile picture preview
      this.imagePreview = s.profilePicture
        ? `${this.API_BASE_PROFILE_URL}/${s.profilePicture}`
        : null;

      this.showPanel = true;
    },
    toggleDepartment(depId) {
      if (this.selectedDepartments.includes(depId)) {
        this.selectedDepartments = this.selectedDepartments.filter(
          (id) => id !== depId
        );
      } else {
        this.selectedDepartments.push(depId);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.editTeacherForm.profilePicture = file; // store file object for upload
        this.imagePreview = URL.createObjectURL(file); // show preview
      }
    },
    async handleChangePasswordOfThisUser() {
      if (this.newPassword !== this.confirmPassowrd) {
        this.changePassError =
          "New password and confirm password do not match.";
        return;
      }
      try {
        const response = await axios.put(
          API_BASE_URL + "/api/user/changePasswordForAdmin",
          {
            userId: this.userId,
            newPassword: this.newPassword,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data.success === true) {
          this.changePassSuccess =
            response.data.message || "Password changed successfully.";
          this.newPassword = "";
          this.confirmPassowrd = "";
        } else {
          this.changePassError =
            response.data.message || "Failed to change password.";
        }
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data && e.response.data.message) {
          this.changePassError = e.response.data.message;
        } else {
          this.changePassError =
            "An error occurred while changing the password.";
        }
      }
    },
    async fetchDepartments() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/departments/all",
          { withCredentials: true }
        );
        this.departments = response.data.data;
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },
  },
  mounted() {
    this.fetchDepartments();
    this.loadTeacherIfo();
    this.fetchRecentDevices();
    this.fetchUserRecentAction();
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
/* Optional: Custom Scrollbar */
::-webkit-scrollbar-track {
  background: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  background: #90e0ef;
  border-radius: 4px;
}
</style>
