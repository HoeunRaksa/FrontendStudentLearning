<template>
  <div class="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-10">
    <h2 class="text-3xl font-bold text-gray-800">Create / Edit Exam</h2>

    <!-- Assigned Info -->
    <section class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-700">Assigned To Student</h3>

      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700"
          >Assignment</label
        >
        <select
          v-model="assignedId"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option disabled value="">-- Please select --</option>
          <option
            v-for="assign in assignments"
            :key="assign.id"
            :value="assign.id"
          >
            {{ formatAssignment(assign) }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Start Time</label
          >
          <input
            type="datetime-local"
            v-model="startTime"
            class="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >End Time</label
          >
          <input
            type="datetime-local"
            v-model="endTime"
            class="w-full p-3 border rounded-md"
          />
        </div>
      </div>

      <p v-if="calculatedDuration" class="text-sm text-gray-500">
        Duration: {{ calculatedDuration }}
      </p>
    </section>

    <!-- Title / Type / Description -->
    <!-- Title / Type / Description / Status -->
    <section class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Exam Title</label
          >
          <input
            v-model="examTitle"
            placeholder="Enter exam title"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            v-model="examDescription"
            placeholder="Describe the exam"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Exam Type</label
          >
          <select
            v-model="type"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option disabled value="">Select exam type</option>
            <option value="final">Final</option>
            <option value="midterm">Midterm</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Status</label
          >
          <select
            v-model="status"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option disabled value="" class="text-gray-400">
              Select status
            </option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Question Form -->
    <section class="space-y-6 bg-gray-50 p-6 rounded-md">
      <h3 class="text-xl font-semibold text-gray-800">
        {{ isEditing ? "Edit Question" : "Add Question" }}
      </h3>

      <select v-model="questionType" class="w-full p-3 border rounded-md">
        <option disabled value="">-- Select Question Type --</option>
        <option value="true_false">True / False</option>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="short_answer">Short Answer</option>
        <option value="file_exam">File Exam</option>
      </select>

      <input
        v-if="questionType !== 'file_exam'"
        v-model="questionText"
        placeholder="Enter question"
        class="w-full p-3 border rounded-md"
      />

      <div class="grid grid-cols-2 gap-6">
        <input
          v-model.number="score"
          type="number"
          min="1"
          placeholder="Score"
          class="w-full p-3 border rounded-md"
        />
        <select v-model="autoScore" class="w-full p-3 border rounded-md">
          <option :value="true">Automatic</option>
          <option :value="false">Manual</option>
        </select>
      </div>

      <!-- True / False -->
      <div v-if="questionType === 'true_false'">
        <select v-model="trueFalseAnswer" class="w-full p-3 border rounded-md">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>

      <!-- Multiple Choice -->
      <div v-if="questionType === 'multiple_choice'" class="space-y-2">
        <div
          v-for="(option, index) in multipleChoiceOptions"
          :key="index"
          class="flex items-center gap-3"
        >
          <input
            v-model="multipleChoiceOptions[index]"
            class="flex-1 p-2 border rounded-md"
            placeholder="Option"
          />
          <input type="radio" v-model="correctMCIndex" :value="index" />
          <button
            v-if="multipleChoiceOptions.length > 2"
            @click="removeMCOption(index)"
            class="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
        <button @click="addMCOption" class="text-blue-600 text-sm">
          Add Option
        </button>
      </div>

      <!-- Short Answer -->
      <div v-if="questionType === 'short_answer'">
        <input
          v-model="shortAnswer"
          placeholder="Expected Answer"
          class="w-full p-3 border rounded-md"
        />
      </div>

      <!-- File Exam -->
      <div v-if="questionType === 'file_exam'" class="space-y-4">
        <input
          type="file"
          @change="handleFileChange($event)"
          multiple
          accept=".pdf,.doc,.docx"
          class="w-full p-2 border rounded-md"
        />
        <div
          v-for="(fileItem, index) in fileExams"
          :key="fileItem.id"
          class="bg-gray-100 p-4 rounded"
        >
          <div class="flex justify-between items-center">
            <div>{{ fileItem.fileUrl.name || fileItem.fileUrl }}</div>
            <button @click="removeFile(index)" class="text-red-500 text-sm">
              Remove
            </button>
          </div>
          <input
            v-model="fileItem.title"
            placeholder="Title"
            class="w-full p-2 border rounded mt-2"
          />
          <textarea
            v-model="fileItem.description"
            placeholder="Description"
            rows="2"
            class="w-full p-2 border rounded mt-2"
          ></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 pt-4">
        <button
          @click="isEditing ? updateQuestion() : addQuestion()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          {{ isEditing ? "Update" : "Add" }}
        </button>
        <button
          @click="clearQuestionForm"
          class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
      </div>
    </section>

    <section v-if="questions.length" class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-800">Questions Preview</h3>
      <div
        v-for="(q, i) in questions"
        :key="q.id"
        class="bg-gray-100 border-l-4 border-blue-500 p-4 rounded space-y-1"
      >
        <p v-if="q.type != 'file_exam'" class="font-semibold text-gray-800">
          Q{{ i + 1 }}: {{ q.question }} ({{ q.score }} pt)
        </p>

        <p v-if="q.type == 'file_exam'" class="font-semibold text-gray-800">
          Q{{ i + 1 }}: File Exam({{ q.score }} pt)
        </p>
        <div v-if="q.type == 'file_exam'">
          <div v-for="(file, index) in q.fileExams" :key="index" class="w-full">
            <!-- content for each file -->
            <p class="font-[500] text-gray-700">Title: {{ file.title }}</p>
            <p class="font-[500] text-gray-700">Description: {{ file.description }}</p>
            <p class="font-[400] text-gray-800">File url: {{ file.fileUrl }}</p>
          </div>
        </div>

        <p v-if="q.type != 'file_exam'" class="font-semibold text-gray-800">
          Content: {{ q.content }}
        </p>
        <p v-if="q.type != 'multiple_choice' && q.type != 'file_exam'">
          Answer: {{ q.correctAnswer }}
        </p>
        <p class="text-sm text-gray-600">
          Scoring: {{ q.autoScore ? "Automatic" : "Manual" }}
        </p>

        <div v-if="q.type === 'multiple_choice'">
          <p>Options:</p>
          <ul class="list-disc list-inside">
            <li
              v-for="(opt, idx) in q.options"
              :key="idx"
              :class="
                idx === q.correctAnswerIndex ? 'text-green-600 font-medium' : ''
              "
            >
              {{ opt }}
            </li>
          </ul>
        </div>

        <div class="flex gap-4 mt-2">
          <button
            @click="editQuestion(i)"
            class="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            @click="deleteQuestion(i)"
            class="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </section>

    <!-- Submit -->
    <div class="flex justify-end pt-10">
      <button
        @click="submitAll"
        class="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-md"
      >
        Submit Exam
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../../config/useWebSocket";
import { useUserStore } from "@/store/store";
let nextId = 1;
export default {
  data() {
    return {
      examTypeAssign: ["midterm", "final", "quiz"],

      assignedId: "",
      assignments: [],
      startTime: "",
      endTime: "",

      type: "",
      examTitle: "",
      examDescription: "",
      status: "",

      durationDays: 0,
      durationHours: 0,
      durationMinutes: 0,
      durationUnit: "minutes",

      questionType: "",
      questionText: "",
      score: 1,
      autoScore: true,
      trueFalseAnswer: "true",
      multipleChoiceOptions: ["", ""],
      correctMCIndex: 0,
      shortAnswer: "",
      fileExams: [],

      questions: [],
      isEditing: false,
      editingIndex: -1,
    };
  },
   setup(){
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  computed: {
    calculatedDuration() {
      if (!this.startTime || !this.endTime) return null;

      const parse = (str) => {
        const [date, time] = str.split("T");
        const [y, m, d] = date.split("-").map(Number);
        const [h, min] = time.split(":").map(Number);
        return new Date(y, m - 1, d, h, min);
      };

      const start = parse(this.startTime);
      const end = parse(this.endTime);
      const ms = end - start;
      if (ms <= 0) return "Invalid time range";

      const totalMinutes = Math.floor(ms / 60000);
      const d = Math.floor(totalMinutes / 1440);
      const h = Math.floor((totalMinutes % 1440) / 60);
      const m = totalMinutes % 60;

      return `${d ? `${d} day(s) ` : ""}${h ? `${h} hour(s) ` : ""}${
        m ? `${m} min(s)` : ""
      }`.trim();
    },
    totalDurationInMinutes() {
      return (
        this.durationDays * 24 * 60 +
        this.durationHours * 60 +
        this.durationMinutes
      );
    },
  },
  mounted() {
    this.fetchAssignments()
    console.log(this.userStore.user)
  },
  methods: {
    async fetchAssignments() {
      try {
        const teacherId = this.userStore.user.id; // Use the logged-in teacher's ID
        const response = await axios.get(
          `${API_BASE_URL}/api/assignments/teacher/${teacherId}`,
          {
            withCredentials: true,
          }
        );
        this.assignments = response.data;
        console.table(this.assignments);
      } catch (e) {
        console.log(e);
      }
    },
    formatAssignment(assign) {
      return `Batch ${assign.batch} - Year ${assign.year} - ${assign.major} - ${assign.location} - Shift: ${assign.shiftName} (${assign.shiftTime})`;
    },
    handleFileChange(e) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        this.fileExams.push({ fileUrl: file, title: "", description: "" });
      });
    },
    validateExamForm() {
      const errors = [];
      const now = new Date();
      const start = new Date(this.startTime);
      const end = new Date(this.endTime);

      if (!this.assignedId) errors.push("Assignment must be selected.");
      if (!this.examTitle.trim()) errors.push("Exam title is required.");
      if (!this.examDescription.trim())
        errors.push("Exam description is required.");
      if (!this.type) errors.push("Exam type is required.");
      if (!this.startTime || !this.endTime)
        errors.push("Start and end time are required.");
      if (start <= now) errors.push("Start time must be in the future.");
      if (end <= start) errors.push("End time must be after start time.");
      if (this.questions.length === 0)
        errors.push("At least one question is required.");

      this.questions.forEach((q, i) => {
        if (q.type !== "file_exam" && !q.content)
          errors.push(`Question ${i + 1} text is required.`);
        if (!q.type) errors.push(`Question ${i + 1} type is required.`);
        if (q.type === "multiple_choice") {
          if (q.options.length < 2 || q.options.some((opt) => !opt.trim())) {
            errors.push(
              `Question ${i + 1} must have at least two valid options.`
            );
          }
        }
        if (
          q.type === "file_exam" &&
          (!q.fileExams || q.fileExams.length === 0)
        ) {
          errors.push(
            `Question ${i + 1} must have at least one uploaded file.`
          );
        }
      });

      if (errors.length) {
        alert("❌ Validation Error:\n\n" + errors.join("\n"));
        return false;
      }
      return true;
    },
    addMCOption() {
      this.multipleChoiceOptions.push("");
    },
    removeMCOption(index) {
      this.multipleChoiceOptions.splice(index, 1);
      if (this.correctMCIndex >= this.multipleChoiceOptions.length) {
        this.correctMCIndex = 0;
      }
    },
    removeFile(index) {
      this.fileExams.splice(index, 1);
    },
    addQuestion() {
      const q = {
        id: nextId++,
        type: this.questionType,
        content: this.questionText,
        score: this.score,
        autoScore: this.autoScore,
      };

      if (q.type === "true_false") {
        q.correctAnswer = this.trueFalseAnswer;
      } else if (q.type === "multiple_choice") {
        q.options = [...this.multipleChoiceOptions];
        q.correctAnswerIndex = this.correctMCIndex;
      } else if (q.type === "short_answer") {
        q.correctAnswer = this.shortAnswer;
      } else if (q.type === "file_exam") {
        q.fileExams = this.fileExams.map((f) => ({
          id: f.id,
          title: f.title,
          description: f.description,
          fileUrl: f.fileUrl,
        }));
      }

      this.questions.push(q);
      this.clearQuestionForm();
    },
    editQuestion(index) {
      const q = this.questions[index];
      this.questionType = q.type;
      this.questionText = q.content || "";
      this.score = q.score;
      this.autoScore = q.autoScore;
      this.editingIndex = index;
      this.isEditing = true;

      if (q.type === "true_false") {
        this.trueFalseAnswer = q.correctAnswer;
      } else if (q.type === "multiple_choice") {
        this.multipleChoiceOptions = [...q.options];
        this.correctMCIndex = q.correctAnswerIndex;
      } else if (q.type === "short_answer") {
        this.shortAnswer = q.correctAnswer;
      } else if (q.type === "file_exam") {
        this.fileExams = q.fileExams.map((f) => ({
          id: f.id,
          title: f.title,
          description: f.description,
          fileUrl: f.fileUrl,
        }));
      }
    },
    updateQuestion() {
      const q = this.questions[this.editingIndex];
      q.type = this.questionType;
      q.content = this.questionText;
      q.score = this.score;
      q.autoScore = this.autoScore;

      if (q.type === "true_false") {
        q.correctAnswer = this.trueFalseAnswer;
      } else if (q.type === "multiple_choice") {
        q.options = [...this.multipleChoiceOptions];
        q.correctAnswerIndex = this.correctMCIndex;
      } else if (q.type === "short_answer") {
        q.correctAnswer = this.shortAnswer;
      } else if (q.type === "file_exam") {
        q.fileExams = this.fileExams.map((f) => ({
          id: f.id,
          title: f.title,
          description: f.description,
          fileUrl: f.fileUrl.name || f.fileUrl,
        }));
      }

      this.clearQuestionForm();
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    clearQuestionForm() {
      this.questionType = "";
      this.questionText = "";
      this.score = 1;
      this.autoScore = true;
      this.trueFalseAnswer = "true";
      this.multipleChoiceOptions = ["", ""];
      this.correctMCIndex = 0;
      this.shortAnswer = "";
      this.fileExams = [];
      this.isEditing = false;
      this.editingIndex = -1;
    },
    getDurationInMinutes() {
      if (!this.startTime || !this.endTime) return 0;
      const parse = (str) => {
        const [d, t] = str.split("T");
        const [y, m, day] = d.split("-").map(Number);
        const [h, min] = t.split(":").map(Number);
        return new Date(y, m - 1, day, h, min);
      };
      return Math.floor((parse(this.endTime) - parse(this.startTime)) / 60000);
    },
    async submitAll() {
      if (!this.validateExamForm()) return;

      try {
        const formData = new FormData();

        const examMeta = {
          assignTo: this.assignedId,
          startTime: this.startTime,
          endTime: this.endTime,
          status: this.status.toLowerCase() == 'published' ? 'coming' : this.status,
          type: this.type,
          duration: this.getDurationInMinutes(),
          durationUnit: "minutes",
          title: this.examTitle,
          description: this.examDescription,
          createdBy: this.userStore.user.id, // user this later Tey tey userStore.user.id for real user who login
          questions: this.questions.map((q) => ({
            type: q.type,
            content: q.content,
            score: q.score,
            autoScore: q.autoScore,
            correctAnswer: q.correctAnswer,
            correctAnswerIndex: q.correctAnswerIndex,
            options: q.options,
            fileExams: (q.fileExams || []).map((f) => ({
              title: f.title,
              description: f.description,
              fileUrl: f.fileUrl.name || f.fileUrl,
            })),
          })),
        };

        formData.append("examMeta", JSON.stringify(examMeta));

        this.questions.forEach((q) => {
          if (q.type === "file_exam") {
            q.fileExams.forEach((f) => {
              if (f.fileUrl instanceof File) {
                formData.append("files", f.fileUrl);
              }
            });
          }
        });

        const res = await axios.post(`${API_BASE_URL}/api/exams`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        console.log("✅ Exam Saved:", res.data);
        alert("✅ Exam saved successfully!");
      } catch (err) {
        console.error("❌ Save failed:", err);
        alert("❌ Failed to save exam.");
      }
    },
  },
};
</script>
