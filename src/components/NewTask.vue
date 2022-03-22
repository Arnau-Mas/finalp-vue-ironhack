<template>
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <button @click="addTask">+</button>
</template>

<script setup>
    import {useTaskStore} from "../store/task.js"
    const tasks = useTaskStore();
    //posar variables de titol i nota
    //ficar-les dins d'un objecte i fer push a tasks dins de addTask
    function addTask(){

    }
</script>

<style>
</style>