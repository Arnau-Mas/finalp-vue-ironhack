<template>
  <section class="sm:bg-grayfons h-max min-h-screen"> <!--  class="bg-gray-200 h-screen 	align-items: center" -->
      <router-view></router-view>
  </section>
</template>

<script setup>
  import SignIn from '../components/SignIn.vue';
  import SignUp from '../components/SignUp.vue';
  //hacer un evento para el enter que haga "submit" @keyup tecla enter etc (buscar)
  import { ref } from 'vue';

  let route = ref("/auth/sign-up");
  let buttonText = "Sign Up";


</script>

<style>
</style>