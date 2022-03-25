<template>
    <section class="mt-36">
     <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="p-5 max-w-md w-full space-y-8"> <!-- ojo el padding -->
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in!</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          The best
          <span class="font-medium text-emerald-600"> To-do app</span>
          in the world!
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
        <div class="flex justify-between">
          <div class="text-sm">
              <RouteBut :route="route" :buttonText="buttonText" />
          </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500"> Forgot your password? </a>
            </div>
        </div>
      </form>
    </div>
  </div>
      <!-- ******************** -->
        <div>
        <h1>Sign In</h1>
        <input v-model="emailData" type="email" name="email" id="email" placeholder="email" required>
        <input v-model="passwordData" type="password" name="password" id="password" placeholder="password" required>
        <button @click="joinApp">Sign In</button>
        <p v-if="doesntExist">Has been some error. Pleas, introduce valid user or password.</p>
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

  let doesntExist = ref(false);
  let emailData = ref("");
  let passwordData = ref("");

  async function joinApp(){
    console.log("prova", emailData.value, passwordData.value)
    try{
      await user.signIn(emailData.value, passwordData.value)
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