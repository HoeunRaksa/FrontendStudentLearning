<template>
  <CustomAlert v-if="showAlert" :type="alertType" :message="alertMessage" />
  <div class="xl:h-44 h-auto flex flex-col md:flex-row mt-12">
    <div class="text-session-course-hour md:w-2/3 w-full pe-4">
      <p class="text-lg font-normal text-gray-600">
        Welcome back,
        <span class="text-xl font-semibold text-gray-700"
          >{{ userStore.user?.lastname || "Unknow user" }}!</span
        >
      </p>
      <p class="pt-3 text-sm font-normal text-gray-500">
        Your progress this week is Awesome. let's keep it up
      </p>
      <p class="pt-2 text-sm font-normal text-gray-500">
        and get a lot of points reward!
      </p>
      <div
        class="time-spent-and-result-session flex flex-col md:flex-row gap-5 justify-between items-stretch mt-4 xs:mb-8 sm:mb-8"
      >
        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <p class="procent-and-text flex flex-col">
            <span class="text-sm font-medium text-gray-600"
              >Time spent today</span
            >
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto">{{
              userStore.user?.timeSpentToday || "0h 0m"
            }}</span>
          </p>
        </div>

        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <StudentIcon class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <p class="procent-and-text flex flex-col">
            <span class="text-sm font-medium text-gray-600">Students</span>
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto"
              >1275</span
            >
          </p>
        </div>

        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <PeopleRigular class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <p class="procent-and-text flex flex-col">
            <span class="text-sm font-medium text-gray-600">Teachers</span>
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto"
              >125</span
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="text-session-box w-full h-44 md:w-1/3 border-gray-400 p-4 flex md:border-l-2 md:border-t-0 border-t-2 sm:border-t"
    >
      <div class="flex flex-col justify-between items- h-full w-full">
        <div class="">
          <p class="text-xl font-semibold text-gray-700">Time Spending</p>
          <p class="text-sm font-normal text-gray-700">Weekly Report</p>
        </div>
        <div>
          <p class="text-2xl font-semibold text-gray-700">
            {{ weeklyTime.hours }}
            <span class="text-gray-700 text-opacity-50">h</span>
            {{ weeklyTime.minutes }}
            <span class="text-gray-700 text-opacity-50">min</span>
          </p>
        </div>
      </div>
      <TimeSpentChart :weeklyHours="weeklyHoursArray" />
    </div>
  </div>
  <div class="w-full mt-8 flex flex-col xl:flex-row gap-4">
    <div
      class="graph-session bg-white min-h-[300px] w-full xl:w-3/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] sm:me-1 xl:me-2 p-4"
    >
      <TradingViewChart />
    </div>
    <div
      class="upcoming-exam max-h-[500px] overflow-auto bg-white w-full xl:w-3/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <header class="h-10 mb-4 flex items-center scrollbar-thin">
        <p class="text-lg font-normal text-gray-600">Announcements</p>
      </header>
      <table class="w-full divide-y divide-gray-200">
        <thead class="border-y-[1px] border-gray-500 border-opacity-30">
          <tr>
            <th class="text-gray-500 text-lg font-normal py-2">
              Message Details
            </th>
            <th class="text-gray-500 text-lg font-normal py-2 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(teacher_message, index) in teacher_messages"
            :key="index"
            class="border-b border-gray-200"
          >
            <td class="py-3 px-4">
              <div class="flex items-start space-x-3">
                <img
                  :src="teacher_message.teacherImage"
                  alt="Teacher photo"
                  class="h-10 w-10 rounded-full object-cover mt-1"
                />
                <div class="flex flex-col">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-gray-800">{{
                      teacher_message.teacher
                    }}</span>
                    <span class="text-sm text-gray-500"
                      >| {{ teacher_message.subject }}</span
                    >
                  </div>
                  <p class="text-md text-gray-700 mt-1">
                    {{ teacher_message.message }}
                  </p>
                  <span class="text-sm text-gray-500 mt-1">{{
                    teacher_message.datetime
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-center px-4 whitespace-nowrap">
              <span
                :class="[
                  'inline-block rounded-full px-3 py-1 text-sm font-medium',
                  teacher_message.status.toLowerCase() === 'unread'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600',
                ]"
              >
                {{ teacher_message.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- upcoming-exam -->
  <div class="w-full flex flex-col xl:flex-row gap-4 md:mt-4 sm:mt-4">
    <div
      class="upcoming-exam bg-white w-full md:w-5/5 xl:w-3/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <header class="h-10 mb-4 flex items-center justify-between">
        <p class="text-lg font-normal text-gray-600">Published exam</p>
        <!-- Search input -->
        <div class="flex justify-end items-center">
          <input
            v-model="searchPublishedQuery"
            type="text"
            placeholder="Search by subject or teacher..."
            class="w-full min-w-[300px] px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c09f4]"
          />
          <SearchIcon
            class="w-[38px] h-[38px] bg-[#8c09f4] shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 rounded-md ms-2"
          />
        </div>
      </header>

      <table
        class="w-full divide-y divide-gray-200 sm:text-center md:text-center"
      >
        <thead class="border-y-[1px] border-gray-500 border-opacity-30">
          <tr>
            <th class="text-gray-500 text-lg font-normal py-2">
              Subject & Teacher
            </th>
            <th class="text-gray-500 text-lg font-normal py-2">End At/Time</th>
            <th class="text-gray-500 text-lg font-normal py-2">Type</th>
            <th class="text-gray-500 text-lg font-normal py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="openExam(exam.id)"
            v-for="(exam, index) in filterPublishedExam"
            :key="index"
            class="border-b border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            <td class="py-2 px-4 whitespace-nowrap text-gray-700">
              <div class="flex items-center space-x-3">
                <img
                  :src="API_BASE_PROFILE_URL + '/' + exam.teacherImage"
                  alt="Teacher photo"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div class="flex flex-col">
                  <span class="font-medium">{{ exam.teacher }}</span>
                  <span class="text-sm text-gray-500">{{ exam.subject }}</span>
                </div>
              </div>
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ formatDateTime(exam.deadline) }}
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ exam.type }}
            </td>
            <td
              :class="[
                'py-2 px-4 whitespace-nowrap',
                exam.status === 'PUBLISHED'
                  ? ' text-green-600'
                  : exam.status === 'PENDING'
                  ? ' text-blue-600'
                  : exam.status === 'EXPIRED'
                  ? ' text-red-600'
                  : ' text-gray-600',
              ]"
            >
              {{ exam.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="min-h-[300px] w-full xl:w-2/5 rounded-lg shadow-lg xl:ms-2 p-4 bg-white"
    >
      <!-- header ------------------------------------------------------------ -->
      <header class="flex items-center justify-between mb-4">
        <p class="text-lg font-normal text-gray-600">Recent Actions</p>

        <!-- optional “clear” or “see all” link -->
        <RouterLink
          to="/audit-log"
          class="text-sm text-primary-600 hover:underline"
          >view all</RouterLink
        >
      </header>

      <!-- list -------------------------------------------------------------- -->
      <div
        v-if="userRecentActions.length"
        class="space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
      >
        <div
          v-for="a in userRecentActions"
          :key="a.id"
          class="flex items-start gap-3 p-3 rounded-md border border-gray-200 hover:-translate-y-1 hover:shadow-md transition"
        >
          <!-- icon / avatar -->
          <ActionIcon :type="a.type.toLowerCase()" />

          <!-- label + description -->
          <div class="flex-1">
            <p class="font-medium text-gray-800">
              {{ a.label }}
            </p>
            <p class="text-sm text-gray-500 line-clamp-2">
              {{ a.description }}
            </p>
          </div>

          <!-- timestamp -->
          <time
            :datetime="a.timestamp"
            class="text-xs text-gray-400 whitespace-nowrap"
          >
            {{ formatAgo(a.timestamp) }}
          </time>
        </div>
      </div>

      <!-- empty state ------------------------------------------------------- -->
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
    </div>
  </div>
  <div class="w-full flex flex-col xl:flex-row gap-6 md:mt-4 sm:mt-4 mb-4">
    <div
      class="upcoming-exam flex-1 min-h-[400px] w-full xl:w-1/2 bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <header class="h-10 mb-4 flex items-center justify-between">
        <p class="text-lg font-normal text-gray-600">Draft exam</p>
        <!-- Search input -->
        <div class="flex justify-end items-center">
          <input
            v-model="searchDraftQuery"
            type="text"
            placeholder="Search by subject or teacher..."
            class="w-full min-w-[280px] px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c09f4]"
          />
          <SearchIcon
            class="w-[38px] h-[38px] bg-[#8c09f4] shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 rounded-md ms-2"
          />
        </div>
      </header>

      <table
        class="w-full divide-y divide-gray-200 sm:text-center md:text-center"
      >
        <thead class="border-y-[1px] border-gray-500 border-opacity-30">
          <tr>
            <th class="text-gray-500 text-lg font-normal py-2">
              Subject & Teacher
            </th>
            <th class="text-gray-500 text-lg font-normal py-2">
              Start At/Time
            </th>
            <th class="text-gray-500 text-lg font-normal py-2">Type</th>
            <th class="text-gray-500 text-lg font-normal py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="openExam(exam.id)"
            v-for="(exam, index) in filterDraftExams"
            :key="index"
            class="border-b border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            <td class="py-2 px-4 whitespace-nowrap text-gray-700">
              <div class="flex items-center space-x-3">
                <img
                  :src="API_BASE_PROFILE_URL+'/'+ exam.teacherImage"
                  alt="Teacher photo"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div class="flex flex-col">
                  <span class="font-medium">{{ exam.teacher }}</span>
                  <span class="text-sm text-gray-500">{{ exam.subject }}</span>
                </div>
              </div>
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ formatDateTime(exam.datetime) }}
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ exam.type }}
            </td>
            <td
              :class="[
                'py-2 px-4 whitespace-nowrap',
                exam.status === 'PUBLISHED'
                  ? ' text-green-600'
                  : exam.status === 'PENDING'
                  ? ' text-blue-600'
                  : exam.status === 'EXPIRED'
                  ? ' text-red-600'
                  : ' text-gray-600',
              ]"
            >
              {{ exam.status }}
            </td>
          </tr>
          <tr
            v-if="filterDraftExams.length == 0 || filterDraftExams.length < 0"
            class="w-full text-center text-gray-600"
          >
            <td colspan="4" class="py-4 text-center">No draft exams yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="upcoming-exam w-full flex-1 xl:w-1/2 bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <header class="h-10 mb-4 flex items-center justify-between">
        <p class="text-lg font-normal text-gray-600">Completed exam</p>
        <!-- Search input -->
        <div class="flex justify-end items-center">
          <input
            type="text"
            v-model="searchCompletedQuery"
            placeholder="Search by subject or teacher..."
            class="w-full min-w-[280px] px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c09f4]"
          />
          <SearchIcon
            class="w-[38px] h-[38px] bg-[#8c09f4] shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 rounded-md ms-2"
          />
        </div>
      </header>

      <table
        class="w-full divide-y divide-gray-200 sm:text-center md:text-center"
      >
        <thead class="border-y-[1px] border-gray-500 border-opacity-30">
          <tr>
            <th class="text-gray-500 text-lg font-normal py-2">
              Subject & Teacher
            </th>
            <th class="text-gray-500 text-lg font-normal py-2">
              Start At/Time
            </th>
            <th class="text-gray-500 text-lg font-normal py-2">Type</th>
            <th class="text-gray-500 text-lg font-normal py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="openExam(exam.id)"
            v-for="(exam, index) in filterCompletedExams"
            :key="index"
            class="border-b border-gray-200 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            <td class="py-2 px-4 whitespace-nowrap text-gray-700">
              <div class="flex items-center space-x-3">
                <img
                  :src="exam.teacherImage"
                  alt="Teacher photo"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div class="flex flex-col">
                  <span class="font-medium">{{ exam.teacher }}</span>
                  <span class="text-sm text-gray-500">{{ exam.subject }}</span>
                </div>
              </div>
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ formatDateTime(exam.datetime) }}
            </td>
            <td class="py-2 px-4 whitespace-nowrap text-gray-500">
              {{ exam.type }}
            </td>
            <td
              :class="[
                'py-2 px-4 whitespace-nowrap',
                exam.status === 'PUBLISHED'
                  ? ' text-green-600'
                  : exam.status === 'PENDING'
                  ? ' text-blue-600'
                  : exam.status === 'EXPIRED'
                  ? ' text-red-600'
                  : ' text-gray-600',
              ]"
            >
              {{ exam.status }}
            </td>
          </tr>
          <tr
            v-if="filterDraftExams.length == 0 || filterDraftExams.length < 0"
            class="w-full text-center text-gray-600"
          >
            <td colspan="4" class="py-4 text-center">No draft exams yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import LaptopIcon from "../icons/LaptopIcon.vue";
