<template>
    <section>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> <!-- bg-gray-200 -->
        <div class="bg-white rounded-lg p-10 max-w-md w-full space-y-8"> <!-- shadow-md  -->
          <div>
            <img class="mx-auto h-12 w-auto" src="../assets/todo-logo.png" alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up!</h2>
            <p class="mt-2 text-center text-sm text-gray-600">The best<span class="font-medium text-cyan-600"> To-do app</span> in the world!
            </p>
          </div>
          <form @submit.prevent="submitData" class="mt-8 space-y-6" novalidate="true">

            <input type="hidden" name="remember" value="true" />

            <div class="rounded-md shadow-sm">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                      Email
                    </label>
                    <input v-model="emailData" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="email" name="email" id="email" required placeholder="someone@example.com" maxlength="50">
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input v-model="password1Data" minlength="6" maxlength="20" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="password" name="password" id="password" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎" required>
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPass">
                      Confirm password
                    </label>
                    <input maxlength="20" v-model="password2Data" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="password" name="confirmPass" id="confirmPass" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎" minlength="6" required>
                  </div>
            </div>

            <div>
              <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-cyan-500">
                Sign up
              </button>
            </div>
            <AlertMessage :messageClass="msgClass" :alertMessage="alertMessage" v-if="showMessage"/>
          </form>
           <div class="flex justify-between">
              <div class="text-sm">
                  <RouteBut :route="route" :buttonText="buttonText" />
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-cyan-600 hover:text-cyan-500"> Forgot your password? </a>
              </div>
            </div>
        </div>
      </div>
    </section>
</template>

<script setup>
  //vue properties
  import {ref} from "vue"

  //components
  import RouteBut from "../components/RouteBut.vue";
  import AlertMessage from "./AlertMessage.vue";

  //stores
  import {useUserStore} from '../store/user.js';
  const user = useUserStore();
  


  //variables
  let route = "/auth";
  let buttonText ="Sign In";
  let emailData = ref("");
  let password1Data = ref("");
  let password2Data = ref("");
  let showMessage = ref(false);
  let alertMessage =ref("");
  let msgClass = ref("")

  //functions
  function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailData.value)) {
      return 1
    } else {
      return -1
    }
  }

  function validatePasswords(){
    let res = ref("ok");
    if(password1Data.value.length<6 || password2Data.value.length<6){
      res.value= "minLength"
    }else{
      if(password1Data.value!=password2Data.value){
      res.value = "samePass"
      }
    }
    return res.value;
  }

   async function submitData(){
      let response = checkAllData();
      if(response.value=== 1){
        try{
          await user.signUp(emailData.value, password1Data.value)
          emailData.value = "";
          password1Data.value = "";
          password2Data.value = "";
          msgClass.value = "validMsg";
          alertMessage.value ="Pleas, check your email to activate your account."
          showMessage.value = true;
        }catch(err){
          alertMessage.value = "Has been some error. Pleas, try it later.";
          msgClass.value = "errorMsg"
          showMessage.value = true;
        }
      }
  }

  function checkAllData(){ 
    let res = ref(1);
    showMessage.value = false;
    if(!emailData.value || !password1Data.value || !password2Data.value){
      printErr("errorMsg", "Pleas, introduce all the data.", true), res.value = -1;
    }else{
      let checkEmail = validateEmail();
      if(checkEmail==-1){
        printErr("errorMsg", "Pleas, introduce valid email.", true), res.value = -1;
      }else{
        console.log("entrem a l'ultim else")
        let checkPass = validatePasswords();
        console.log("checkPass:", checkPass)
        switch(checkPass){
          case "minLength": {
            console.log("minLength")
            printErr("errorMsg", "Password length must be at least 6 characters.", true);
            res.value = -1;
          }
          break;
          case "samePass": {
            console.log("samePass")
            printErr("errorMsg", "Introduce the same password.", true);
             res.value=-1;
          }
          break;
          case "ok": {
            showMessage.value = false;
            console.log("okkkk")
          }
          break;
        }
      }
    }
    console.log("retornem", res.value)
    return res;
  };

  function printErr(classMsg, message, stateMsg){
        alertMessage.value = message;
        msgClass.value = classMsg;
        showMessage.value = stateMsg;
  }
</script>

<style>

</style>