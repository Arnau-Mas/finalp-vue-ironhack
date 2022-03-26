<template>
     <div :class="messageClass" role="alert">
          <span class="block sm:inline">{{alertMessage}}</span>
    </div>
</template>

<script setup>
    defineProps({
        alertMessage: String,
        messageClass: String
    })
</script>

<style>

</style>