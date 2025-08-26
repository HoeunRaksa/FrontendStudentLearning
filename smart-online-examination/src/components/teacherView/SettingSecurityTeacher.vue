<template>
    <div class="w-full mt-6 h-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4">
        <header class="my-2">
            <h1 class="text-gray-600 text-lg font-normal">Change Password</h1>
        </header>
        <form @submit.prevent="handleSubmited()" action="">
            <div class="w-full flex md:flex-row flex-col  justify-between gap-3 my-5">
                <div class="md:w-1/2 w-full">
                    <PasswordInput v-model="oldPassword" label="Current Password" />
                </div>
            </div>
            <div class="w-full flex md:flex-row flex-col justify-between gap-3 my-5">
                <div class="w-full">
                    <PasswordInput v-model="newPassword" label="New Password" />
                </div>
                <div class="w-full">
                    <PasswordInput v-model="comfirmPassword" label="Confirm New Password" />
                </div>
            </div>
            <div class="my-5">
                <p class="text-gray-600 font-medium text-sm">Password Requirements</p>
                <ul class="list-disc pl-8 mt-2 gap-2">
                    <li class="text-gray-500 font-normal text-sm py-2">Minimum 8 characters long - the more, the better
                    </li>
                    <li class="text-gray-500 font-normal text-sm py-2">At least one lowercase character</li>
                    <li class="text-gray-500 font-normal text-sm py-2">At least one number, symbol, or whitespace
                        character</li>
                </ul>
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
</template>

<script>
import PasswordInput from './PasswordInputTeacher.vue';
import TextInput from './TextInputTeacher.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config/useWebSocket';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/store/store';
const toast = useToast();
export default {
    components: {
        PasswordInput,
        TextInput
    },
    data() {
        return {
            email: "",
            oldPassword: "",
            newPassword: "",
            message: ""
        };
    },
    setup(){
    const userStore = useUserStore();
    return{
        userStore
    };
    },
    methods: {
        async handleSubmited() {
            try {
                const response = await axios.put(`${API_BASE_URL}/api/user/update-password`, null,
                    {
                        params: {
                            email: this.userStore.user.email,
                            oldPassword: this.oldPassword,
                            newPassword: this.newPassword
                        },
                        withCredentials: true
                    })
                      toast.success(response.data.success)
            } catch (error) {
                toast.error(error)
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.user.image = e.target.result;
            }

            reader.readAsDataURL(file);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        }
    }
}
</script>