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
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >End Time</label
          >
          <input
            type="datetime-local"
            v-model="endTime"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <p v-if="calculatedDuration" class="text-sm text-gray-500">
        Duration: {{ calculatedDuration }}
      </p>
    </section>

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

      <select
        v-model="questionType"
        class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
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
        class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />

      <div class="grid grid-cols-2 gap-6">
        <input
          v-model.number="score"
          type="number"
          min="1"
          placeholder="Score"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          v-model="autoScore"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option :value="true">Automatic</option>
          <option :value="false">Manual</option>
        </select>
      </div>

      <!-- True / False -->
      <div v-if="questionType === 'true_false'">
        <select
          v-model="trueFalseAnswer"
          class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
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
            class="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
          class="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- File Exam -->
      <div v-if="questionType === 'file_exam'" class="space-y-4">
        <input
          type="file"
          @change="handleFileChange($event)"
          multiple
          accept=".pdf,.doc,.docx"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            class="w-full p-2 border rounded mt-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <textarea
            v-model="fileItem.description"
            placeholder="Description"
            rows="2"
            class="w-full p-2 border rounded mt-2 focus:outline-none focus:ring focus:ring-blue-300"
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

    <!-- Question Preview -->
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
    <div class="flex justify-end pt-5">
      <button
        @click="submitAll"
        class="bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-2 rounded-md"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../../config/useWebSocket";
