<template>
  <section>
      <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>e</li>
      </ul>
      <button @click="signOutApp">Sign Out</button>
  </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const user = useUserStore();
    function signOutApp(){
        user.signOut();
        router.push({ path: '/auth' });
    }
</script>