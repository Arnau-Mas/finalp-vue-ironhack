<template>
  <section>
      <Nav/>
      <h3>Welcome {{userName}}!</h3>
      <NewTask />
  </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import Nav from '../components/Nav.vue';
    import NewTask from '../components/NewTask.vue';
    import TaskItem from '../components/TaskItem.vue';
    let user = useUserStore();
    let userName = user.user.email;
</script>