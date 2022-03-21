<template>
    <section>
        <div>
        <h1>Sign In</h1>
        <input v-model="emailData" type="email" name="email" id="email" placeholder="email" required>
        <input v-model="passwordData" type="password" name="password" id="password" placeholder="password" required>
        <button @click="joinApp">Sign In</button>
      </div>
    <RouteBut :route="route" :buttonText="buttonText" />
    </section>
</template>

<script setup>
  import {ref} from 'vue'
  import RouteBut from "../components/RouteBut.vue";
  import router from '../router';
  import {useUserStore} from '../store/user.js'
  const user = useUserStore();
  let route = "/auth/sign-up";
  let buttonText = "Sign Up";
  let emailData = ref("");
  let passwordData = ref("");

  function joinApp(){
    console.log("prova", emailData.value, passwordData.value)
    try{
      user.signIn(emailData.value, passwordData.value)

    }catch(err){
      console.log("Sign in error", err)
    }
  }
</script>

<style>

</style>