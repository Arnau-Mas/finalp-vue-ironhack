<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-20">
        <section v-if="allTasks.length && noError" class="flex flex-col items-center w-full">
            <TaskItem v-for="task in allTasks" :key="task.id" :taskTextProp="task.title" :taskTimeProp="task.time" :taskIdProp="task.id" />
        </section>
        <section v-else class="flex flex-col items-center w-full">
            <p v-if="!noError">There has been some error. Pleas, reload or try it later.</p>
            <TaskItem :taskTextProp="'YOU DON\'T HAVE TASKS YET. WRITE IT!'" v-else />
        </section>
        <section class="w-full text-center">
            <h3 class="pt-10 text-sm pb-5">{{userName}}</h3>
        </section>
    </div>
</template>

<script setup>
    //vue properties
    import { onBeforeMount, ref } from 'vue';
    import { onMounted } from "vue";

    //components
    import TaskItem from '../components/TaskItem.vue';
    //stores
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from '../store/task.js';
    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
        let allTasks =ref("");
    if(tasks.tasksArchieved !=null){
        allTasks = tasks.tasksArchieved;
    }
    let userName = user.user.email;
    let userId = user.user.id;
    let noError = ref(true)
    
    //OnMounted + functions onmounted
    onMounted(()=>{
        getTasks();
    })

    async function getTasks(){
        if(tasks.tasksArchieved == null){
        try{
            let res = await tasks.fetchTasks();
            allTasks.value = tasks.tasksArchieved;
        }catch(err){
            console.log("error de GeneralTasks getTasks", err);
        }
    }
    }

</script>

<style>

</style>