let nextId = 1;
export default {
  data() {
    return {
      examId: this.$route.params.id,
      currectAssignTo: "",
      assignments: [],
      assignedId: "",
      startTime: "",
      endTime: "",
      currentTeacherId: "",
      type: "",
      status: "",
      examTitle: "",
      examDescription: "",
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
  computed: {
    calculatedDuration() {
      if (!this.startTime || !this.endTime) return null;
      const start = new Date(this.startTime);
      const end = new Date(this.endTime);
      const ms = end - start;
      if (ms <= 0) return "Invalid time";
      const totalMinutes = Math.floor(ms / 60000);
      const hrs = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
    },
  },
  mounted() {
    this.loadExam();
    this.fetchAssignments();
  },
  methods: {
    async loadExam() {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/exams/forAdmin/${this.examId}`,
          {
            withCredentials: true,
          }
        );
        const exam = res.data;
        console.log("Exam data:", exam);
        console.log("exam id", this.examId);
        this.examId = exam.id;
        this.examTitle = exam.title;
        this.currentTeacherId = exam.teacherId;
        this.examDescription = exam.description;
        this.type = exam.type.toLowerCase();
        this.startTime = exam.startTime;
        this.endTime = exam.endTime;
        this.status = exam.status;
        this.currectAssignTo = exam.assignedToDTO || "";
        this.assignedId = exam.assignedToDTO.id || "";
        this.questions = exam.questions.map((q) => ({
          ...q,
          id: nextId++,
        }));
      } catch (err) {
        alert("❌ Failed to load exam.");
        console.error(err);
      }
    },
    async created() {
    try {
      const response = await axios.get(API_BASE_URL + "/api/exams/all", { withCredentials: true });
      this.exams = response.data;  // directly assign exam data here
    } catch (error) {
      console.error(error);
    }
  },
    async fetchAssignments() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/assignments`, {
          withCredentials: true,
        });
        this.assignments = res.data;
        console.log(assignments);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    },
    getDurationInMinutes() {
      if (!this.startTime || !this.endTime) return 0;

      const parseLocalDateTime = (datetimeLocalStr) => {
        const [datePart, timePart] = datetimeLocalStr.split("T");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hour, minute);
      };

      const start = parseLocalDateTime(this.startTime);
      const end = parseLocalDateTime(this.endTime);

      const diffMs = end - start;
      if (diffMs <= 0) return 0;

      return Math.floor(diffMs / 60000);
    },
    formatAssignment(assign) {
      return `Batch ${assign.batch} - Year ${assign.year} - ${assign.major} - ${assign.location} - Shift: ${assign.shiftName} - (${assign.shiftTime})`;
    },
    handleFileChange(e) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        this.fileExams.push({ fileUrl: file, title: "", description: "" });
      });
    },
    addMCOption() {
      this.multipleChoiceOptions.push("");
    },
    removeMCOption(i) {
      this.multipleChoiceOptions.splice(i, 1);
    },
    removeFile(i) {
      this.fileExams.splice(i, 1);
    },
    addQuestion() {
      const question = {
        id: nextId++,
        type: this.questionType,
        content: this.questionText,
        score: this.score,
        autoScore: this.autoScore,
      };
      if (question.type === "true_false") {
        question.correctAnswer = this.trueFalseAnswer;
      } else if (question.type === "multiple_choice") {
        question.options = [...this.multipleChoiceOptions];
        question.correctAnswerIndex = this.correctMCIndex;
      } else if (question.type === "short_answer") {
        question.correctAnswer = this.shortAnswer;
      } else if (question.type === "file_exam") {
        question.fileExams = this.fileExams.map((f) => ({
          title: f.title,
          description: f.description,
          fileUrl: f.fileUrl,
        }));
      }
      this.questions.push(question);
      this.clearQuestionForm();
    },
    editQuestion(index) {
      const q = this.questions[index];
      console.log("Editing question:", q);
      this.questionType = q.type;
      this.questionText = q.content || "";
      this.score = q.score;
      this.autoScore = q.autoScore;
      this.isEditing = true;
      this.editingIndex = index;
      if (q.type === "true_false") {
        this.trueFalseAnswer = q.correctAnswer;
      } else if (q.type === "multiple_choice") {
        this.multipleChoiceOptions = [...q.options];
        this.correctMCIndex = q.correctAnswerIndex;
      } else if (q.type === "short_answer") {
        this.shortAnswer = q.correctAnswer;
      } else if (q.type === "file_exam") {
        this.fileExams = q.fileExams || [];
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
        q.fileExams = this.fileExams;
      }
      this.clearQuestionForm();
    },
    deleteQuestion(i) {
      this.questions.splice(i, 1);
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
    validateExamForm() {
      const errors = [];

      const start = new Date(this.startTime);
      const end = new Date(this.endTime);
      const now = new Date();
      if (start <= now) {
        errors.push("Start time must be in the future (after now).");
      }

      if (end <= start) {
        errors.push("End time must be after the start time.");
      }
      // Assignment check
      if (!this.assignedId) {
        errors.push("Assignment must be selected.");
      }

      // Title & description
      if (!this.examTitle.trim()) {
        errors.push("Exam title is required.");
      }

      if (!this.examDescription.trim()) {
        errors.push("Exam description is required.");
      }

      // Type check
      if (!this.type) {
        errors.push("Exam type must be selected.");
      }

      // Time checks
      if (!this.startTime || !this.endTime) {
        errors.push("Start and end time must be selected.");
      } else if (this.getDurationInMinutes() <= 0) {
        errors.push("End time must be after start time.");
      }

      // Questions check
      if (this.questions.length === 0) {
        errors.push("At least one question must be added.");
      }

      // Per question validation (optional)
      this.questions.forEach((q, i) => {
        if (q.type !== "file_exam" && !q.content) {
          errors.push(`Question ${i + 1} text is required.`);
        }
        if (!q.type) {
          errors.push(`Question ${i + 1} type is required.`);
        }
        if (q.type === "multiple_choice") {
          if (
            q.options.length < 2 ||
            q.options.some((opt) => opt.trim() === "")
          ) {
            errors.push(
              `Question ${
                i + 1
              } must have at least two valid multiple choice options.`
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
    async submitAll() {
      if (!this.validateExamForm()) {
        return; // Stop if validation fails
      }

      try {
        const formData = new FormData();

        // 1. Build exam metadata to match your Spring Boot DTO
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
          createdBy: this.currentTeacherId || 1,
          questions: this.questions.map((q) => ({
            ...q,
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
            (q.fileExams || []).forEach((fileObj) => {
              if (fileObj.fileUrl instanceof File) {
                formData.append("files", fileObj.fileUrl);
              }
            });
          }
        });
        const response = await axios.post(
          `${API_BASE_URL}/api/exams`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("✅ Exam Saved:", response.data);
        alert("✅ Exam saved successfully!");
      } catch (error) {
        console.error("❌ Failed to save exam:", error);
        alert("❌ Error saving exam.");
      }
    },
  },
};
</script>
