<template>
    <section class="flex flex-col items-center w-full mb-6">
        <div class="border-b flex items-center border-cyan-500 py-2 px-2 w-full max-w-4xl">
            <input autofocus v-model="taskText" type="text" class="focus:ring-0 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:border-none" placeholder="Write your task" aria-label="Full name">
            <p class="text-cyan-500">|</p>
            <input v-model="taskDate" type="time" class=" text-center focus:ring-0 appearance-none bg-transparent border-none text-gray-700 w-32 py-1  leading-tight">
            <button v-tooltip="'Add Task'"  @click="addTask"  class="flex-shrink-0 bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white px-2 rounded" type="button">+</button>
            <button @click="cleanInput" class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 ml-2 rounded" type="button">
            Cancel
            </button>
        </div>
    </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from "../store/task.js"
    import { ref } from 'vue';
    
    //components
    import TaskItem from '../components/TaskItem.vue';

    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
    let userId = user.user.id;
    let taskText = ref("");
    let taskDate = ref("00:00");
    let taskCompleted = ref(false);
    let taskArchived = ref(false);
    //Functions
    function addTask(){
        try{
            tasks.insertTask(userId, taskText.value, taskDate.value, taskCompleted.value, taskArchived.value);
            cleanInput();
        }catch(err){
            console.log("error a addTask() de generalTasks", err);
        }
    }

    function cleanInput(){
        taskText.value = "";
        taskDate.value = "00:00"
    }
</script>

<style>
</style>