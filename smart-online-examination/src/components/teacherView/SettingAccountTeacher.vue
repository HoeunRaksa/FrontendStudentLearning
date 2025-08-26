<template>
    <div class="w-full mt-6 h-full">
        <div class="bg-white rounded-md h-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4">
            <div class="grid grid-cols-8 items-center">
                <div class="grid min-w-40 col-span-1 grid-cols-1 gap-4 justify-items-center">
                    <img :src="profilePreview || API_BASE_PROFILE_URL + '/' + userStore.user.profile" alt="userprofile"
                        class="rounded-md w-24 h-24 object-fit cursor-pointer"
                        @click="openImage(profilePreview || API_BASE_PROFILE_URL + '/' + userStore.user.profile)">

                    <input v-on:change="onFileChange" type="file" class="hidden" ref="fileInput"
                        accept="image/png, image/jpg, image/jpng, image/wapg">
                    <div class="flex flex-col gap-2 items-start justify-start ms-2">
                        <button v-on:click="triggerFileInput"
                            class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md">
                            Upload New Photo
                        </button>
                    </div>
                </div>

                <div class="w-full flex col-span-4 col-start-3 flex-col justify-center gap-2">
                    <p class=" text-center uppercase text-sm w-100 focus:ring-blue-500 text-gray-600 font-medium rounded-md px-4 py-1">Department </p>
                    <div v-for="(dep, index) in Idepartment" :key="index"
                        class="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                        <span class="flex flex-nowrap">
                            {{ "\t" + dep.name + "\t" }}
                        </span>
                    </div>
                </div>
            </div>
            <form @submit.prevent="updateUserPhoneORProfile()" class="mt-10 w-full">
                <div class="w-full flex md:flex-row flex-col  justify-between gap-3 my-5">
                    <div class="w-full">
                        <label for="firstname" class="text-gray-500 font-sm block mb-1">First name</label>
                        <input type="text" :value="user?.firstName" class="px-3 py-1 w-full text-gray-600 font-sm font-normal
                                    placeholder:text-gray-400 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 border 
                                    border-gray-300 rounded-md focus:shadow-lg  shadow-blue-500">
                    </div>
                    <div class="w-full">
                        <label for="firstname" class="text-gray-500 font-sm block mb-1">Last name</label>
                        <input type="text" :value="user?.lastName" class="px-3 py-1 w-full text-gray-600 font-sm font-normal
                                    placeholder:text-gray-400 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 border 
                                    border-gray-300 rounded-md focus:shadow-lg
                                    shadow-blue-500">
                    </div>
                </div>
                <div class="w-full flex md:flex-row flex-col  justify-between gap-2 my-5">
                    <div class="w-full">
                        <label for="firstname" class="text-gray-500 font-sm block mb-1">Phone number</label>
                        <input type="text" v-model="user.phone" class="px-3 py-1 w-full text-gray-600 font-sm font-normal
                                    placeholder:text-gray-400 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 border 
                                    border-gray-300 rounded-md focus:shadow-lg  shadow-blue-500">
                    </div>
                    <div class="w-full">
                        <label for="firstname" class="text-gray-500 font-sm block mb-1">E-mail</label>
                        <input type="text" :value="user.email" class="px-3 py-1 w-full text-gray-600 font-sm font-normal
                                    placeholder:text-gray-400 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-500 border 
                                    border-gray-300 rounded-md focus:shadow-lg
                                    shadow-blue-500">
                    </div>
                </div>
                <div class="flex justify-start gap-3">
                    <button type="submit"
                        class="text-white bg-blue-500 px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]shadow-md">Save
                        change</button>
                    <button
                        class="text-gray-600 bg-gray-600 bg-opacity-20 font-medium px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { API_BASE_PROFILE_URL } from '@/config/useWebSocket';
import { API_BASE_URL } from '@/config/useWebSocket';
import { useUserStore } from '@/store/store';
import axios from 'axios';
export default {
    data() {
        return {
            API_BASE_PROFILE_URL,
            API_BASE_URL,
            phone: '',
            profilePicture: null,
            profilePreview: null, // <-- add this
            user: [],
            Idepartment: {

            },
        }
    },
    mounted() {
        this.loadStudentIfo();
    },
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        }
    },
    methods: {
        openImage(url) {
            window.open(url, '_blank');
        },
        async loadStudentIfo() {
            try {
                const response = await axios.get(
                    API_BASE_URL + "/api/teachers/" + this.userStore.user.id,
                    { withCredentials: true }
                );
                this.user = response.data.data;
                this.Idepartment = response.data.data.departments;

                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                this.profilePreview = e.target.result; // <-- use this for preview
            };
            this.profilePicture = file
            reader.readAsDataURL(file);
        },

        async updateUserPhoneORProfile() {
            try {
                const formData = new FormData();
                formData.append('phone', this.user.phone);
                if (this.profilePicture) {
                    formData.append('profilePicture', this.profilePicture);
                }

                for (const [key, value] of formData.entries()) {
                    console.log("Key:", key, "Value:", value);
                }
                const response = await axios.put(`${API_BASE_URL}/api/students/update-phone-profile`, formData, {
                    withCredentials: true,
                })
                if (response.data.success) {
                    const userStore = useUserStore();
                    const userRes = await axios.get(`${API_BASE_URL}/api/user/me`, {
                        withCredentials: true,
                    });
                    userStore.setUser(userRes.data);
                    this.loadStudentIfo()
                    alert("successful")
                }

                this.profilePreview = null;
            } catch (error) {
                console.error(error);
                alert('Update failed!');
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        }
    },
}
</script>