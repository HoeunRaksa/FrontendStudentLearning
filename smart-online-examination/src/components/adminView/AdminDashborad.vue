<template>
  <div class="h-screen w-screen bg-gray-100 flex">
    <!-- Overlay: fades only -->
    <transition name="overlay-fade">
      <div
        v-if="sidebarVisible"
        class="fixed inset-0 bg-black bg-opacity-30 z-40 xl:hidden"
        @click.self="sidebarVisible = false"
      ></div>
    </transition>

    <!-- Sidebar for small screens: slide + fade -->
    <transition name="fade-slide">
      <aside
        v-if="sidebarVisible"
        class="fixed left-0 top-0 bg-white w-64 h-full shadow-lg z-50 flex flex-col xl:hidden"
      >
        <div class="p-4 flex justify-between w-full">
          <div class="flex items-center justify-center">
            <EduIcon class="w-11 h-11 text-[#8C09F4]" />
            <span class="text-2xl text-gray-700 font-bold ps-1">SmartExam</span>
          </div>
          <button
            @click="sidebarVisible = false"
            class="text-gray-700 hover:text-gray-900 focus:outline-none"
            title="Close sidebar"
          >
            <CloseIcon class="w-6 h-6 opacity-70" />
          </button>
        </div>

        <div class="w-full px-4 pb-2 mt-5">
          <RouterLink
            to="/admin-dashboard"
            @click="toggleDashboardMenu()"
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <DashboardIcon class="text-white w-5 h-5"></DashboardIcon>
            <span class="text-lg text-white font-normal ps-2">Dashboard</span>
          </RouterLink>

          <RouterLink
            to="/admin-dashboard/user-management"
            @click="toggleDashboardMenu()"
            class="px-4 py-2 mt-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <UserIcon class="text-white w-5 h-5"></UserIcon>
            <span class="text-lg text-white font-normal ps-2"
              >User Management</span
            >
          </RouterLink>
          <RouterLink
            to="/admin-dashboard/academic"
            class="px-4 py-2 mt-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <AcademicIcon class="text-white w-5 h-5"></AcademicIcon>
            <span class="text-lg text-white font-normal ps-2">Academic</span>
          </RouterLink>
          <RouterLink
            to="/admin-dashboard/activity-long"
            class="px-4 py-2 mt-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <UserActivityWhiteIcon
              class="text-white w-5 h-5"
            ></UserActivityWhiteIcon>
            <span class="text-lg text-white font-normal ps-2"
              >Activity Log</span
            >
          </RouterLink>

          <RouterLink
            to="/admin-dashboard/notification"
            class="px-4 py-2 mt-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <MessageSolidWhiteIcon
              class="text-white w-5 h-5"
            ></MessageSolidWhiteIcon>
            <span class="text-lg text-white font-normal ps-2"
              >Notification</span
            >
          </RouterLink>

                    <RouterLink
            :to = "{ name: 'ad-setting'}"
            class="px-4 py-2 mt-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <SettingIcon
              class="text-white w-5 h-5"
            ></SettingIcon>
            <span class="text-lg text-white font-normal ps-2"
              >Settings</span
            >
          </RouterLink>

          <!-- <transition
            name="slide-fade"
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="max-h-0 opacity-0 -translate-y-2"
            enter-to-class="max-h-40 opacity-100 translate-y-0"
            leave-from-class="max-h-40 opacity-100 translate-y-0"
            leave-to-class="max-h-0 opacity-0 -translate-y-2"
          >
            <div v-if="showDashboardMenu" class="mt-2 space-y-2 overflow-hidden">
              <div
                class="text-gray-700 transition-all duration-300 px-3 py-2 rounded cursor-pointer hover:bg-gray-200 flex justify-start items-center"
              >
                <ExpaneIcon class="w-3 h-3 text-gray-800 me-2" />
                <span class="text-md font-medium">Overview</span>
              </div>
              <div
                class="text-gray-700 transition-all duration-300 px-3 py-2 rounded cursor-pointer hover:bg-gray-200 flex justify-start items-center"
              >
                <ExpaneIcon class="w-3 h-3 text-gray-800 me-2" />
                <span class="text-md font-medium">Reports</span>
              </div>
              <div
                class="text-gray-700 transition-all duration-300 px-3 py-2 rounded cursor-pointer hover:bg-gray-200 flex justify-start items-center"
              >
                <ExpaneIcon class="w-3 h-3 text-gray-800 me-2" />
                <span class="text-md font-medium">Analytics</span>
              </div>
            </div>
          </transition> -->
        </div>
      </aside>
    </transition>

    <!-- Permanent Sidebar for xl+ screens -->
    <aside
      class="hidden xl:flex bg-white shadow-lg w-80 h-screen flex-col justify-between"
    >
      <!-- TOP CONTENT (Logo + Links) -->
      <div class="px-4 py-2">
        <div class="p-4 flex justify-between w-full">
          <div class="flex items-center justify-center">
            <EduIcon class="w-11 h-11 text-[#8C09F4]" />
            <span class="text-2xl text-gray-700 font-bold ps-1">SmartExam</span>
          </div>
          <div class="flex flex-col items-center justify-center">
            <ExpaneIcon class="fill-current text-gray-700" />
          </div>
        </div>

        <!-- Navigation Links -->
        <RouterLink to="/admin-dashboard" class="w-full px-4 pb-2 mt-5">
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <DashboardIcon class="text-white w-5 h-5"></DashboardIcon>
            <span class="text-lg text-white font-normal ps-2">Dashboard</span>
          </div>
        </RouterLink>

        <RouterLink
          to="/admin-dashboard/user-management"
          class="w-full px-4 pb-2 mt-1"
        >
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <UserIcon class="text-white w-5 h-5"></UserIcon>
            <span class="text-lg text-white font-normal ps-2"
              >User Management</span
            >
          </div>
        </RouterLink>

        <RouterLink
          to="/admin-dashboard/academic"
          class="w-full px-4 pb-2 mt-1"
        >
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <AcademicIcon class="text-white w-5 h-5"></AcademicIcon>
            <span class="text-lg text-white font-normal ps-2">Academic</span>
          </div>
        </RouterLink>

        <RouterLink
          to="/admin-dashboard/activity-long"
          class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
        >
          <UserActivityWhiteIcon
            class="text-white w-5 h-5"
          ></UserActivityWhiteIcon>
          <span class="text-lg text-white font-normal ps-2">Activity Log</span>
        </RouterLink>

        <RouterLink
          to="/admin-dashboard/notification"
          class="w-full px-4 pb-2 mt-1"
        >
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <MessageSolidWhiteIcon
              class="text-white w-5 h-5"
            ></MessageSolidWhiteIcon>
            <span class="text-lg text-white font-normal ps-2"
              >Notification</span
            >
          </div>
        </RouterLink>

        <RouterLink :to="{ name: 'materails' }" class="w-full px-4 pb-2 mt-1">
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <MaterrialsIcon class="text-white w-5 h-5"></MaterrialsIcon>
            <span class="text-lg text-white font-normal ps-2"
              >View Materails</span
            >
          </div>
        </RouterLink>

        <RouterLink
          to="/admin-dashboard/settings"
          class="w-full px-4 pb-2 mt-1"
        >
          <div
            class="px-4 py-2 rounded-[5px] flex justify-start items-center bg-[#8c09f4] text-white cursor-pointer hover:bg-[#8c09f4]"
          >
            <SettingIcon class="text-white w-5 h-5"></SettingIcon>
            <span class="text-lg text-white font-normal ps-2">Settings</span>
          </div>
        </RouterLink>
      </div>
      <!-- ✅ LOGOUT BUTTON STYLED NICELY -->
      <!-- ✅ LOGOUT BUTTON (Aligned perfectly) -->
      <div class="mt-auto w-full px-4 pb-6">
        <button
          @click="logout"
          class="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white text-base py-2 px-4 rounded-[5px] transition-all duration-300"
        >
          <LogoutIcon class="w-5 h-5 text-white" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <div class="w-full px-3 overflow-y-auto h-screen">
      <header
        class="flex items-center justify-between bg-white shadow-md rounded-md px-4 py-3 my-4 sticky top-[16px]"
      >
        <!-- Left: Hamburger + Search -->
        <div class="flex items-center gap-2">
          <button
            @click="sidebarVisible = true"
            class="xl:hidden p-2 rounded hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div class="flex items-center rounded-md px-3 py-1">
            <SearchBarIcon class="w-5 h-5 text-gray-500" />
            <span class="ml-2 text-gray-500">Search</span>
          </div>
        </div>

        <!-- Right: Notifications + Profile -->
        <div class="flex items-center gap-4 relative">
          <!-- Notifications -->
          <div class="relative">
            <button
              @click="toggleNotif"
              class="relative p-2 rounded hover:bg-gray-200"
            >
              <NotifIcon class="w-5 h-5 text-gray-600" />
              <span
                v-if="notifications.length > 0"
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Dropdown -->
            <transition name="fade">
              <div
                v-if="showNotif"
                class="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50"
              >
                <!-- Header -->
                <div
                  class="flex justify-between items-center px-4 py-2 border-b"
                >
                  <span class="font-semibold text-gray-600">Notifications</span>
                  <div class="flex">
                    <p
                      class="flex justify-center text-md font-medium py-[2px] px-2 rounded-md me-2 items-center bg-blue-600 bg-opacity-10 text-blue-700"
                    >
                      4 New
                    </p>
                    <p class="p-2 bg-gray-700 bg-opacity-15 rounded-full">
                      <MailIcon class="h-6 w-6" />
                    </p>
                  </div>
                </div>

                <!-- Notifications List -->
                <ul class="max-h-80 overflow-y-auto divide-y">
                  <li
                    v-for="(notif, index) in notifications"
                    :key="index"
                    class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 relative"
                  >
                    <!-- Avatar -->
                    <img
                      :src="notif.avatar"
                      class="w-10 h-10 rounded-full border"
                      alt="User Avatar"
                    />

                    <!-- Content -->
                    <div class="flex-1">
                      <p class="text-sm text-gray-700">
                        <span class="font-semibold">{{ notif.sender }}</span>
                        {{ notif.message }}
                      </p>
                      <p class="text-xs text-gray-400">{{ notif.time }}</p>
                    </div>

                    <!-- Close -->
                    <button
                      @click="removeNotif(index)"
                      class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                      ✖
                    </button>
                  </li>
                </ul>

                <!-- Empty State -->
                <div
                  v-if="notifications.length === 0"
                  class="p-4 text-center text-gray-500 text-sm"
                >
                  No notifications
                </div>
              </div>
            </transition>
          </div>

          <!-- Profile -->
          <img
            :src="API_BASE_PROFILE_URL + '/' + userStore.user?.profile"
            alt="Profile"
            class="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </header>
      <main class="mx-auto max-w-screen-xl">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import EduIcon from "../icons/EduIcon.vue";
