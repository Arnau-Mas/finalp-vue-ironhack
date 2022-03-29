<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-20">
        <NewTask/>
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
    import NewTask from '../components/NewTask.vue';
    import TaskItem from '../components/TaskItem.vue';
    //stores
    import {useUserStore} from '../store/user.js';
    import {useTaskStore} from '../store/task.js';
    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
        let allTasks =ref("");
    if(tasks.tasks !=null){
        allTasks = tasks.tasks;
    }
    let userName = user.user.email;
    let noError = ref(true)
    
    //OnMounted + functions onmounted
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
            console.log("error de GeneralTasks getTasks", err);
        }
    }
    }

</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
    
}
</style>