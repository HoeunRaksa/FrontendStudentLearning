<template>
  <div class="flex lg:flex-row flex-col w-full sm:p-6">
    <div class="w-full flex flex-col lg:flex-row">
      <div class="sm:min-w-[400px]">
        <div
          v-if="exam"
          class="lg:fixed sm:mx-auto bg-white min-h-[500px] sm:min-w-[400px] rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition duration-300 p-6 flex flex-col xl:flex-row items-center xl:items-start mb-6"
        >
          <img
            :src="API_BASE_PROFILE_URL + '/' + exam.teacherImage"
            alt="Teacher photo"
            class="h-16 w-16 rounded-full object-cover mr-6 mb-4 xl:mb-0"
          />

          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-gray-800">
                  {{ exam.subjectName }}
                </p>
                <p class="text-sm text-gray-500">
                  By <strong>Pich Nika</strong>
                </p>
              </div>

              <span
                class="text-xs font-medium px-3 py-1 rounded-full"
                :class="{
                  'bg-blue-100 text-blue-700': exam.type === 'QUIZ',
                  'bg-green-100 text-green-700': exam.type === 'MIDTERM',
                  'bg-purple-100 text-purple-700': exam.type === 'FINAL',
                }"
              >
                {{ exam.type }}
              </span>
            </div>

            <div class="mt-4 text-gray-600 space-y-1">
              <p>
                <strong>Date/Time:</strong> {{ formatDateTime(exam.startTime) }}
              </p>
              <p>
                <strong>Duration:</strong> {{ formatDuration(exam.duration) }}
              </p>
              <p>
                <strong>Deadline:</strong> {{ formatDateTime(exam.endTime) }}
              </p>
              <p><strong>Status:</strong> {{ exam.status }}</p>
              <p>
                <strong>Assigned to:</strong>
              </p>
              <p><strong>Batch:</strong> {{ exam.assignedToDTO.batch }}</p>
              <p><strong>Year:</strong> {{ exam.assignedToDTO.year }}</p>
              <p>
                <strong>Location:</strong> {{ exam.assignedToDTO.location }}
              </p>
              <p><strong>Major:</strong> {{ exam.assignedToDTO.major }}</p>
              <p>
                <strong>Shift Name:</strong> {{ exam.assignedToDTO.shiftName }}
              </p>
              <p>
                <strong>Shift Time:</strong> {{ exam.assignedToDTO.shiftTime }}
              </p>
              <p>
                <strong>Subject Name:</strong>
                {{ exam.assignedToDTO.subjectName }}
              </p>
            </div>

            <div class="mt-6 flex items-center gap-2">
              <button
                v-if="exam.status === 'PUBLISHED'"
                @click="endExam(exam)"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                End exam
              </button>
              <!-- Edit Button -->
              <RippleButton
              @click="editExam(exam.id)"
                v-if="exam.status === 'DRAFT'"
                label="Edit"
                  
                class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
              <template #icon>
                <EditIcon fillColor="white" />
              </template>
                Edit
              </RippleButton>

              <!-- Delete Button -->
              <RippleButton
              label="Delete"
                v-if="exam.status === 'DRAFT'"
                @click="deleteExam(exam)"
                class="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <template #icon>
                  <DeleteIcon fillColor="white" />
                </template>
                Delete
              </RippleButton>
            </div>
          </div>
        </div>
      </div>
      <div
        class="p-6 lg:ms-3 rounded-md max-w-4xl min-h-[500px] w-full bg-white mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
      >
        <div v-if="exam">
          <header class="flex justify-between">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
              {{ exam.title }}
            </h2>
            <p class="text-gray-600 mb-6 text-center">
              <span
                v-if="exam.type === 'QUIZ'"
                class="font-semibold text-yellow-500"
                >{{ exam.type }}</span
              >
              <span
                v-if="exam.type === 'MIDTERM'"
                class="font-semibold text-purple-600"
                >{{ exam.type }}</span
              >
              <span
                v-if="exam.type === 'FINAL'"
                class="font-semibold text-green-700"
                >{{ exam.type }}</span
              >
            </p>
          </header>

          <div v-if="isMcqType">
            <div
              v-for="(q, index) in exam.questions"
              :key="q.id"
              class="mb-6 p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <p class="font-semibold text-lg mb-3">
                {{ index + 1 }}.
                <span v-if="q.type === 'file_exam'"
                  >File Exam (<span style="color: green">{{ q.score }}pt</span
                  >)</span
                >
                <span v-else
                  >{{ q.content }} (<span style="color: green"
                    >{{ q.score }}pt</span
                  >)</span
                >
              </p>

              <!-- multiple_choice -->
              <ul
                v-if="q.type === 'multiple_choice'"
                class="ml-4 mt-2 space-y-3"
              >
                <li v-for="(opt, i) in q.options" :key="i">
                  <label
                    class="flex items-center space-x-3 cursor-pointer text-gray-700 hover:text-blue-600 transition"
                  >
                    <input
                      type="radio"
                      :name="'q' + q.id"
                      :value="opt"
                      v-model="answers[q.id]"
                      class="form-radio text-blue-600"
                    />
                    <span>{{ opt }}</span>
                  </label>
                </li>
              </ul>

              <!-- true_false -->
              <ul
                v-else-if="q.type === 'true_false'"
                class="ml-4 mt-2 space-y-3"
              >
                <li v-for="opt in ['true', 'false']" :key="opt">
                  <label
                    class="flex items-center space-x-3 cursor-pointer text-gray-700 hover:text-blue-600 transition"
                  >
                    <input
                      type="radio"
                      :name="'q' + q.id"
                      :value="opt"
                      v-model="answers[q.id]"
                      class="form-radio text-blue-600"
                    />
                    <span class="capitalize">{{ opt }}</span>
                  </label>
                </li>
              </ul>

              <!-- file_exam -->
              <div
                v-else-if="q.type === 'file_exam'"
                class="bg-gray-50 p-4 border rounded"
              >
                <div v-for="(file, i) in q.fileExams" :key="i" class="mb-3">
                  <p class="font-semibold text-blue-700 mb-2">
                    {{ file.title }}
                  </p>
                  <p class="text-sm text-gray-600">{{ file.description }}</p>
                  <a
                    :href="`${API_BASE_FILE_URL}/${file.fileUrl}`"
                    class="text-blue-600 underline hover:text-blue-800"
                    target="_blank"
                    download
                  >
                    ⬇ Download File
                  </a>
                </div>
                <input
                  type="file"
                  class="mt-4"
                  @change="handleFileUpload($event, q.id)"
                />
              </div>

              <!-- short_answer -->
              <div v-else-if="q.type === 'short_answer'" class="mt-4">
                <label class="block text-gray-700 mb-2">Your Answer:</label>
                <textarea
                  v-model="answers[q.id]"
                  class="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Type your answer here..."
                ></textarea>
              </div>

              <div v-else class="text-red-500 font-medium">
                Unknown question type.
              </div>
            </div>

            <button
              v-if="userStore.user.role !== 'ADMIN'"
              :disabled="userStore.user.role == 'ADMIN'"
              class="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition"
              @click="submitAnswers"
            >
              Submit
            </button>
          </div>

          <div v-else class="text-center text-red-500 font-medium mt-6">
            Unsupported or unknown exam type.
          </div>
        </div>

        <div v-else class="text-center text-gray-500 py-10">
          <p>Loading exam...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL, API_BASE_FILE_URL, API_BASE_PROFILE_URL } from "../../config/useWebSocket";