import ExpaneIcon from "../icons/ExpaneIcon.vue";
import DashboardIcon from "../icons/DashboardIcon.vue";
import RightPointerIcon from "../icons/RightPointerIcon.vue";
import SearchBarIcon from "../icons/SearchBarIcon.vue";
import NotifIcon from "../icons/NotifIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import ListIcon from "../icons/ListIcon.vue";
import MaterrialsIcon from "../icons/MaterrialsIcon.vue";
import ResultIcon from "../icons/ResultIcon.vue";
import SettingIcon from "../icons/SettingIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import UserIcon from "../icons/UserIcon.vue";
import { useUserStore } from "@/store/store";
import axios from "axios";
import { API_BASE_URL, API_BASE_PROFILE_URL } from "@/config/useWebSocket";
import { useRouter } from "vue-router";
import AcademicIcon from "../icons/AcademicIcon.vue";
import UserActivityWhiteIcon from "../icons/UserActivityWhiteIcon.vue";
import MessageSolidWhiteIcon from "../icons/MessageSolidWhiteIcon.vue";
import MailIcon from "../icons/MailIcon.vue";

export default {
  components: {
    EduIcon,
    ExpaneIcon,
    DashboardIcon,
    RightPointerIcon,
    SearchBarIcon,
    NotifIcon,
    CloseIcon,
    ListIcon,
    MaterrialsIcon,
    ResultIcon,
    SettingIcon,
    LogoutIcon,
    UserIcon,
    AcademicIcon,
    UserActivityWhiteIcon,
    MessageSolidWhiteIcon,
    MailIcon,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter(); // Use this instead of this.$router

    // Fix the logic also
    if (!userStore.user || userStore.user.role !== "ADMIN") {
      router.push("/unauthorized"); // ✅ Correct usage
    }
    return { userStore };
  },
  data() {
    return {
      showNotif: false,
      notifications: [
        {
          sender: "Admin",
          message: " sent an announcement to all students.",
          time: "2h ago",
          avatar: "https://i.pravatar.cc/40?img=1",
        },
        {
          sender: "Teacher John",
          message: " uploaded a new assignment.",
          time: "Yesterday",
          avatar: "https://i.pravatar.cc/40?img=2",
        },
        {
          sender: "System",
          message: " scheduled maintenance tonight at 10PM.",
          time: "3 days ago",
          avatar: "https://i.pravatar.cc/40?img=3",
        },
      ],

      API_BASE_URL,
      API_BASE_PROFILE_URL,
      sidebarVisible: false,
      showDashboardMenu: true,
    };
  },
  methods: {
    toggleNotif() {
      this.showNotif = !this.showNotif;
    },
    removeNotif(index) {
      this.notifications.splice(index, 1);
    },
    toggleDashboardMenu() {
      this.showDashboardMenu = !this.showDashboardMenu;
    },
    async logout() {
      if (confirm("Are you sure you want to logout?")) {
        try {
          const response = await axios.post(
            API_BASE_URL + "/api/user/logout",
            {}, // empty body
            { withCredentials: true } // ✅ put it here
          );
          // this.userStore.logout();
          this.$router.push("/");
          this.userStore.user = null; // Clear user from store
          console.log("Logout successful:", this.userStore.user);
          console.log("Logout response:", response.data);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      } else {
        console.log("Logout cancelled.");
      }
    },
  },
  mounted() {
    console.log(this.userStore.user);
  },
};
</script>

<style>
/* Overlay fade only */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Dashboard submenu slide fade (optional, keep your original styles) */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-0.5rem);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 10rem;
  opacity: 1;
  transform: translateY(0);
}

/* notif css */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