import TradingViewChart from "./TradingViewChart.vue";
import TimeSpentChart from "./TimeSpentChart.vue";
import SmallCycleChat from "./SmallCycleChat.vue";
import PeopleRigular from "../icons/PeopleRigular.vue";
import StudentIcon from "../icons/StudentIcon.vue";
import SearchIcon from "../icons/SearchIcon.vue";
import { useUserStore } from "@/store/store";
import axios from "axios";
import { parseISO, format } from "date-fns";
import { API_BASE_FILE_URL, API_BASE_URL } from "@/config/useWebSocket";
import { API_BASE_PROFILE_URL } from "@/config/useWebSocket";
import AccountIcon from "../icons/AccountIcon.vue";
import { connectWebSocket, registerHandler } from "@/config/useWebSocket";
import ActionIcon from "../icons/ActionIcon.vue";
export default {
  components: {
    LaptopIcon,
    TradingViewChart,
    TimeSpentChart,
    SmallCycleChat,
    PeopleRigular,
    StudentIcon,
    SearchIcon,
    AccountIcon,
    ActionIcon,
  },
  setup() {
    const userStore = useUserStore();
    if (!userStore.user || !userStore.user.role == "ADMIN") {
      // Redirect to unauthorized page if not admin
      this.$router.push("/unauthorized");
    }
    return { userStore };
  },
  data() {
    return {
      API_BASE_PROFILE_URL,
      API_BASE_FILE_URL,
      API_BASE_URL,
      userRecentActions: [],
      socket: null,
      searchPublishedQuery: "",
      searchDraftQuery: "",
      searchCompletedQuery: "",
      ativeExams: [],
      draftExams: [],
      completedExams: [],
      weeklyHoursData: [12, 4, 3.5, 5, 7, 2.5, 4],
      teacher_messages: [
        {
          teacher: "Mr. John Smith",
          subject: "Mathematics",
          message: "Reminder: The algebra exam starts in 30 minutes. Be ready!",
          datetime: "2025-07-08 08:30 AM",
          status: "Unread",
          teacherImage: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          teacher: "Ms. Emily Johnson",
          subject: "History",
          message: "Please revise Chapter 4 before the exam this afternoon.",
          datetime: "2025-07-08 09:45 AM",
          status: "Read",
          teacherImage: "https://randomuser.me/api/portraits/women/45.jpg",
        },
        {
          teacher: "Mr. David Lee",
          subject: "Physics",
          message:
            "The test is postponed to next Monday due to technical issues.",
          datetime: "2025-07-07 04:10 PM",
          status: "Read",
          teacherImage: "https://randomuser.me/api/portraits/men/76.jpg",
        },
        {
          teacher: "Mrs. Sophia Kim",
          subject: "Chemistry",
          message: "Lab session will be included in the upcoming quiz.",
          datetime: "2025-07-07 06:20 PM",
          status: "Unread",
          teacherImage: "https://randomuser.me/api/portraits/women/66.jpg",
        },
      ],
    };
  },
  computed: {
    filterPublishedExam() {
      const query = this.searchPublishedQuery.trim().toLowerCase();

      return this.ativeExams.filter((exam) => {
        const isPublishedExam = exam.status == "Published".toUpperCase();
        const matchQuery =
          exam.teacher.toLowerCase().includes(query) ||
          exam.subject.toLowerCase().includes(query) ||
          exam.type.toLowerCase().includes(query);
        return isPublishedExam && matchQuery;
      });
    },
    filterDraftExams() {
      const query = this.searchDraftQuery.trim().toLowerCase();
      console.log("Draft query:", this.exam);
      return this.draftExams.filter((exam) => {
        const isDraftExam = exam.status === "DRAFT";

        const teacher = exam.teacher ? exam.teacher.toLowerCase() : "";
        const subject = exam.subject ? exam.subject.toLowerCase() : "";
        const type = exam.type ? exam.type.toLowerCase() : "";

        const matchQuery =
          teacher.includes(query) ||
          subject.includes(query) ||
          type.includes(query);

        return isDraftExam && matchQuery;
      });
    },
    filterCompletedExams() {
      const query = this.searchCompletedQuery.trim().toLowerCase();

      return this.completedExams.filter((exam) => {
        const isDraftExam = exam.status == "EXPIRED".toUpperCase();
        const matchQuery =
          exam.teacher.toLowerCase().includes(query) ||
          exam.subject.toLowerCase().includes(query) ||
          exam.type.toLowerCase().includes(query);
        return isDraftExam && matchQuery;
      });
    },
    weeklyTime() {
      const raw = this.userStore?.user?.timeSpentThisWeek || "0h 0m";
      const [h, m] = raw.split(" ");
      return {
        hours: h.replace("h", ""),
        minutes: m.replace("m", ""),
      };
    },
    weeklyHoursArray() {
      // Example: just pass the total hours as a single element array
      // You can adapt this to multiple days if you want more data points
      return [this.weeklyTime.hours + this.weeklyTime.minutes / 60];
    },
  },
  methods: {
    async fetchRecentActions() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/actions/recent", {
          withCredentials: true,
        });
        this.userRecentActions = response.data;
      } catch (err) {
        console.error("Failed to fetch recent actions", err);
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
    formatDuration(durationStr) {
      // durationStr = "1562 mins" — extract the number only
      if (!durationStr) return "";
      const minutes = parseInt(durationStr); // parseInt will grab number at start of string
      if (isNaN(minutes)) return "";
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
      if (hrs > 0) return `${hrs}h`;
      return `${mins}m`;
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
    openExam(id) {
      this.$router.push({ name: "ExamDetailsAndEdit", params: { id: id } });
    },
    async fetchActiveExams() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/exams/active", {
          withCredentials: true,
        });

        this.ativeExams = response.data;
        console.log("Active Exams:", this.ativeExams);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchDraftExams() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/exams/draft", {
          withCredentials: true,
        });

        this.draftExams = response.data;
        console.log("Draft Exams:", this.draftExams);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchCompletedExams() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/exams/completed",
          {
            withCredentials: true,
          }
        );

        this.completedExams = response.data;
        console.log("Completed Exams:", this.completedExams);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.fetchActiveExams();
    this.fetchRecentActions();
    this.fetchDraftExams();
    this.fetchCompletedExams();
    console.log(this.userStore.user);

    connectWebSocket(); // connect to WebSocket server
    registerHandler("/topic/api/actions/recent", (action) => {
      this.userRecentActions.unshift(action);
      console.log(this.userRecentActions);
      if (this.userRecentActions.length > 10) {
        this.userRecentActions.pop(); // keep only the latest 10 actions
      }
    });
  },
};
</script>
