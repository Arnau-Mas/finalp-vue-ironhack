<template>
  <div>
      <Nav/>
      <GeneralTasks/>
  </div>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import Nav from '../components/Nav.vue';
    import GeneralTasks from '../components/GeneralTasks.vue'

</script>