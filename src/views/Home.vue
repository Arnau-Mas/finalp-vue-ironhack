<template>
  <div>
    <Nav/>
    <router-view></router-view>
  </div>
</template>

<script setup>
    import Nav from '../components/Nav.vue';
    import GeneralTasks from '../components/GeneralTasks.vue'

        import {ref} from 'vue'
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
    const router = useRouter();
    const user = useUserStore();
    const navigation = [
    { name: 'Tasks', href: '/', current: true },
    { name: 'Archieved', href: 'archieved', current: false },
    { name: 'Completed', href: '#', current: false },
    ]
    async function signOutApp(){
    try{
        await user.signOut();
        router.push({ path: '/auth' });
    }catch(error){
        console.log(error)
    }
}

</script>