<template>
    <router-link class="bg-white hover:bg-cyan-100 text-cyan-600 font-semibold py-2 px-4 border border-cyan-400 rounded shadow" :to="route">{{buttonText}}</router-link>
</template>

<script setup>
  defineProps({
    route: String,
    buttonText:String
  })
</script>

<style>
</style>