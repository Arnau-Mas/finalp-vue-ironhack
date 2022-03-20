<template>
    <router-view></router-view>
</template>

<script setup>
  import SignIn from '../components/SignIn.vue';
  import SignUp from '../components/SignUp.vue';
  import { ref } from 'vue';

  let route = ref("/auth/sign-up");
  let buttonText = "Sign Up";
/* 
onMounted(async () => {
    console.log("onMounted funct")
}) */
</script>

<style>
  .auth-section{
    display: flex;
    
  }
  
  form{
    width:50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: aquamarine;
    padding: 1rem;
  }
</style>