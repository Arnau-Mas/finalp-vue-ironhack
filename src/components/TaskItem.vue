<template>
   <div :class="classesString">
        <p class="focus:ring-0 appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:border-none overflow-hidden" aria-label="Full name">{{taskTextProp}}</p>
        <p class="text-cyan-500">|</p>
        <p type="time" class="flex w-32 text-center focus:ring-0 appearance-none mobile:text-sm bg-transparent border-none px-0 py-1 leading-tight">{{taskTimeProp}}</p>
        <button @click="isArchieved(taskIdProp)" v-tooltip="'Archive'" class="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-cyan-800 text-sm rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
            </svg>
        </button>
        <button @click="isCompleted(taskIdProp)" v-tooltip="'Completed'" class="flex-shrink-0 border-transparent border-4 text-cyan-500 hover:text-cyan-800 text-sm py-1 ml-2 mr-2  rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import {ref} from 'vue'
    import {useTaskStore} from '../store/task';
    let tasks = useTaskStore();
    let classesString = ref("taskClass provantHover")
    defineProps({
        taskTextProp: String,
        taskTimeProp: String,
        taskIdProp: Number
    })

    async function isCompleted(idTask){
        classesString.value="taskClassCompleted";
        try{
            let res = await tasks.updateTask(idTask, "isCompleted");
            tasks.tasksCompleted.push(...res);
            let indexTask = tasks.tasks.findIndex(task => task.id==idTask);
                setTimeout(() => {
                tasks.tasks.splice(indexTask, 1)
                }, 50);
            
        }catch(err){
            classesString.value="taskClassError"
            classesString.value="taskClass provantHover" 
        }
    }
        async function isArchieved(idTask){
        try{
            let res = await tasks.updateTask(idTask, "isArchieved");
            tasks.tasksArchieved.push(...res);
            let indexTask = tasks.tasks.findIndex(task => task.id==idTask);
            classesString.value+=" animate-bounce delay-100"
            setTimeout(() => {
               tasks.tasks.splice(indexTask, 1)
            }, 400);

        }catch(err){
            classesString.value="taskClassError"
            classesString.value="taskClass provantHover" 
        }
    }
</script>

<style>

.taskClass:hover *{
    cursor: pointer;
}

.provantHover:hover{
     cursor: pointer;
}

</style>