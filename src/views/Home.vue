<template>
  <section>
      <h3>{{user.user.email}}</h3>
      <button @click="signOutApp">Sign Out</button>
  </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const user = useUserStore();
    async function signOutApp(){
        await user.signOut();
        router.push({ path: '/auth' });
    }
</script>