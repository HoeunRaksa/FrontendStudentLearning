<template>
  <div class="h-full">
    <!-- Summary cards -->
    <section class="count-students-teachers-admin-summary">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Students -->
        <div
          class="bg-white shadow rounded-lg px-6 py-6 flex justify-between items-stretch w-full md:w-1/3 min-h-36"
        >
          <!-- Left: text -->
          <div class="flex flex-col justify-between">
            <h2 class="text-gray-700 font-semibold text-5xl">
              {{ stats.totalStudents }}
            </h2>
            <h3 class="text-gray-500 text-md font-medium">Total Students</h3>
          </div>

          <!-- Right: icon + images -->
          <div class="flex flex-col items-end">
            <!-- Icon -->
            <div
              class="bg-blue-800 bg-opacity-20 flex items-end justify-end rounded-md p-2 h-fit mb-3"
            >
              <StudentIcon class="w-11 h-11 text-[#8C09F4]" />
            </div>

            <!-- Overlapping pictures -->
            <div class="flex items-end">
              <template
                v-for="(pic, index) in stats.studentPics.slice(0, 4)"
                :key="index"
              >
                <img
                  :src="`${API_BASE_PROFILE_URL}/${pic}`"
                  alt="Student"
                  class="w-11 h-11 transition-all duration-200 hover:-translate-y-4 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
                  style="image-rendering: -webkit-optimize-contrast"
                />
              </template>

              <!-- More count -->
              <div
                v-if="stats.totalStudents > 4"
                class="w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-4 border-2 border-white -ml-3 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700"
              >
                +{{ stats.totalStudents - 4 }}
              </div>
            </div>
          </div>
        </div>

        <!-- Teachers -->
        <div
          class="bg-white shadow rounded-lg px-6 py-6 flex justify-between items-stretch w-full md:w-1/3 min-h-36"
        >
          <!-- Left: text -->
          <div class="flex flex-col justify-between">
            <h2 class="text-gray-700 font-semibold text-5xl">
              {{ stats.totalTeachers }}
            </h2>
            <h3 class="text-gray-500 text-md font-medium">Total Teachers</h3>
          </div>

          <!-- Right: icon + images -->
          <div class="flex flex-col items-end">
            <!-- Icon -->
            <div
              class="bg-green-500 bg-opacity-20 flex items-end justify-end rounded-md p-2 h-fit mb-3"
            >
              <TeacherIcon class="w-11 h-11 text-green-600" />
            </div>

            <!-- Overlapping pictures -->
            <div class="flex items-end">
              <template
                v-for="(pic, index) in stats.teacherPics.slice(0, 4)"
                :key="index"
              >
                <img
                  :src="`${API_BASE_PROFILE_URL}/${pic}`"
                  alt="Teacher"
                  class="w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-4 border-2 border-white -ml-3 first:ml-0 object-cover"
                  style="image-rendering: -webkit-optimize-contrast"
                />
              </template>

              <!-- More count -->
              <div
                v-if="stats.totalTeachers > 4"
                class="w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-4 border-2 border-white -ml-3 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700"
              >
                +{{ stats.totalTeachers - 4 }}
              </div>
            </div>
          </div>
        </div>

        <!-- Admins -->
        <div
          class="bg-white shadow rounded-lg px-6 py-6 flex justify-between items-stretch w-full md:w-1/3 min-h-36"
        >
          <div class="flex flex-col justify-between">
            <h2 class="text-gray-700 font-semibold text-5xl">
              {{ stats.totalAdmins }}
            </h2>
            <h3 class="text-gray-500 text-md font-medium">Total Admins</h3>
          </div>

          <!-- Right: icon + images -->
          <div class="flex flex-col items-end">
            <!-- Icon -->
            <div
              class="bg-yellow-400 bg-opacity-20 flex items-end justify-end rounded-md p-2 h-fit mb-3"
            >
              <AdminIcon class="w-11 h-11 text-yellow-500" />
            </div>

            <!-- Overlapping pictures -->
            <div class="flex items-end">
              <template
                v-for="(pic, index) in stats.adminPics.slice(0, 4)"
                :key="index"
              >
                <img
                  :src="`${API_BASE_PROFILE_URL}/${pic}`"
                  alt="Admin"
                  class="w-11 h-11 transition-all duration-200 hover:-translate-y-4 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
                  style="image-rendering: -webkit-optimize-contrast"
                />
              </template>

              <!-- More count -->
              <div
                v-if="stats.totalAdmins > 4"
                class="w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-4 border-2 border-white -ml-3 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700"
              >
                +{{ stats.totalAdmins - 4 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter and search -->
    <section
      class="filter-search-role-export-add-new-user section-limit-height mb-24 rounded-md py-6 px-8 table-l bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] mt-5 md:min-h-[280px]"
    >
      <h3 class="text-gray-700 text-md font-normal mb-2">Filter</h3>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- ✅ Listbox with no Transition -->
        <Listbox v-model="selectedRole" v-slot="{ open }">
          <div
            class="relative w-64 max-[350px]:w-full max-[350px]:max-w-[200px]"
          >
            <ListboxButton
              :class="[
                'relative justify-center w-full min-w-[150px] cursor-pointer z-31 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-[0_4px_20px_rgba(0,0,0,0.1)] sm:text-sm transition-all',
                open ? 'ring-2 ring-[#8c09f4]' : '',
              ]"
            >
              <span class="block truncate">{{
                selectedRole || "All Roles"
              }}</span>
              <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.653a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </ListboxButton>

            <ListboxOptions
              class="absolute z-[999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:text-md sm:text-sm"
            >
              <ListboxOption
                v-for="role in roles"
                :key="role"
                :value="role"
                class="cursor-pointer select-none py-2 pl-4 pr-4 hover:bg-indigo-100 flex items-center gap-2"
                v-slot="{ selected }"
              >
                <span v-if="selected" class="text-indigo-600">✔</span>
                <span :class="selected ? 'font-semibold' : 'font-normal'">
                  {{ role }}
                </span>
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>

        <!-- Search -->
        <div class="flex justify-end items-center w-full lg:max-w-[600px]">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="search for all user or role"
            class="w-full min-w-[150px] md:min-w-[280px] px-4 py-[6px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8c09f4]"
          />
          <SearchIcon
            class="w-[38px] h-[38px] text-white bg-[#8c09f4] shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-1 rounded-md ms-2"
          />
        </div>
      </div>
      <div class="mt-4 py-4">
        <div class="flex items-center justify-between gap-4">
          <!-- Limit Listbox -->
          <Listbox v-model="selectedLimit" v-slot="{ open }" class="z-30">
            <div class="relative w-24">
              <ListboxButton
                :class="[
                  'relative w-full z-30 cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-[0_4px_20px_rgba(0,0,0,0.1)] sm:text-sm transition-all',
                  open ? 'ring-2 ring-[#8c09f4]' : '',
                ]"
              >
                <span class="block truncate z-30">{{
                  selectedLimit || "Limit: 10"
                }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.653a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-for="limit in limits"
                  :key="limit"
                  :value="limit"
                  class="cursor-pointer select-none py-2 pl-4 pr-4 hover:bg-indigo-100 flex items-center gap-2"
                  v-slot="{ selected }"
                >
                  <span v-if="selected" class="text-indigo-600">✔</span>
                  <span :class="selected ? 'font-semibold' : 'font-normal'">
                    {{ limit }}
                  </span>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>

          <!-- Add New Button -->
          <div class="flex">
            <button
              @click="showExportOverlay = true"
              class="bg-[#8C09F4] inline-flex text-white me-2 items-center gap-2 px-4 py-2 text-md font-medium rounded-md shadow focus:outline-none transition relative overflow-hidden"
            >
              <ExportWhiteSolidIcon class="w-6 h-6" /> Export
            </button>
            <RippleButton
              label="Add new user"
              bg-color="bg-green-600"
              hover-color="hover:bg-green-700"
              @click="openAddUserPanel()"
            >
            </RippleButton>
          </div>
        </div>
        <div
          @click.self="openedUserId = null"
          class="mt-4 border-t-2 border-gray-200 rounded-md shadow-sm"
        >
          <div class="overflow-y-auto table-limit-height">
            <table class="min-w-full divide-y divide-gray-200 bg-white">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Select
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    User
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Role
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Phone
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="users.length === 0">
                  <td colspan="5" class="px-4 py-3 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>

                <tr v-for="user in users" :key="user.id">
                  <td class="px-4 py-3">
                    <input
                      :checked="selectedUserIds.includes(user.id)"
                      @click="toggleUserSelection(user.id, $event)"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 text-left border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </td>

                  <td class="px-4 py-3 flex items-center space-x-3">
                    <img
                      :src="API_BASE_PROFILE_URL + '/' + user.profilePicture"
                      alt="Profile"
                      class="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p class="font-medium text-gray-700">
                        {{ user.firstname }} {{ user.lastname }}
                        <span
                          v-if="user.id === userStore.user.id"
                          class="text-blue-500"
                        >
                          (You)
                        </span>
                      </p>
                      <p class="text-sm text-gray-500">{{ user.email }}</p>
                    </div>
                  </td>

                  <td class="px-4 py-3 text-sm font-medium text-gray-500">
                    <div class="flex items-center space-x-1">
                      <template v-if="user.role === 'ADMIN'">
                        <AdminDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <template v-else-if="user.role === 'TEACHER'">
                        <TeacherDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <template v-else-if="user.role === 'STUDENT'">
                        <StudentDisplayInTheTableIcon
                          class="w-6 h-6 text-white"
                        />
                      </template>
                      <span class="leading-none">{{ user.role }}</span>
                    </div>
                  </td>

                  <td class="px-4 py-3 text-sm font-medium text-gray-500">
                    {{ formatPhone(user.phone) }}
                  </td>

                  <td
                    class="relative px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    <div class="flex items-center space-x-3">
                      <RigularTrashIcon
                        class="h-6 w-6 text-gray-700 cursor-pointer"
                        @click="handleDelete(user)"
                      />
                      <RigularEyeIcon
                        class="h-6 w-6 text-gray-700 cursor-pointer"
                        @click="handleView(user.id)"
                      />
                      <div class="relative">
                        <button
                          type="button"
                          class="rounded-full focus:outline-none focus:bg-gray-400 focus:bg-opacity-50 p-1"
                          @click.stop="toggleMenu(user.id)"
                        >
                          <OptionIcon class="h-6 w-6 text-gray-700" />
                        </button>

                        <transition name="fade">
                          <div
                            v-if="openedUserId === user.id"
                            class="absolute right-0 top-8 w-32 bg-white border rounded-md shadow-lg z-50"
                          >
                            <button
                              class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              @click="handleView(user.id)"
                            >
                              View
                            </button>
                            <button
                              class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              @click="handleEdit(user)"
                            >
                              Edit
                            </button>
                            <button
                              class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                              @click="handleDelete(user)"
                            >
                              Delete
                            </button>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
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
      <header>
        <div class="flex items-center justify-between py-5 px-5">
          <h2 class="text-xl font-normal text-gray-700">{{ formTitle }}</h2>
          <CloseIcon
            class="h-8 w-8 cursor-pointer"
            @click="showPanel = false"
          />
        </div>
      </header>
      <hr />
      <div>
        <form
          @submit.prevent="submitNewUser"
          class="flex-1 overflow-y-auto p-4 h-screen"
        >
          <div class="mb-4">
            <label
              for="firstname"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              First name
            </label>
            <input
              v-model="userForm.firstName"
              type="text"
              id="firstname"
              placeholder="Sieng"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="lastname"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Last name
            </label>
            <input
              v-model="userForm.lastName"
              type="text"
              id="lastname"
              placeholder="Vathana"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
          </div>
          <div class="mb-4 relative">
            <label
              for="gender"
              class="text-md font-normal text-gray-600 mb-1 block"
            >
              Gender
            </label>
            <select
              v-model="userForm.gender"
              id="gender"
              class="w-full appearance-none px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 text-md font-normal focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition duration-300"
            >
              <option
                value=""
                class="text-gray-600 font-medium"
                disabled
                selected
              >
                Select gender
              </option>
              <option class="text-gray-600" value="Male">Male</option>
              <option class="text-gray-600" value="Female">Female</option>
            </select>

            <!-- Down arrow icon -->
            <div
              class="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center text-gray-400"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="lastname"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Email
            </label>
            <input
              v-model="userForm.email"
              type="text"
              id="email"
              placeholder="example@gmail.com"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="lastname"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Phone number
            </label>
            <input
              v-model="userForm.phone"
              type="text"
              id="phone"
              placeholder="012345678"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Password
            </label>
            <input
              v-model="userForm.password"
              type="text"
              id="password"
              :readonly="isEditMode"
              placeholder="*********"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
            <p v-if="isEditMode" class="text-sm text-purple-600 mt-1">
              Password cannot be changed here. Please use the password reset
              feature.
            </p>
          </div>
          <div class="mb-4 relative">
            <label
              for="gender"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Role
            </label>
            <select
              v-model="selectRoleModel"
              id="gender"
              class="w-full appearance-none px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 text-md font-normal focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition duration-300"
            >
              <option
                value=""
                class="text-gray-600 medium text-md"
                disabled
                selected
              >
                Select role
              </option>
              <option class="text-gray-600" value="ADMIN">Admin</option>
              <option class="text-gray-600" value="STUDENT">Student</option>
              <option class="text-gray-600" value="TEACHER">Teacher</option>
            </select>

            <!-- Down arrow icon -->
            <div
              class="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center text-gray-400"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div
            class="mb-4 relative w-full"
            v-if="selectRoleModel === 'TEACHER'"
          >
            <label class="block text-md font-medium text-gray-700 mb-1">
              Department(s)
            </label>

            <!-- The input that opens dropdown -->
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

            <!-- Dropdown -->
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
                    readonly
                  />
                  <span>{{ dp.name }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-4" v-if="selectRoleModel === 'STUDENT'">
            <label
              for="lastname"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Academic Year
            </label>
            <input
              disabled
              v-model="userForm.year"
              type="number"
              id="phone"
              placeholder="1"
              value="1"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            />
          </div>

          <!-- batch selecttion -->
          <div class="mb-4" v-if="selectRoleModel === 'STUDENT'">
            <label
              for="batch"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Batch
            </label>
            <select
              v-model="userForm.batch"
              id="batch"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            >
              <option value="" disabled>Select batch</option>
              <option v-for="batch in batchs" :key="batch.id" :value="batch.id">
                {{ batch.batchName }}
              </option>
            </select>
          </div>

          <!-- major selection -->

          <div class="mb-4 relative" v-if="selectRoleModel === 'STUDENT'">
            <label
              for="major"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Major
            </label>
            <select
              v-model="selectedMajor"
              id="gender"
              class="w-full appearance-none px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 text-md font-normal focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition duration-300"
            >
              <option
                value=""
                class="text-gray-600 medium text-md"
                disabled
                selected
              >
                Select Major
              </option>
              <option
                v-for="major in majors"
                :key="major.id"
                :value="major.id"
                class="text-gray-600"
              >
                {{ major.name }}
              </option>
            </select>

            <!-- Down arrow icon -->
            <div
              class="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center text-gray-400"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div class="mb-4" v-if="selectRoleModel === 'STUDENT'">
            <label
              for="shift"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Shift
            </label>
            <select
              v-model="selectShift"
              id="shift"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            >
              <option value="" disabled>Select shift</option>
              <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
                {{ formateShift(shift.name, shift.startTime, shift.endTime) }}
              </option>
            </select>
          </div>
          <div class="mb-4" v-if="selectRoleModel === 'STUDENT'">
            <label
              for="shift"
              class="text-md font-medium text-gray-600 mb-1 block"
            >
              Location
            </label>
            <select
              v-model="selectLocation"
              id="shift"
              class="w-full px-2 py-1 border border-gray-300 rounded-md text-md font-normal text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c09f4] focus:shadow-md transition-shadow duration-300"
            >
              <option value="" disabled>Select location (class)</option>
              <option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >
                {{
                  formateLocation(
                    location.buildingName,
                    location.floorNumber,
                    location.romeName
                  )
                }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-md font-medium text-gray-700 mb-1"
              >Profile Picture</label
            >

            <div
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition duration-200"
              @click="$refs.imageInput.click()"
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
                  alt="Preview"
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
          <div class="w-full d-flex justify-start">
            <button
              type="submit"
              class="text-white me-2 bg-[#8C09F4] px-6 cursor-pointer py-2 text-md text-md font-medium rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              class="text-red-400 bg-red-400 bg-opacity-30 px-6 cursor-pointer py-2 text-md text-md font-medium rounded-md"
            >
              Cancel
            </button>
          </div>
          <div>
            <p v-if="userFormError" class="text-red-500 text-md font-normal">
              {{ userFormError }}
            </p>
          </div>
          <p class="mb-96"></p>
        </form>
      </div>
    </div>
  </transition>

  <div>
    <!-- Export Overlay -->
    <transition name="fade">
      <div
        v-if="showExportOverlay"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="showExportOverlay = false"
      >
        <div
          class="bg-white rounded-lg p-6 shadow-lg min-w-[300px] md:w-[550px]"
        >
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Export Users</h2>

          <!-- Scope: All / Role / Selected -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Export scope:</label>
            <select
              v-model="exportScope"
              class="w-full border rounded-md px-3 py-2"
            >
              <option value="all">All Users</option>
              <option value="role">By Role</option>
              <option value="selected">Selected Users</option>
            </select>
          </div>

          <!-- Role selector if 'role' scope -->
          <div v-if="exportScope === 'role'" class="mb-4">
            <label class="block text-gray-600 mb-1">Select role:</label>
            <select
              v-model="selectedRoleForExport"
              class="w-full border rounded-md px-3 py-2"
            >
              <option value="ADMIN">All Admin</option>
              <option value="TEACHER">All Teacher</option>
              <option value="STUDENT">All Student</option>
            </select>
          </div>

          <!-- Limit selector if 'limit' or any scope supports it -->
          <div v-if="exportScope !== 'selected'" class="mb-4">
            <label class="block text-gray-600 mb-1">Limit:</label>
            <input
              type="number"
              v-model.number="exportLimit"
              min="1"
              placeholder="Enter limit or leave blank"
              class="w-full border rounded-md px-3 py-2"
            />
          </div>

          <!-- Format -->
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Format:</label>
            <select
              v-model="exportFormat"
              class="w-full border rounded-md px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>

          <!-- Selected users info -->
          <div v-if="exportScope === 'selected'" class="mb-4">
            <p class="text-sm text-gray-500">
              {{ selectedUserIds.length }} users selected.
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-3">
            <button
              @click="showExportOverlay = false"
              class="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              @click="exportUsers"
              class="px-4 py-2 rounded-md bg-[#8C09F4] text-white hover:bg-[#7207c2]"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import CloseIcon from "../icons/CloseIcon.vue";
import SuccessIcon from "../icons/SuccessIcon.vue";
import SearchIcon from "../icons/SearchIcon.vue";
import StudentIcon from "../icons/StudentIcon.vue";
import TeacherIcon from "../icons/TeacherIcon.vue";
import AdminIcon from "../icons/AdminIcon.vue";
import RippleButton from "../Custom/RippleButton.vue";
import RigularEyeIcon from "../icons/RigularEyeIcon.vue";
import RigularTrashIcon from "../icons/RigularTrashIcon.vue";
import OptionIcon from "../icons/OptionIcon.vue";
import ExportWhiteSolidIcon from "../icons/ExportWhiteSolidIcon.vue";

import { useToast } from "vue-toastification";
import AdminDisplayInTheTableIcon from "../icons/AdminDisplayInTheTableIcon.vue";
import StudentDisplayInTheTableIcon from "../icons/StudentDisplayInTheTableIcon.vue";
import TeacherDisplayInTheTableIcon from "../icons/TeacherDisplayInTheTableIcon.vue";
import { API_BASE_PROFILE_URL, API_BASE_URL } from "@/config/useWebSocket";
import { useUserStore } from "@/store/store";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import axios from "axios";

const toast = useToast();
export default {
  components: {
    CloseIcon,
    SuccessIcon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    TransitionRoot,
    TransitionChild,
    TeacherIcon,
    AdminIcon,
    StudentIcon,
    SearchIcon,
    RippleButton,
    RigularEyeIcon,
    RigularTrashIcon,
    OptionIcon,
    AdminDisplayInTheTableIcon,
    TeacherDisplayInTheTableIcon,
    StudentDisplayInTheTableIcon,
    ExportWhiteSolidIcon,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      isEditMode: false,
      formTitle: "Add New User",
      userForm: {
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        email: "",
        gender: "",
        role: "",
        major: "",
        shift: "",
        batch: "",
        location: "",
        semester: "",
        year: "",
        profilePicture: null,
        departments: [],
      },
      selectLocation: "",
      selectShift: "",
      selectedDepartments: [],
      selectedMajor: "",
      showPanel: false,
      stats: {
        totalStudents: 0,
        totalTeachers: 0,
        totalAdmins: 0,
        teacherPics: [],
        studentPics: [],
        adminPics: [],
      },
      imageFile: null,
      userFormError: "",
      dropdownOpen: false,

      locations: [],
      shifts: [],
      semesters: [],
      batchs: [],
      selectedDepartments: [],
      majors: [],
      departments: [],
      selectRoleModel: "",
      imagePreview: null,
      showEditModal: false,
      updateStudentModelError: "",
      updateStudentModelSuccess: null,
      API_BASE_PROFILE_URL,
      API_BASE_URL,
      users: [],
      roles: ["All Roles", "STUDENT", "TEACHER", "ADMIN"], // Match backend roles
      selectedRole: "All Roles",
      limits: ["10", "20", "50", "100"],
      selectedLimit: "10",
      searchQuery: "",
      openedUserId: null,

      showExportOverlay: false,
      exportFormat: "pdf",
      exportScope: "all", // all / role / selected
      selectedRoleForExport: "ADMIN",
      exportLimit: 10,
      selectedUserIds: [], // tracked by checkboxes in table
    };
  },
  watch: {
    "userForm.shift"(newVal) {
      console.log("Shift changed to:", newVal, typeof newVal);
    },
  },
  computed: {
    selectedDepartmentsNames() {
      return this.departments
        .filter((dp) => this.selectedDepartments.includes(dp.id))
        .map((dp) => dp.name);
    },
  },
  methods: {
    async exportUsers() {
      try {
        const payload = {
          ids: this.selectedUserIds.length ? this.selectedUserIds : null,
          role: this.selectedRoleForExport === "All Roles" ? null : this.selectedRoleForExport,
          limit: this.exportLimit,
          format: this.exportFormat,
        };

        console.log("Export payload:", payload);

        const response = await axios.post(
          this.API_BASE_URL + "/api/reports/export/option",
          payload,
          { responseType: "blob", withCredentials: true }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `users.${this.exportFormat === "pdf" ? "pdf" : "xlsx"}`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.showExportOverlay = false;
      } catch (err) {
        console.error("Export failed:", err);
      }
    },
    toggleUserSelection(userId, event) {
      if (event.target.checked) {
        if (!this.selectedUserIds.includes(userId)) {
          this.selectedUserIds.push(userId);
        }
      } else {
        this.selectedUserIds = this.selectedUserIds.filter(
          (id) => id !== userId
        );
      }
    },
    formateShift(name, start, end) {
      return `${name} (${start} - ${end})`;
    },
    formateLocation(buildingName, FloorNumber, romeName) {
      return `Building: ${buildingName} Floor: ${FloorNumber} Room: ${romeName}`;
    },
    async submitNewUser() {
      this.userForm.departments = this.selectedDepartments;
      this.userForm.major = this.selectedMajor;
      this.userForm.role = this.selectRoleModel;
      this.userForm.location = this.selectLocation;
      this.userForm.shift = this.selectShift;

      const formData = new FormData();

      for (const key in this.userForm) {
        if (Array.isArray(this.userForm[key])) {
          if (this.isEditMode && key === "departments") {
            // Send JSON string for departments
            formData.append(key, JSON.stringify(this.userForm[key]));
          } else {
            this.userForm[key].forEach((value) => {
              formData.append(key, value);
            });
          }
        } else if (key !== "profilePicture") {
          if (key === "major") {
            formData.append("majorId", this.userForm[key] ?? "");
          } else {
            formData.append(key, this.userForm[key] ?? "");
          }
        }
      }

      if (this.imageFile) {
        formData.append("profilePicture", this.imageFile);
      }

      try {
        if (this.isEditMode) {
          // EDIT mode - choose URL based on role
          let url = "";
          if (this.userForm.role === "STUDENT") {
            url = `${this.API_BASE_URL}/api/students/update-for-admin`;
          } else if (this.userForm.role === "TEACHER") {
            url = `${this.API_BASE_URL}/api/teachers/update-for-admin`;
          } else if (this.userForm.role === "ADMIN") {
            url = `${this.API_BASE_URL}/api/users/update-for-admin`;
          } else {
            toast.error("Unknown user role for update.");
            return;
          }
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

          const { data } = await axios.put(url, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (data.success) {
            toast.success(data.message || "User updated successfully!", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
            this.loadAllUsers();
            this.showPanel = false;
          } else {
            toast.error(data.message || "Failed to update user.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        } else {
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          //ADD new user
          const { data } = await axios.post(
            `${this.API_BASE_URL}/api/user/register`,
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (data.success) {
            toast.success(data.message || "User added successfully!", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
            this.loadAllUsers();
            this.showPanel = false;
          } else {
            toast.error(data.message || "Failed to add user.", {
              position: "bottom-center",
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        }
      } catch (error) {
        console.error("Error submitting user:", error);
        toast.error("Error submitting user", {
          position: "bottom-center",
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    },
    toggleDepartment(id) {
      const index = this.selectedDepartments.indexOf(id);
      if (index === -1) {
        this.selectedDepartments.push(id);
      } else {
        this.selectedDepartments.splice(index, 1);
      }

      console.log("Selected Departments:", this.selectedDepartments);
    },
    formatPhone(phone) {
      if (!phone) return "-";
      return phone.startsWith("0") ? "+855" + phone.substring(1) : phone;
    },
    openAddUserPanel() {
      this.isEditMode = false;
      this.formTitle = "Add New User";

      this.userForm = {
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        email: "",
        gender: "",
        role: "",
        major: "",
        batch: "",
        year: 1,
        location: "",
        shift: "",
        semester: 1,
        profilePicture: null,
        departments: [],
      };

      this.selectRoleModel = "";
      this.selectedDepartments = [];
      this.selectedMajor = "";
      this.imagePreview = null;
      this.imageFile = null;
      this.addNewUserpayloadError = "";

      this.showPanel = true;
    },
    async loadAllUsers() {
      const params = {
        role: this.selectedRole !== "All Roles" ? this.selectedRole : undefined,
        limit: this.selectedLimit,
        search: this.searchQuery || undefined,
      };

      const response = await axios.get(API_BASE_URL + "/api/user/all", {
        params,
        withCredentials: true,
      });

      if (response.status === 200) {
        this.users = response.data;
      }

      console.log("Users loaded:", this.users);
    },
    async loadUserInfo(user) {
      this.selectRoleModel = user.role;
      try {
        this.isEditMode = true;
        this.formTitle = "Edit User";

        if (user.role === "STUDENT") {
          const { data } = await axios.get(
            `${API_BASE_URL}/api/students/${user.id}`,
            { withCredentials: true }
          );
          console.log("Student data:", data);
          Object.assign(this.userForm, {
            userId: data.data.userId,
            firstName: data.data.firstname,
            lastName: data.data.lastname,
            phone: data.data.phone,
            email: data.data.email,
            major: data.data.major, // make sure backend sends ID
            batch: data.data.batch,
            year: data.data.year,
            gender: data.data.gender,
            role: "STUDENT",
          });
          const foundMajor = this.majors.find(
            (m) => m.name === data.data.major
          );
          this.selectedMajor = foundMajor ? foundMajor.id : null;
        }

        if (user.role === "TEACHER") {
          const { data } = await axios.get(
            `${API_BASE_URL}/api/teachers/${user.id}`,
            { withCredentials: true }
          );
          Object.assign(this.userForm, {
            userId: data.data.teacherId,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            phone: data.data.phone,
            email: data.data.email,
            gender: data.data.gender,
            role: "TEACHER",
          });
          this.selectedDepartments = (data.data.departments || []).map(
            (d) => d.id
          );
        }

        if (user.role === "ADMIN") {
          const { data } = await axios.get(
            `${API_BASE_URL}/api/admins/${user.id}`,
            { withCredentials: true }
          );
          Object.assign(this.userForm, {
            userId: data.data.id,
            firstName: data.data.firstname,
            lastName: data.data.lastname,
            phone: data.data.phone,
            email: data.data.email,
            gender: data.data.gender,
            role: "ADMIN",
          });
        }

        this.imagePreview = user.profilePicture
          ? `${this.API_BASE_PROFILE_URL}/${user.profilePicture}`
          : null;

        this.showPanel = true;
      } catch (err) {
        console.error("Error loading user info:", err);
      }
    },
    toggleMenu(id) {
      this.openedUserId = this.openedUserId === id ? null : id;
    },
    async handleView(id) {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/user/beforeDetail/" + id,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data.role);

        if (response.data.data.role == "STUDENT") {
          this.$router.push({ name: "studentDetail", params: { id: id } });
        } else if (response.data.data.role == "TEACHER") {
          this.$router.push({ name: "teacherDetail", params: { id: id } });
        } else if (response.data.data.role == "ADMIN") {
          this.$router.push({ name: "adminDetail", params: { id: id } });
        }
      } catch (e) {
        console.log(e);
      }
      //this.$router.push({ name: "userDetails", params: { id: id}})
    },
    handleEdit(user) {
      this.loadUserInfo(user);
      this.openedUserId = null;
    },
    handleDelete(user) {
      console.log("Delete", user);
      this.openedUserId = null;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.closeMenu();
      }
    },
    handleEsc(event) {
      if (event.key === "Escape") {
        this.closeMenu();
      }
    },
    handleSearch() {
      this.loadAllUsers();
    },
    openDetailPage(id) {
      this.$router.push({ name: "studentDetail", params: { id: id } });
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    handleDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    async fetchDepartments() {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/departments/all",
          { withCredentials: true }
        );
        this.departments = response.data.data;
        console.log("Departments fetched:", response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },
    async fetchMajors() {
      try {
        const response = await axios.get(API_BASE_URL + "/api/majors/all", {
          withCredentials: true,
        });
        console.log("major load: ", response.data);
        this.majors = response.data.data;
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    },
    async fetchUserCounts() {
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/admins/dashboard-stats",
          {
            withCredentials: true,
          }
        );
        this.stats = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchSemesters() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/semesters", {
          withCredentials: true,
        });
        if (res.data.success) {
          this.semesters = res.data.data;
        } else {
          console.log(res.data.message);
          toast.error("failed to fetch semester!", {
            position: "bottom-center",
          });
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch sememster");
      }
    },
    async fetchBatchs() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/batchs", {
          withCredentials: true,
        });
        if (res.data.success) {
          this.batchs = res.data.data;
          console.log("batch load: ", res.data.data);
        } else {
          console.log(res.data.message);
          toast.error("failed to fetch batchs!", {
            position: "bottom-center",
          });

          console.log(res.data)
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch batchs");
      }
    },
    async fetchShifts() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/shifts", {
          withCredentials: true,
        });
        if (res.data.success) {
          this.shifts = res.data.data;
          if (!this.userForm.shift) {
            this.userForm.shift = "";
          }
          console.log(
            "userForm.shift:",
            this.userForm.shift,
            typeof this.userForm.shift
          );
          console.log(
            "shifts[0].id:",
            this.shifts[0].id,
            typeof this.shifts[0].id
          );

          console.log("Shifts load: ", res.data.data);
        } else {
          console.log(res.data.message);
          toast.error("failed to fetch shifts!", {
            position: "bottom-center",
          });
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch batchs");
      }
    },
    async fetchLocations() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/locations", {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("location load: ", res.data.data);
          this.locations = res.data.data;
        } else {
          console.log(res.data.message);
          toast.error("failed to fetch locations!", {
            position: "bottom-center",
          });
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to fetch locations");
      }
    },
  },
  mounted() {
    this.fetchMajors();
    this.fetchBatchs();
    this.loadAllUsers();
    this.fetchDepartments();
    this.fetchUserCounts();
    this.fetchSemesters();
    this.fetchLocations();
    this.fetchShifts();
  },
  watch: {
    selectedRole() {
      this.loadAllUsers();
    },
    selectedLimit() {
      this.loadAllUsers();
    },
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

@media (max-height: 820px) {
  .table-limit-height {
    max-height: 350px; /* or any value you want */
    overflow-y: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
