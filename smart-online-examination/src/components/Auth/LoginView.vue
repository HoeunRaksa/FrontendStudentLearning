<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f5f3f4]">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md h-[650px] bg-white p-12 rounded-xl shadow-lg mx-2 space-y-6"
    >
      <!-- Header -->
      <header class="text-center">
        <h2
          class="flex items-center justify-center text-3xl font-bold text-gray-800 mb-2 space-x-2"
        >
          <EduIcon class="h-9 w-9 me-1 text-gray-700" />
          <span class="text-gray-600">Smart Examination</span>
        </h2>
        <p class="text-gray-600 text-start font-[500] pt-3 text-2xl">
          Welcome to Smart Examination !
        </p>
        <p class="text-gray-500 text-md text-start pt-1 font-normal">
          Please sign in to your account and start learning.
        </p>
      </header>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
          >Email</label
        >
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="you@example.com"
          class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
        />
        <p v-if="error.email" class="text-red-500 text-xs mt-1">
          {{ error.email }}
        </p>
      </div>

      <!-- Password -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Password</label
        >
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="••••••••"
          class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
        />
        <p v-if="error.password" class="text-red-500 text-xs mt-1">
          {{ error.password }}
        </p>
      </div>

      <!-- Remember + Forgot -->
      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center space-x-2 text-gray-600">
          <input
            type="checkbox"
            v-model="rememberMe"
            class="accent-gray-800 w-4 h-4"
          />
          <span>Remember me</span>
        </label>
        <router-link
          to="/forgot-password"
          class="text-gray-600 hover:text-gray-800 hover:underline"
        >
          Forgot password?
        </router-link>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span v-if="!loading">Sign In</span>
        <span v-else class="flex items-center space-x-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Signing in...</span>
        </span>
      </button>

      <p class="text-center text-xs text-gray-400 mt-4">
        &copy; 2025 Smart Online Examination
      </p>
    </form>
  </div>
</template>

<script>
import { API_BASE_URL } from "@/config/useWebSocket";
import axios from "axios";
import { useUserStore } from "@/store/store";
import EduIcon from "../icons/EduIcon.vue";

export default {
  components: { EduIcon },
  data() {
    return {
      rememberMe: false,
      email: "",
      password: "",
      loading: false, // 🔹 loading state
      error: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async detectBrave() {
      try {
        return navigator.brave && (await navigator.brave.isBrave());
      } catch {
        return false;
      }
    },
    async getDeviceInfo() {
      const ua = navigator.userAgent;
      let browser = "Unknown";
      let deviceType = "Unknown";

      if (await this.detectBrave()) {
        browser = "Brave";
      } else if (ua.includes("Edg")) {
        browser = "Edge";
      } else if (ua.includes("Chrome")) {
        browser = "Chrome";
      } else if (ua.includes("Safari")) {
        browser = "Safari";
      } else if (ua.includes("Firefox")) {
        browser = "Firefox";
      }

      if (/Windows/.test(ua)) deviceType = "Windows";
      else if (/Macintosh/.test(ua)) deviceType = "Mac";
      else if (/Android/.test(ua)) deviceType = "Android";
      else if (/iPhone|iPad/.test(ua)) deviceType = "iOS";

      let location = "Unknown";

      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 7000,
          })
        );
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const geo = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: { lat, lon, format: "json" },
          }
        );

        const city =
          geo.data.address.city ||
          geo.data.address.town ||
          geo.data.address.village ||
          "";
        const country = geo.data.address.country || "";

        location = city ? `${city}, ${country}` : country;
      } catch (err) {
        try {
          const ipRes = await axios.get("http://ip-api.com/json");
          if (ipRes.data.status === "success") {
            location = `${ipRes.data.city}, ${ipRes.data.country}`;
          }
        } catch (e) {
          console.warn("Failed to get location from IP", e);
        }
      }

      return {
        browser,
        device: navigator.platform || "Unknown",
        deviceType,
        location,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
      };
    },
    validateEmail() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) this.error.email = "Email is required";
      else if (!pattern.test(this.email))
        this.error.email = "Invalid email format";
      else this.error.email = "";
    },
    validatePassword() {
      if (!this.password) this.error.password = "Password is required";
      else if (this.password.length < 2)
        this.error.password = "Password must be at least 6 characters";
      else this.error.password = "";
    },
    async handleSubmit() {
      if (this.loading) return; // Prevent multiple clicks
      this.validateEmail();
      this.validatePassword();

      if (this.error.email || this.error.password) return;

      this.loading = true; // Start loading
      try {
        const deviceInfo = await this.getDeviceInfo();
        const loginRes = await axios.post(
          `${API_BASE_URL}/api/user/login`,
          {
            email: this.email.trim(),
            password: this.password.trim(),
            rememberMe: this.rememberMe,
            ...deviceInfo,
          },
          { withCredentials: true }
        );

        // ✅ Keep loading until success === true
        if (loginRes.data && loginRes.data.success === true) {
          const userStore = useUserStore();
          const userRes = await axios.get(`${API_BASE_URL}/api/user/me`, {
            withCredentials: true,
          });
          userStore.setUser(userRes.data);

          const role = userRes.data.role;
          if (role === "ADMIN") this.$router.push("/admin-dashboard");
          else if (role === "TEACHER") this.$router.push("/teacher-dashboard");
          else if (role === "STUDENT") this.$router.push("/student-dashboard");
        } else {
          this.error.password = "Invalid email or password";
        }
      } catch (err) {
        this.error.password = "Invalid email or password";
        console.error("Login error:", err.response?.data || err.message);
      } finally {
        // ✅ Stop loading only after the request finishes
        this.loading = false;
      }
    },
  },
};
</script>
