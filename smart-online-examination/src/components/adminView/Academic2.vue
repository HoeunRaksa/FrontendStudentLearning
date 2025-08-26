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
        v-if="currentTab === 'Year'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Academic Year</h2>
          <RippleButton
            label="Add Academic Year"
            @click="openSubjectPanel()"
            class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
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
                Year
              </th>
              <th
                class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in years" :key="b.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="b.id"
                />
              </td>

              <td class="py-2 px-3">{{ b.name }}</td>

              <td class="py-2 px-3 space-x-2 flex">
                <EditSolidIcon
                  class="text-yellow-500 w-6 h-6 me-1"
                  @click="openEditSubjectPanel(s)"
                >
                  
                </EditSolidIcon>
                <DeleteIcon
                  @click="deletesSubject(s.id)"
                  class="text-red-500 w-6 h-6"
                >
                  
                </DeleteIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="currentTab === 'Semester'"
        class="bg-white rounded-md shadow-sm p-4"
      >
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold mb-4">Semester</h2>
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
                Semester
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in semesters" :key="s.id" class="border-b">
              <!-- Row checkbox -->
              <td class="py-2 px-3">
                <input
                  type="checkbox"
                  v-model="selectedSubjects"
                  :value="s.id"
                />
              </td>

              <td class="py-2 px-3">{{ s.number }}</td>

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
</template>
<script>
import RippleButton from "../Custom/RippleButton.vue";
import { fetchMetaData } from "@/services/metaService";
import EditSolidIcon from "../icons/EditSolidIcon.vue";
import DeleteIcon from "../icons/DeleteIcon.vue";
export default {
  components: {
    RippleButton,
    EditSolidIcon,
    DeleteIcon
  },
  data() {
    return {
      tabs: ["Year", "Semester"],
      currentTab: "Year",

      majors: [],
      semesters: [],
      years: [],
      shifts: [],
      batches: [],
      subjects: [],
      locations: [],
    };
  },
  methods: {
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
