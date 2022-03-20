<template>
    <section>
        <form action="" method="POST">
        <h1>Sign In</h1>
        <input type="email" name="email" id="email" placeholder="email">
        <input type="password" name="password" id="password" placeholder="password">
        <button>Sign In</button>
      </form>
    <RouteBut :route="route" :buttonText="buttonText" />
    </section>
</template>

<script setup>
  import RouteBut from "../components/RouteBut.vue";
  let route = "/auth/sign-up";
  let buttonText = "Sign Up";
</script>

<style>

</style>