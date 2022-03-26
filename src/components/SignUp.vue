<template>
    <section>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg p-10 max-w-md w-full space-y-8"> <!-- shadow-md a dalt -->
          <div>
            <img class="mx-auto h-12 w-auto" src="../assets/todo-logo.png" alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up!</h2>
            <p class="mt-2 text-center text-sm text-gray-600">The best<span class="font-medium text-cyan-600"> To-do app</span> in the world!
            </p>
          </div>
          <div class="mt-8 space-y-6">

            <input type="hidden" name="remember" value="true" />

            <div class="rounded-md shadow-sm">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                      Email
                    </label>
                    <input v-model="emailData" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="email" name="email" id="email" pattern="	^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" required placeholder="someone@example.com">
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input v-model="password1Data" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="password" name="password" id="password" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎" required>
                  </div>
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPass">
                      Confirm password
                    </label>
                    <input v-model="password2Data" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" type="password" name="confirmPass" id="confirmPass" placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎" required>
                  </div>
            </div>

            <div>
              <button  @click="submitData" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                Sign up
              </button>
            </div>
            <AlertMessage :errorMessage="errorMessage" v-if="hasBeenError"/>
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
      </div>
    </section>
</template>

<script setup>
  import RouteBut from "../components/RouteBut.vue"
  import AlertMessage from "./AlertMessage.vue";
  import {ref} from "vue"
  import {useUserStore} from '../store/user.js'
  const user = useUserStore();

  let route = "/auth";
  let buttonText ="Sign In";
  let emailData = ref("");
  let password1Data = ref("");
  let password2Data = ref("");
  let hasBeenError = ref(false);
  let errorMessage =ref("");


   async function submitData(){
      let response = checkAllData();
      if(response.value=== 1){
        try{
          await user.signUp(emailData.value, password1Data.value)
          emailData.value = "";
          password1Data.value = "";
          password2Data.value = "";
        }catch(err){
          errorMessage.value = "Has been some error. Pleas, try it later.";
          hasBeenError.value = true;
        }
      }
  }

  function checkAllData(){ 
    let res = ref(1);
    hasBeenError.value = false;
    if(emailData.value && password1Data.value && password2Data.value){
      if(password2Data.value != password1Data.value){
        hasBeenError.value = true;
        errorMessage.value = "Introduce the same password."
        res = -1;
      }else{
        hasBeenError.value = false;
      }
    }else{
      hasBeenError.value = false;
      res = -1;
      errorMessage.value = "Pleas, introduce all the data.";
      hasBeenError.value = true;  
    }
    return res;
  };
</script>

<style>

</style>