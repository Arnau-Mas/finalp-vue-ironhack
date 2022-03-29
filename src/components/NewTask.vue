<template>
    <section class="flex flex-col items-center w-full mb-6">
        <div class="newTaskClass">
            <input @focus="changePlaceholder" @focusout="changePlaceholder" v-model="taskText" type="text" maxlength="" class="focus:ring-0 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 border-0 px-2 leading-tight focus:border-none" :placeholder="placeholderText" aria-label="Full name">
            <p class="text-sky-500">|</p>
            <input v-model="taskDate" type="time" class="text-center focus:ring-0 appearance-none bg-transparent border-none text-gray-700 w-32 py-1  leading-tight">
            <button v-tooltip="'Add Task'"  @click="addTask"  class="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white px-2 rounded" type="button">+</button>
            <button @click="cleanInput" class="flex-shrink-0 border-transparent border-4 text-sky-500 hover:text-sky-800 text-sm py-1 ml-2 rounded" type="button">
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
    let placeholderText = ref("✏️ Write your task");
    //Functions
    function changePlaceholder(){
        if(placeholderText.value){
            placeholderText.value ="";
        }else{
            placeholderText.value = "✏️ Write your task"
        }
    }
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