<template>
   <div  class="bg-cyan-100 border-l-8 flex items-center rounded-md border-cyan-500 py-2 mt-2 px-2 w-full max-w-4xl">
        <input type="text" class="focus:ring-0 appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:border-none" :value="taskTextProp" aria-label="Full name">
        <p class="text-cyan-500">|</p>
        <input type="time" :value="taskTimeProp" class=" text-center focus:ring-0 appearance-none bg-transparent border-none w-32 py-1  leading-tight">
        <button class="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-cyan-800 text-sm rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        </button>
        <button class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 ml-2 mr-2  rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script setup>
        defineProps({
        taskTextProp: String,
        taskTimeProp: String
    })
</script>

<style>
</style>