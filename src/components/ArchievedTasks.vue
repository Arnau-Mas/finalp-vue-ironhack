<template>
    <div class=" ml-2 mr-2 flex flex-col items-center mt-10 sm:mt-20 pb-16">
        <section v-if="allTasks.length && noError" class="flex flex-col items-center w-full">
            <ArchivedTaskItem v-for="task in allTasks" :key="task.id" :taskTextProp="task.title" :taskTimeProp="task.time" :taskIdProp="task.id" />
        </section>
        <section v-else class="flex flex-col items-center w-full">
            <p v-if="!noError">There has been some error. Pleas, reload or try it later.</p>
            <AlertMessage v-else :messageClass="'writeYourTask'" :alertMessage='"There are no tasks here."'></AlertMessage>
        </section>
    </div>
</template>

<script setup>
    //vue properties
    import { onBeforeMount, ref } from 'vue';
    import { onMounted } from "vue";

    //components
    import ArchivedTaskItem from '../components/ArchivedTaskItem.vue';
    import AlertMessage from "./AlertMessage.vue"
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
                noError.value = false;
            }
        }
    }

</script>

<style>

</style>