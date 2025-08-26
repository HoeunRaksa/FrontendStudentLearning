<template>
  <div class="bg-white shadow rounded mt-4">
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

    <div>
      <!-- Subjects Tab -->
      <div
        v-if="currentTab === 'Batch'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Batch</h2>
          <RippleButton
            label="Add Batch"
            @click="openBtachPanel()"
            class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Batch
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
                Start
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                End
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in batches" :key="b.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="b.id"
                />
              </td>

              <td class="py-2 px-3">{{ b.startYear }}</td>

              <td class="py-2 px-3">{{ b.endYear }}</td>

              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6 me-1"
                  @click="openEditBatchPanel(b)"
                >
                  Edit
                </EditSolidIcon>
                <DeleteIcon
                  @click="deleteBatch(b.id)"
                  class="text-red-500 w-6 h-6"
                >
                  Delete
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="currentTab === 'Shift'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Shift</h2>
          <RippleButton
            label="Add Shift"
            @click="openSubjectPanel()"
            class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Shift
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
                Start
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                End
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in shifts" :key="s.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="s.id"
                />
              </td>

              <td class="py-2 px-3">{{ s.name }}</td>

              <td class="py-2 px-3">{{ s.startTime }}</td>

              <td class="py-2 px-3">{{ s.endTime }}</td>

              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6 me-1"
                  @click="openEditBatchPanel(s)"
                >
                  Edit
                </EditSolidIcon>
                <DeleteIcon
                  @click="deletesSubject(s.id)"
                  class="text-red-500 w-6 h-6"
                >
                  Delete
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="currentTab === 'Location'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Locations</h2>
          <RippleButton
            label="Add Location"
            @click="openSubjectPanel()"
            class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Shift
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
                Building Name
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Floor Number
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Rome Name
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in locations" :key="s.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="s.id"
                />
              </td>

              <td class="py-2 px-3">{{ s.buildingName }}</td>

              <td class="py-2 px-3">{{ s.floorNumber }}</td>

              <td class="py-2 px-3">{{ s.romeName }}</td>

              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6 me-1"
                  @click="openEditSubjectPanel(s)"
                >
                  Edit
                </EditSolidIcon>
                <DeleteIcon @click="deletesSubject(s.id)" class="text-red-500 w-6 h-6">
                  Delete
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- subject form -->
  <transition name="fade">
    <div
      v-if="showBatchPanel"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click.self="showBatchPanel = false"
    ></div>
  </transition>
  <transition name="slide">
    <div
      v-if="showBatchPanel"
      class="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50"
    >
      <header>
        <div class="flex items-center justify-between py-5 px-5">
          <h2 class="text-xl font-normal text-gray-700">
            {{ batchTitle }}
          </h2>
          <CloseIcon
            class="h-8 w-8 cursor-pointer"
            @click="showBatchPanel = false"
          />
        </div>
      </header>
      <hr />
      <div class="flex flex-col items-center justify-between py-5 px-5 h-full">
        <form class="w-full flex flex-col h-full">
          <!-- Subject Name -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">
              Start Year
            </label>
            <input
              type="text"
              v-model="batchForm.startYear"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2 mb-2"
              placeholder="Enter start year"
            />
          </div>

          <!-- Major Select -->
          <div class="mt-3">
            <label class="block mb-2 text-sm font-medium text-gray-700">
              End Year
            </label>
            <input
              type="text"
              v-model="batchForm.endYear"
              class="rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8c09f4] w-full px-3 py-2 mb-2"
              placeholder="Enter end year"
            />

            <p class="mt-2 text-sm text-gray-600 font-normal">
              Enter a batch between year to another year.
            </p>
          </div>

          <!-- Push button to bottom -->
          <div class="mt-auto mb-20 flex justify-between items-center">
            <button
              label="Cancel"
              bg-color="bg-gray-600"
              icon="CloseIcon"
              @click.prevent="showBatchPanel = false"
              class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
            >
              Close
            </button>
            <button
              label="Save Subject"
              @click.prevent="submitBatch()"
              class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import RippleButton from "../Custom/RippleButton.vue";
