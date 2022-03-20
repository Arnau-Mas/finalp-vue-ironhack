<template>
    <section>
        <form action="" method="POST">
        <h1>Sign Up</h1>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email">
        <label for="password">Password:</label>
        <input v-model="password1" type="password" name="password" id="password">
        <label for="confirmPass">Confirm Password:</label>
        <input v-model="password2" type="password" name="confirmPass" id="confirmPass">
        <button>Register</button>
      </form>
      <RouteBut :route="route" :buttonText="buttonText" />
      <p v-if="formCompleted">Pleas, go to your <a href="/">mail</a> and click the link to activate your account.</p>
    </section>
</template>

<script setup>
  import RouteBut from "../components/RouteBut.vue"
  import {ref} from "vue"
  let route = "/auth";
  let buttonText ="Sign In";
  let password1 = ref("");
  let password2 = ref("");

//Fer una funcio computed perque fagi un pop up quan fagi matching de les 2 contrassenyes en cas de que no siguin iguals? O espero a que li doni al botó de submit? (pq tampoc sé si això ja ho implementaria un formulari importat d'una llibreria externa)
</script>

<style>

</style>