<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-10 sm:mt-20 pb-16">
        <NewTask/>
        <section v-if="allTasks.length && noError" class="flex flex-col items-center w-full">
            <TaskItem v-for="task in allTasks" :key="task.id" :taskTextProp="task.title" :taskTimeProp="task.time" :taskIdProp="task.id" />
        </section>
        <section v-else class="flex flex-col items-center w-full mt-2">
            <p v-if="!noError">There has been some error. Pleas, reload or try it later.</p>
            <AlertMessage v-else :messageClass="'writeYourTask'" :alertMessage='"There are no tasks. Write up here!"'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
</svg></AlertMessage>
        </section>
    </div>
</template>

<script setup>
    //vue properties
    import { onBeforeMount, ref } from 'vue';
    import { onMounted } from "vue";
    //components
    import NewTask from '../components/NewTask.vue';
    import TaskItem from '../components/TaskItem.vue';
    //stores
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from '../store/task.js';
    import AlertMessage from './AlertMessage.vue';
    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
    let allTasks =ref("");
    let userName = user.user.email;
    let noError = ref(true)
    
    //OnMounted + functions onmounted
    if(tasks.tasks !=null){
        allTasks = tasks.tasks;
    }
    onMounted(()=>{
        getTasks();
    })

    async function getTasks(){
        if(tasks.tasks == null){
        try{ //preguntar alex si esta logica es correcta
            let res = await tasks.fetchTasks();
            allTasks.value = res;
            /* allTasks.value = tasks.tasks; */
        }catch(err){
            noError.value = false;
        }
     }
    }
</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
    
}
</style>