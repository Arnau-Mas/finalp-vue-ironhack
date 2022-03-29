<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-20">
        <NewTask/>
        <section v-if="allTasks.length && noError" class="flex flex-col items-center w-full">
            <TaskItem class="provantHover" v-for="task in allTasks" :key="task.id" :taskTextProp="task.title" :taskTimeProp="task.time" :taskIdProp="task.id" />
        </section>
        <section v-else class="flex flex-col items-center w-full">
            <p v-if="!noError">There has been some error. Pleas, reload or try it later.</p>
            <TaskItem :taskTextProp="'YOU DON\'T HAVE TASKS YET. WRITE IT!'" v-else />
        </section>
        <section class="w-full text-center">
            <h3 class="pt-10 text-sm pb-5">{{userName}}</h3>
        </section>
     
        <!-- NO BORRAR -->
           <!-- <footer class="flex flex-col items-center w-full">
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
        </footer> -->
    </div>
</template>

<script setup>
    //vue properties
    import { onBeforeMount, ref } from 'vue';
    import { onMounted } from "vue";
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
    let allTasks = ref("");
    let userName = user.user.email;
    let userId = user.user.id;
    let taskText = ref("");
    let taskDate = ref("00:00");
    let taskCompleted = ref(false);
    let taskArchived = ref(false);
    let noError = ref(true)
    
    //OnMounted + functions onmounted
    onMounted(()=>{
        getTasks();
    })

    async function getTasks(){
        try{ //preguntar alex si esta logica es correcta
            let res = await tasks.fetchTasks();
            allTasks.value = res;
            /* allTasks.value = tasks.tasks; */
        }catch(err){
            console.log("error de GeneralTasks getTasks", err);
        }
    }

</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
    
}
</style>