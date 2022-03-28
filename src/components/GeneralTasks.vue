<template>
    <div class="flex flex-col items-center mt-2">
        <section class="w-full text-center">
            <h3 class="pt-10 text-sm pb-5">{{userName}}</h3>
        </section>
        <section class="flex flex-col items-center w-full mb-6">
            <div class="border-b flex items-center border-cyan-500 py-2 px-2 w-full max-w-4xl">
                <input autofocus v-model="taskText" type="text" class="focus:ring-0 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:border-none" placeholder="Write your task" aria-label="Full name">
                <p class="text-cyan-500">|</p>
                <input v-model="taskDate" type="time" class=" text-center focus:ring-0 appearance-none bg-transparent border-none text-gray-700 w-32 py-1  leading-tight">
                <button  @click="addTask"  class="flex-shrink-0 bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white px-2 rounded" type="button">+</button>
                <button @click="cleanInput" class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 px-2 rounded" type="button">
                Cancel
                </button>
            </div>
        </section>

        <!-- SECTION TASKS -->
        <section class="flex flex-col items-center w-full">
            <TaskItem :propText="'Provant les props'" :taskTime="'12:00'" />
        </section>

        <footer class="flex flex-col items-center w-full">
        <!-- NO BORRAR -->
            <div  class="bg-cyan-100 border-l-8 flex items-center rounded-md border-cyan-500 py-2 mt-2 px-2 w-full max-w-4xl">
                <p type="text" class="focus:ring-0 appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:border-none" value="Exemple task en un input text (NO BORRAR)" aria-label="Full name">Exemple task en un P</p>
                <p class="text-cyan-500">|</p>
                <p type="time" class=" text-center focus:ring-0 appearance-none bg-transparent border-none w-32 py-1  leading-tight">00:00</p>
                <button class="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-cyan-800 text-sm rounded" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                </button>
                <button class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 px-2 rounded" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div  class="bg-cyan-100 border-l-8 flex items-center rounded-md border-cyan-500 py-2 mt-2 px-2 w-full max-w-4xl">
                <input type="text" class="focus:ring-0 appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:border-none" value="Exemple task en un input text (NO BORRAR)" aria-label="Full name">
                <p class="text-cyan-500">|</p>
                <input type="time" value="11:00" class=" text-center focus:ring-0 appearance-none bg-transparent border-none w-32 py-1  leading-tight">
                <button class="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-cyan-800 text-sm rounded" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                </button>
                <button class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 px-2 rounded" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </footer>
    </div>
</template>

<script setup>
    //vue properties
    import { ref } from 'vue';
    import { onMounted } from 'vue-demi';
    import { useRouter } from 'vue-router';
    //components
    import NewTask from '../components/NewTask.vue';
    import TaskItem from '../components/TaskItem.vue';
    //stores
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from '../store/task.js';
    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
    let allTasks = tasks.tasks;
    let userName = user.user.email;
    let userId = user.user.id;
    let taskText = ref("");
    let taskDate = ref("00:00");
    let taskCompleted = ref(false)
    let taskArchived = ref(false)

    function addTask(){
        try{
            tasks.insertTask(userId, taskTest.value, taskDate.value, taskCompleted.value, taskArchived.value);
        }catch(err){
            console.log(err);
        }
    }

    function cleanInput(){
        taskText.value = "";
        taskDate.value = "00:00"
    }
</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
    
}
</style>