<template>
  <section>
      <Nav/>
      <!-- <h3>{{user.user.email}}</h3> -->
      <NewTask />
  </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import Nav from '../components/Nav.vue';
    import NewTask from '../components/NewTask.vue';
</script>