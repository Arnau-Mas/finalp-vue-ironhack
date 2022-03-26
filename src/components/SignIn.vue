<template>
    <section>
      <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg p-10 max-w-md w-full space-y-8"> <!-- shadow-md a dalt -->
          <div>
            <img class="mx-auto h-12 w-auto" src="../assets/todo-logo.png" alt="Workflow" />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in!</h2>
            <p class="mt-2 text-center text-sm text-gray-600">The best<span class="font-medium text-cyan-600"> To-do app</span> in the world!
            </p>
          </div>
          <div class="mt-8 space-y-6">

            <input type="hidden" name="remember" value="true" />

            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input v-model="emailData" id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input  v-model="passwordData" id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>

            <div>
              <button  @click="joinApp" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>

            <AlertMessage :messageClass="errorMsg" :errorMessage="errorMessage" v-if="doesntExist"/>

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
  import {ref} from 'vue'
  
  //components
  import RouteBut from "./RouteBut.vue";
  import AlertMessage from "./AlertMessage.vue"
  import { LockClosedIcon } from '@heroicons/vue/solid'

  
  import router from '../router';
  import {useUserStore} from '../store/user.js'
  const user = useUserStore();
  let route = "/auth/sign-up";
  let buttonText = "Sign Up";

  let doesntExist = ref(false);
  let emailData = ref("");
  let passwordData = ref("");
  let errorMessage = ref("Introduce valid user or password.")

  async function joinApp(){
    try{
      await user.signIn(emailData.value, passwordData.value)
      doesntExist.value = false;
      router.push({path:"/"})
    }catch(err){
      doesntExist.value = true;
    }
  }
</script>

<style>
  p{
    color:red;
  }
</style>