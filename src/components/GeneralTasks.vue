<template>
    <div class="flex flex-col items-center mt-2">
        <section class="w-full">
            <h3 class="text-3xl pt-10 ">Welcome {{userName}}</h3>
        </section>
        <section class=" flex flex-col items-centers w-3/5">
        <div class="flex items-center border-b border-cyan-500 w-4/5 py-2">
        <input class=" appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Write your task" aria-label="Full name">
        <button class="flex-shrink-0 bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        +
        </button>
        <button class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
        </button>
        </div>
        </section>
    </div>
</template>

<script setup>
    import NewTask from '../components/NewTask.vue';
    import TaskItem from '../components/TaskItem.vue';
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    let user = useUserStore();
    let userName = user.user.email;
</script>

<style>

</style>