<template>
    <div class="w-full mt-6 h-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4">
        <header class="my-2">
            <h1 class="text-gray-600 text-lg font-normal">Change Password</h1>
        </header>
       <form action="">
            <div class="w-full flex md:flex-row flex-col  justify-between gap-3 my-5">
                <div class="md:w-1/2 w-full">
                    <PasswordInput
                    label="Current Password"
                    />
                </div>
            </div>
            <div class="w-full flex md:flex-row flex-col justify-between gap-3 my-5">
                <div class="w-full"> 
                    <PasswordInput 
                    label="New Password"
                    />
                </div>
                <div class="w-full">
                    <PasswordInput
                    label="Confirm New Password"
                    />
                </div>
            </div>
            <div class="my-5">
                <p class="text-gray-600 font-medium text-sm">Password Requirements</p>
                <ul class="list-disc pl-8 mt-2 gap-2">
                   <li class="text-gray-500 font-normal text-sm py-2">Minimum 8 characters long - the more, the better</li> 
                   <li class="text-gray-500 font-normal text-sm py-2">At least one lowercase character</li>
                   <li class="text-gray-500 font-normal text-sm py-2">At least one number, symbol, or whitespace character</li>
                </ul>
            </div>
            <div class="flex justify-start gap-3">
                <button class="text-white bg-blue-500 px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]shadow-md">Save change</button>
                <button class="text-gray-600 bg-gray-600 bg-opacity-20 font-medium px-4 py-2 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.1)]">Cancel</button>
            </div>
       </form>
    </div>
</template>

<script>
import { Text } from 'vue';
import PasswordInput from '../studentView/PasswordInput.vue';
import TextInput from '../studentView/TextInput.vue';
export default{
    components:{
        PasswordInput,
        TextInput
    },
    data(){
        return{
            user:{
                firstname: "Sieng",
                lastname: "Vathana",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                email: "Siengvathana@gmail.com",
                phoneNumber: "018239543",
                batch: "8",
                year: "2"
            }
        }
    },
    methods:{
        onFileChange(e){
            const file = e.target.files[0];
            if(!file) return;

            const reader = new FileReader();
            reader.onload = (e) =>{
                this.user.image = e.target.result;
            }

            reader.readAsDataURL(file);

        },
        triggerFileInput(){
            this.$refs.fileInput.click();
        }
    }
}
</script>