<template>
     <div :class="messageClass" role="alert">
          <span class="block sm:inline">{{errorMessage}}</span>
    </div>
</template>

<script setup>
    defineProps({
        errorMessage: String,
        messageClass: String
    })
</script>

<style>

</style>