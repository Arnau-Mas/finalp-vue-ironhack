<template>
    <router-link class="bg-white hover:bg-emerald-100 text-emerald-600 font-semibold py-2 px-4 border border-emerald-400 rounded shadow" :to="route">{{buttonText}}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText:String
})
</script>

<style>
</style>