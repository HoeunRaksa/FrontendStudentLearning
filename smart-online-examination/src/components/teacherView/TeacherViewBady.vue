<template>
  <div class="xl:h-auto h-auto flex flex-col md:flex-row mt-12">
    <!-- Welcome and Metrics -->
    <div class="text-session-course-hour md:w-2/3 w-full pe-4">
      <!-- Welcome and Dropdown Row -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4"
      >
        <!-- Welcome Message -->
        <div class="flex flex-col">
          <p class="text-lg font-normal text-gray-600">
            Welcome back,
            <span class="text-xl font-semibold text-gray-700">{{userStore.user.lastname}}!</span>
          </p>
          <p class="pt-2 text-sm font-normal text-gray-500">
            Your progress this week is Awesome. Let’s keep it up
          </p>
          <p class="text-sm font-normal text-gray-500">
            and get a lot of points reward!
          </p>
        </div>

        <!-- Assignment Dropdown -->
        <div class="w-full max-w-full md:w-[350px]">
          <select
            v-model="selectedAssignment"
            class="w-full truncate rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option disabled value="">Select Assignment</option>
            <option
              v-for="assign in assignments"
              :key="assign.id"
              :value="assign"
            >
              {{ formatAssignment(assign) }}
            </option>
          </select>
        </div>
      </div>

      <!-- Metrics Icons -->
      <div
        class="flex flex-col md:flex-row gap-5 justify-between items-stretch mt-4 xs:mb-8 sm:mb-8"
      >
        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600"
              >Time spent today</span
            >
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto"
              >3h 45m</span
            >
          </div>
        </div>
        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600">Total Student</span>
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto"
              >85</span
            >
          </div>
        </div>
        <div class="flex">
          <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
            <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-600">Exam created</span>
            <span class="text-2xl font-semibold text-[#8C09F4] mt-auto"
              >12</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Time Spending Box -->
    <div
      class="text-session-box w-full h-44 md:w-1/3 border-gray-400 p-4 flex md:border-l-2 md:border-t-0 border-t-2 sm:border-t"
    >
      <div class="flex flex-col justify-between w-full">
        <div>
          <p class="text-xl font-semibold text-gray-700">Time Spending</p>
          <p class="text-sm font-normal text-gray-700">Weekly Report</p>
        </div>
        <p class="text-2xl font-semibold text-gray-700">
          214 <span class="text-gray-700 text-opacity-50">h</span> 23
          <span class="text-gray-700 text-opacity-50">min</span>
        </p>
      </div>
      <TimeSpentChart :weeklyHours="[12, 4, 3.5, 5, 7, 2.5, 4]" />
    </div>
  </div>

  <!-- Chart -->
  <div class="w-full mt-8 flex flex-col 2xl:flex-row">
    <div
      class="2xl:w-2/5 w-full graph-session min-h-[300px] rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4"
    >
      <p class="text-lg font-normal text-gray-600">Your progress this week</p>
      <StudentChat :progressData="studentProgress" />
    </div>
    <div
      class="upcoming-exam 2xl:w-3/5 w-full md:w-5/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] mt-2 xl:mt-2 2xl:mt-0 2xl:ms-2 p-4 "
    >
      <header class="h-10 p-6 flex items-center bg-blue-100">
        <p class="text-lg font-normal text-gray-600 ">Upcoming exam</p>
      </header>
      <div class="overflow-x-auto ">
        <table
          class="w-full divide-y divide-gray-200 sm:text-center md:text-center"
        >
          <thead class="border-y-[1px] border-gray-500 border-opacity-30">
            <tr>
              <th class="text-gray-500 text-lg font-normal py-2">Subject</th>
              <th class="text-gray-500 text-lg font-normal py-2">Date/Time</th>
              <th class="text-gray-500 text-lg font-normal py-2">Batch</th>
              <th class="text-gray-500 text-lg font-normal py-2">Year</th>
              <th class="text-gray-500 text-lg font-normal py-2">Class</th>
              <th class="text-gray-500 text-lg font-normal py-2">Major</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(exam, index) in exams"
              :key="index"
              class="border-b border-gray-200"
            >
              <td class="py-2 px-4 whitespace-nowrap text-gray-700">
                <span class="font-medium">{{ exam.subject }}</span>
              </td>
              <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                {{ exam.datetime }}
              </td>
              <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                {{ exam.batchId }}
              </td>
              <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                {{ exam.year }}
              </td>
              <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                {{ exam.location }}
              </td>
              <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                {{ exam.major }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LaptopIcon from "../icons/LaptopIcon.vue";
import GrapView from "../studentView/GrapView.vue";
import TimeSpentChart from "../studentView/TimeSpentChart.vue";
import Multiselect from "@vueform/multiselect";
import DropDownHover from "./DropDownHover.vue";
import StudentChat from "./StudentChat.vue";
import { useToast } from "vue-toastification";
import { API_BASE_URL } from "@/config/useWebSocket";
const toast = useToast();
import { useUserStore } from "@/store/store";
import axios from "axios";

export default {
  components: {
    LaptopIcon,
    GrapView,
    TimeSpentChart,
    Multiselect,
    DropDownHover,
    StudentChat,
  },
  setup(){
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      API_BASE_URL,    
      selectedAssignment: "",
      assignments: [
        {
          id: 1,
          batch: 8,
          year: 2,
          major: "Computer Science",
          location: "Kok Slaket",
          shiftName: "Morning",
          shiftTime: "7:00 AM - 11:00 AM",
        },
        {
          id: 2,
          batch: 7,
          year: 1,
          major: "Fintech",
          location: "Angkor Wat",
          shiftName: "Evening",
          shiftTime: "5:00 PM - 9:00 PM",
        },
      ],
      studentProgress: {
        scores: [60, 70, 75, 80, 90],
        dates: [
          "2025-03-01T00:00:00.000Z",
          "2025-03-10T00:00:00.000Z",
          "2025-03-20T00:00:00.000Z",
          "2025-04-01T00:00:00.000Z",
          "2025-04-15T00:00:00.000Z",
        ],
      },
      exams: [
      
      ],
    };
  },
  computed: {},
  methods: {
      async getComing(){
  try{
   const response = await axios.get(`${API_BASE_URL}/api/exams/coming`,{
    withCredentials : true,
   }
  )
  console.log(response);
  this.exams = response.data || [];
   if (!response.data || response.data.length === 0) {
      console.warn("No upcoming exams found.");
    }
  }catch(err){
    toast.error(err?.message || "Failed to fetch exams");
  }
},
    formatAssignment(assign) {
      
      return `Batch ${assign.batch} - Year ${assign.year} - ${assign.major} - ${assign.location} - Shift: ${assign.shiftName} - (${assign.shiftTime})`;
    },
    selectRole(role) {
      console.log("Selected role:", role);
    },
  },
  mounted(){
     console.table(this.userStore?.user.phone)
     this.getComing();
  }
};
</script>

<style scoped>
/* Scoped styles if needed */
select {
  max-width: 100vw;
  overflow-x: hidden;
}
option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
