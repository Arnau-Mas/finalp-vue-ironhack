<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-20 pb-16">
        <section v-if="allTasks.length && noError" class="flex flex-col items-center w-full">
            <TaskItem v-for="task in allTasks" :key="task.id" :taskTextProp="task.title" :taskTimeProp="task.time" :taskIdProp="task.id" />
        </section>
        <section v-else class="flex flex-col items-center w-full">
            <p v-if="!noError">There has been some error. Pleas, reload or try it later.</p>
            <AlertMessage v-else :messageClass="'writeYourTaskGreen'" :alertMessage='"There are no tasks here."'></AlertMessage>
        </section>
    </div>
</template>

<script setup>
        //vue properties
    import {  ref } from 'vue';
    import { onMounted } from "vue";

    //components
    import TaskItem from '../components/TaskItem.vue';
    import AlertMessage from "./AlertMessage.vue"

    //stores
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from '../store/task.js';
    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
        let allTasks =ref("");
    if(tasks.tasksCompleted !=null){
        allTasks = tasks.tasksCompleted;
    }
    let userName = user.user.email;
    let noError = ref(true)
    
    //OnMounted + functions onmounted
    onMounted(()=>{
        getTasks();
    })

    async function getTasks(){
        if(tasks.tasksCompleted == null){
        try{
            let res = await tasks.fetchTasks();
            allTasks.value = tasks.tasksCompleted;
        }catch(err){
           noError.value = false;
        }
    }
    }

</script>

<style>

</style>