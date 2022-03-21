<template>
    <section>
        <div>
        <h1>Sign Up</h1>
        <label for="email">Email:</label>
        <input v-model="emailData" type="email" name="email" id="email" required>
        <label for="password">Password:</label>
        <input v-model="password1Data" type="password" name="password" id="password" required>
        <label for="confirmPass">Confirm Password:</label>
        <input v-model="password2Data" v-on:blur="checkSecondPass" type="password" name="confirmPass" id="confirmPass" required>
        <p v-if="askSameValue">*Pleas, introduce the same password</p>
        <button @click="submitData">Register</button>
      </div>
      <RouteBut :route="route" :buttonText="buttonText" />
    <!--  <p v-if="formCompleted">Pleas, go to your <a href="/">mail</a> and click the link to activate your account.</p> -->
    </section>
</template>

<script setup>
  import RouteBut from "../components/RouteBut.vue"
  import {ref} from "vue"
  import {useUserStore} from '../store/user.js'
  const user = useUserStore();

  let route = "/auth";
  let buttonText ="Sign In";
  let emailData = ref("");
  let password1Data = ref("");
  let password2Data = ref("");
  let askSameValue = ref(false);
  /* let formCompleted = ref(false); */

  function checkSecondPass(){
    if(password1Data.value && password2Data.value){
      if(password1Data.value != password2Data.value){
        askSameValue.value = true;
      }else{
        askSameValue.value = false;
      }
    }
  }
   async function submitData(){
    checkAllData();
    try{
      await user.signUp(emailData.value, password1Data.value)
    }catch(err){
      console.log(err)
    }
    
  }
  function checkAllData(){
    if(emailData.value && password1Data.value && password2Data.value){
      if(password2Data.value != password1Data.value){
        askSameValue.value = true;
      }
    }else{
      alert("Pleas, introduce all the data")
    }
  };
  function fetchData(){

  };


//Fer una funcio computed perque fagi un pop up quan fagi matching de les 2 contrassenyes en cas de que no siguin iguals? O espero a que li doni al botó de submit? (pq tampoc sé si això ja ho implementaria un formulari importat d'una llibreria externa)
</script>

<style>

</style>