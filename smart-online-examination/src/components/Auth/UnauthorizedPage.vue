<template>
    <div class="w-screen h-screen flex items-center justify-center bg-gray-200">
        <div class="bg-white px-56 py-36 rounded-lg shadow-md text-center">
            <SolidSecurity class=" w-36 h-36 mx-auto mb-4text-blue-700" />
            <h1 class="text-4xl text-blue-500 font-bold mb-4">401 - unauthorized </h1>
            <p class="text-black text-lg font-semibold mb-1">Your authorization is failed</p>
            <p class="text-black text-lg font-semibold">Please try to refreshing the page and fill the correct login details.</p>
            <router-link
                to="/"
                class="mt-4 inline-block px-6 py-2 hover:underline text-blue-800 rounded-lg"
            >Go to Login</router-link>
        </div>

    </div>
</template>
<script>
import SolidSecurity from '../icons/SolidSecurity.vue';
export default {
    name: 'UnauthorizedPage',
    components: {
        SolidSecurity
    }
};
</script>