import { parseISO, format } from "date-fns";
import { useUserStore } from "@/store/store";
import CustomAlert from "../Custom/CustomAlert.vue";
import { useToast } from "vue-toastification";
import { showConfirmDialog } from "../utils/confirmDialog";
import { useRouter } from "vue-router";
import RippleButton from "../Custom/RippleButton.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";
import EditIcon from "../icons/EditIcon.vue";
const toast = useToast();
export default {
  components: { CustomAlert, RippleButton, DeleteIcon, EditIcon },
  data() {
    return {
      API_BASE_FILE_URL,
      API_BASE_URL,
      API_BASE_PROFILE_URL,
      exam: null,
      answers: {},
      uploadedFiles: {},
      API_BASE_FILE_URL,
    };
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    if (!userStore.user || userStore.user.role !== "ADMIN") {
      router.push("/unauthorized");
    }

    return { userStore };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    isMcqType() {
      return (
        this.exam &&
        ["QUIZ", "MIDTERM", "FINAL"].includes(this.exam.type) &&
        Array.isArray(this.exam.questions) &&
        this.exam.questions.length > 0
      );
    },
  },
  mounted() {
    this.fetchExamDetails();
    
  },
  methods: {
    editExam(id) {
      this.$router.push({ name: "editExam", params: { id: id } });
    },
    endExam(exam) {
      showConfirmDialog(
        () => {
          this.confirmEnd(exam);
        },
        {
          title: "End this exam?",
          text: "Once ended, students can no longer access it.",
          icon: "warning",
          confirmButtonText: "Yes, end it",
          cancelButtonText: "No",
        }
      );
    },

    async confirmEnd(exam) {
      // Just your logic here (update status, API call, etc.)
      const response = await axios.put(
        API_BASE_URL + `/api/exams/${exam.id}/end`,
        null,
        { withCredentials: true }
      );
      if (response.data.success == true) {
        toast.success(response.data.message, {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
        });

        this.$router.push("/admin-dashboard");
      } else {
        toast.error("Failed to end exam.", {
          position: "top-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }

      console.log("Exam ended successfully:", response.data);
    },
    async fetchExamDetails() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/exams/forAdmin/${this.id}`,
          {
            headers: { Accept: "application/json" },
            withCredentials: true,
          }
        );
        this.exam = response.data;
        console.log("Fetched exam details:", this.exam);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    },
    handleFileUpload(event, questionId) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFiles[questionId] = file;
        console.log(`File uploaded for question ${questionId}:`, file.name);
      }
    },
    submitAnswers() {
      console.log("Submitted answers:", this.answers);
      console.log("Uploaded files:", this.uploadedFiles);
      alert("Answers submitted!");
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
  },
};
</script>
