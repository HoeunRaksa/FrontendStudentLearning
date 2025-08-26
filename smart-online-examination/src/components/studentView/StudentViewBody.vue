<template>
    <div class="xl:h-44 h-auto flex flex-col md:flex-row mt-12">
        <div class="text-session-course-hour md:w-2/3 w-full pe-4">
            <p class="text-lg font-normal text-gray-600">Welcome back, <span
                    class="text-xl font-semibold text-gray-700">{{ userStore.user?.lastname }}!</span></p>
            <p class="pt-3 text-sm font-normal text-gray-500">Your progress this week is Awesome. let's keep it up </p>
            <p class="pt-2 text-sm font-normal  text-gray-500">and get a lot of points reward!</p>
            <div
                class="time-spent-and-result-session flex flex-col md:flex-row gap-5 justify-between items-stretch mt-4 xs:mb-8 sm:mb-8">
                <div class="flex">
                    <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
                        <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2 " />
                    </div>
                    <p class="procent-and-text flex flex-col">
                        <span class="text-sm font-medium text-gray-600">Time spent today</span>
                        <span class="text-2xl font-semibold text-[#8C09F4] mt-auto">{{ userStore.user?.timeSpentToday
                            }}</span>
                    </p>
                </div>

                <div class="flex">
                    <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
                        <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2 " />
                    </div>
                    <p class="procent-and-text flex flex-col">
                        <span class="text-sm font-medium text-gray-600">Test Results</span>
                        <span class="text-2xl font-semibold text-[#8C09F4] mt-auto">85 %</span>
                    </p>
                </div>

                <div class="flex">
                    <div class="bg-[#4895ef] bg-opacity-20 rounded-lg me-3">
                        <LaptopIcon class="text-[#8C09F4] h-16 w-16 p-2 " />
                    </div>
                    <p class="procent-and-text flex flex-col">
                        <span class="text-sm font-medium text-gray-600">Exam completed</span>
                        <span class="text-2xl font-semibold text-[#8C09F4] mt-auto">12</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="text-session-box w-full h-44 md:w-1/3 border-gray-400 p-4 flex
             md:border-l-2 md:border-t-0 border-t-2 sm:border-t">
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
            <TimeSpentChart :weeklyHours="[12, 2, 4, 9, 3, 4]" />
        </div>
    </div>
    <div class="w-full mt-8 flex flex-col xl:flex-row gap-4">
        <div
            class="graph-session min-h-[300px] w-full  xl:w-3/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] sm:me-1 xl:me-2 p-4">
            <p class="text-lg font-normal text-gray-600">Your progress this week</p>
            <GrapView />
        </div>
        <div class="upcoming-exam w-full md:w-5/5 xl:w-2/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] xl:ms-2 p-4 ">
            <header class="h-10 mb-4 flex items-center">
                <p class="text-lg font-normal text-gray-600 ">Upcoming exam</p>
            </header>
            <table class="w-full divide-y divide-gray-200 sm:text-center md:text-center">
                <thead class="border-y-[1px] border-gray-500 border-opacity-30">
                    <tr>
                        <th class="text-gray-500 text-lg font-normal py-2">Subject & Teacher</th>
                        <th class="text-gray-500 text-lg font-normal py-2">Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exam, index) in exams" :key="index" class="border-b border-gray-200">
                        <td class="py-2 px-4 whitespace-nowrap text-gray-700">
                            <div class="flex items-center space-x-3">
                                <img :src="API_BASE_PROFILE_URL + '/' + exam.teacherImage" alt="Teacher photo"
                                    class="h-10 w-10 rounded-full object-cover" />
                                <div class="flex flex-col">
                                    <span class="font-medium">{{ exam.teacher }}</span>
                                    <span class="text-sm text-gray-500">{{ exam.subject }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-2 px-4 whitespace-nowrap text-gray-500">
                            {{ formatDatetime(exam.datetime) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Teacher Messages or Announcements Exam completed section -->
    <div class="w-full flex flex-col xl:flex-row gap-4 md:mt-4 sm:mt-4">
        <div class="upcoming-exam w-full xl:w-3/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] xl:me-2 sm:me-1 p-4 ">
            <header class="h-10 mb-4 flex items-center">
                <p class="text-lg font-normal text-gray-600 ">Teacher Messages or Announcements</p>
            </header>
            <table class="w-full divide-y divide-gray-200">
                <thead class="border-y-[1px] border-gray-500 border-opacity-30">
                    <tr>
                        <th class="text-gray-500 text-lg font-normal py-2">Message Details</th>
                        <th class="text-gray-500 text-lg font-normal py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(teacher_message, index) in teacher_messages" :key="index"
                        class="border-b border-gray-200">
                        <td class="py-3 px-4">
                            <div class="flex items-start space-x-3">
                                <img :src="API_BASE_PROFILE_URL + '/' + teacher_message.teacherImage"
                                    alt="Teacher photo" class="h-10 w-10 rounded-full object-cover mt-1" />
                                <div class="flex flex-col">
                                    <div class="flex items-center gap-2">
                                        <span class="font-medium text-gray-800">{{ teacher_message.teacher }}</span>
                                        <span class="text-sm text-gray-500">| {{ teacher_message.subject }}</span>
                                    </div>
                                    <p class="text-sm text-gray-700 mt-1">{{ teacher_message.message }}</p>
                                    <span class="text-xs text-gray-400 mt-1">{{ teacher_message.datetime }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-center px-4 whitespace-nowrap">
                            <span :class="[
                                'inline-block rounded-full px-3 py-1 text-sm font-medium',
                                teacher_message.status.toLowerCase() === 'unread'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                            ]">
                                {{ teacher_message.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="min-h-[300px] w-full xl:w-2/5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] xl:ms-2 p-4">
            <header class="h-10 mb-4 flex items-center">
                <p class="text-lg font-normal text-gray-600 ">Completed exams</p>
            </header>
            <div class="space-y-4">
                <div v-for="(exam, index) in completed_exams" :key="index"
                    class="flex justify-between items-center p-4 rounded-md hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-all duration-300 bg-white border border-gray-200">
                    <!-- Left: Subject & Score -->
                    <div class="flex items-center space-x-3">
                        <SmallCycleChat />
                        <div>
                            <h4 class="text-md font-semibold text-gray-800">{{ exam.subject }}</h4>
                            <p class="text-sm text-gray-500">Score: {{ exam.score }}</p>
                        </div>
                    </div>

                    <!-- Center: Date -->
                    <div class="text-sm text-gray-500 text-center w-32">
                        {{ exam.datetime }}
                    </div>

                    <!-- Right: Status -->
                    <div>
                        <span :class="[
                            'text-sm font-medium px-3 py-1 rounded-full',
                            exam.status === 'Passed'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-600'
                        ]">
                            {{ exam.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LaptopIcon from '../icons/LaptopIcon.vue';
import GrapView from './GrapView.vue';
import TimeSpentChart from './TimeSpentChart.vue';
import SmallCycleChat from './SmallCycleChat.vue';
import { useUserStore } from '@/store/store';
import { API_BASE_URL } from '@/config/useWebSocket';
import axios, { Axios } from 'axios';
import { useToast } from 'vue-toastification';
import { errorMessages } from 'vue/compiler-sfc';
import { API_BASE_PROFILE_URL } from '@/config/useWebSocket';
const toast = useToast();
export default {
    components: {
        LaptopIcon,
        GrapView,
        TimeSpentChart,
        SmallCycleChat
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore,
        };
    },
    data() {
        return {
            API_BASE_URL,
            API_BASE_PROFILE_URL,
            exams: [

            ]
        }
    },
    methods: {
        async getExamComingSoon() {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/exams/coming`, {
                    withCredentials: true,
                })
                this.exams = response.data;
                console.table(response);

            } catch (err) {
                toast.error("False fetch exam from coming status!", errorMessages)
            }
        },
        formatDatetime(datetime) {
            if (!datetime) return '';
            const date = new Date(datetime);
            const options = {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', hour12: false
            };
            return date.toLocaleString(undefined, options);
        }
    },
    mounted() {
        this.getExamComingSoon();
    },
    computed: {
        weeklyTime() {
            const raw = this.userStore?.user?.timeSpentThisWeek || "0h 0m";
            const [h, m] = raw.split(" ");
            return {
                hours: h.replace("h", ""),
                minutes: m.replace("m", ""),
            };
        },
    }
}
</script>