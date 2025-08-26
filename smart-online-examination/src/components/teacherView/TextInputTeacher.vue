<template>
    <div class="w-full">
        <label for="" class="text-gray-500 text-sm block mb-1">
            {{ label }}
        </label>
        <div class="relative">
            <input
            type="text"
            :name="name"
            :placeholder="placeholer"
            :v-model="inputModel"
            :class="[
                    'px-3 py-2 w-full border rounded-md text-gray-700 text-sm',
                    'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    error ? 'border-red-500' : 'border-gray-300'
                    ]"
            >

            <p v-if="error" class="text-red-500 text-sm mt-1"></p>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        label:{
            type: String,
            default: ""
        },
        placeholer: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ""
        },
        inputModel: String,
    },
    computed:{
        inputValue:{
            get(){
                return this.inputModel;
            },
            set(val) {
                    this.$emit("update:inputModel", val);
            }
        }
    }
}
</script>