<template>
    <section>
        <div>
        <h1>Sign Up</h1>
        <label for="email">Email:</label>
        <input v-model="emailData" type="email" name="email" id="email" required>
        <label for="password">Password:</label>
        <input v-model="password1Data" type="password" name="password" id="password" required>
        <label for="confirmPass">Confirm Password:</label>
        <input v-model="password2Data" type="password" name="confirmPass" id="confirmPass" required>
        <p v-if="askSameValue">*Pleas, introduce the same password</p> <!-- puc ficar logica computed -->
        <button @click="submitData">Register</button>
      </div>
      <RouteBut :route="route" :buttonText="buttonText" />
     <p v-if="statusMessage">{{noticeMessage}}</p>
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
  let statusMessage = ref(false);
  let noticeMessage = ref("Check your mail and click the link to activate your account.")

 /*  function checkSecondPass(){
    if(password1Data.value){
      if(password1Data.value && password2Data.value){
        if(password1Data.value != password2Data.value){
          askSameValue.value = true;
        }else{
          askSameValue.value = false;
        }
      }
    } 
  } */
   async function submitData(){
      let response = checkAllData();
      if(response.value=== 1){
        console.log("ha passat lo de response ===1")
        try{
          await user.signUp(emailData.value, password1Data.value)
          emailData.value = "";
          password1Data.value = "";
          password2Data.value = "";
        }catch(err){
          console.log("ha entrat en el catch de submitData")
          noticeMessage = "There has been some error. Pleas, try it later.";
          statusMessage.value = true;
        }
      }
  }

  function checkAllData(){ 
    let res = ref(1);
    statusMessage.value = false;
    if(emailData.value && password1Data.value && password2Data.value){
      console.log("entrem al if de totes les dades")
      if(password2Data.value != password1Data.value){
        askSameValue.value = true;
        res = -1;
      }else{
        askSameValue.value = false;
      }
    }else{
      askSameValue.value = false;
      res = -1;
      noticeMessage.value = "Pleas, introduce all the data.";
      statusMessage.value = true;  
    }
    return res;
  };
</script>

<style>

</style>