import { fetchMetaData } from "@/services/metaService";
import { useToast } from "vue-toastification";
import axios from "axios";
import { API_BASE_URL } from "@/config/useWebSocket";
import EditSolidIcon from "../icons/EditSolidIcon.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";

const toast = useToast();
export default {
  components: {
    RippleButton,
    EditSolidIcon,
    DeleteIcon
  },
  data() {
    return {
      API_BASE_URL,
      tabs: ["Batch", "Shift", "Location"],
      currentTab: "Batch",

      majors: [],
      semesters: [],
      years: [],
      shifts: [],
      batches: [],
      subjects: [],
      locations: [],

      batchForm: {
        id: "" || 0,
        startYear: "" || 0,
        endYear: "" || 0,
      },
      isEditBatchMode: false,
      batchTitle: "Add New Batch",
      showBatchPanel: false,
    };
  },
  methods: {
    async submitBatch() {
      if (!this.batchForm.startYear || !this.batchForm.endYear) {
        toast.error("Both start and end year is required.", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      try {
        let res;

        if (this.isEditBatchMode && this.batchForm.id) {
          // EDIT mode → send PUT request
          res = await axios.put(
            `${this.API_BASE_URL}/api/batchs`,
            this.batchForm,
            { withCredentials: true }
          );
        } else {
          // ADD mode → send POST request
          res = await axios.post(
            `${this.API_BASE_URL}/api/batchs`,
            this.batchForm,
            { withCredentials: true }
          );
        }

        if (res.data.success) {
          if (this.isEditBatchMode) {
            this.fetchMetaDatas();
            toast.success("Batch updated successfully.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            this.fetchMetaDatas();
            toast.success("Batch added successfully.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          }

          // Close panel & reset
          this.resetBatchForm();
        } else {
          toast.error("Operation failed: " + res.data.message, {
            position: "bottom-center",
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (err) {
        console.error("Error saving batch", err);
        toast.error("An error occurred while saving the batch.", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
    openEditBatchPanel(batch) {
      this.batchForm = {
        id: batch.id, // keep id for update
        startYear: batch.startYear || "",
        endYear: batch.endYear || "", // or however you get major ID from subject
      };
      for (const [key, value] of Object.entries(batch)) {
        console.log(`${key}: ${value}`);
      }
      this.isEditBatchMode = true;
      this.batchTitle = "Edit batch";
      this.showBatchPanel = true;
    },
    async deleteBatch(id){
      try{
        const response = await axios.delete(
            `${this.API_BASE_URL}/api/batchs/${id}`,
            { withCredentials: true }
          );

          if(response.data.success){
            toast.success("Bath deleted successfully!",{
              position: "bottom-center"
            })
          }else{
             toast.error("Bath delete failed!",{
              position: "bottom-center"
            })
          }
      }catch(e){
        toast.error("Bath delete failed!", {
          position: "bottom-center"
        });
        console.log(e)
      }
    },
    openBtachPanel() {
      this.resetBatchForm();
      this.showBatchPanel = true;
      this.batchTitle = "Add New Batch";
    },
    resetBatchForm() {
      this.batchForm = { id: "", startYear: "", endYear: "" };
      this.showBatchPanel = false;
      this.isEditBatchMode = false;
    },
    async fetchMetaDatas() {
      const meta = await fetchMetaData();
      this.majors = meta.majors;
      this.semesters = meta.semesters;
      this.years = meta.years;
      this.shifts = meta.shifts;
      this.batches = meta.batches;
      this.subjects = meta.subjects;
      this.locations = meta.locations;

      console.log("meta fetch: ");
      console.table(this.majors);
      console.table(this.semesters);

      console.log("year fetch: ");
      console.table(this.years);
      console.table(this.shifts);
      console.log("fetch locations: ");
      console.table(this.locations);

      console.log("batches fetch: ");
      console.table(this.batches);
      console.table(this.subjects);
    },
  },
  mounted() {
    this.fetchMetaDatas();
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
