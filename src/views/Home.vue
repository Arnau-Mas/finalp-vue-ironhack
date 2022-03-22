<template>
  <section>
      <h3>{{user.user.email}}</h3>
      <NewTask/>
      <button @click="signOutApp">Sign Out</button>
  </section>
</template>

<script setup>
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import NewTask from '../components/NewTask.vue';
    const router = useRouter();
    const user = useUserStore();
    async function signOutApp(){
        try{
            await user.signOut();
            router.push({ path: '/auth' });
        }catch(error){
            console.log(error)
        }
    }
</script>