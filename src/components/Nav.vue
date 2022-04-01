<template>
 <Disclosure as="nav" class="bg-white shadow-md" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
         <a href="/"><img class="block lg:hidden h-8 w-auto" src="../assets/todo-letters-logo.png" alt="todoapp" /></a>   
            <a href="/"><img class="hidden lg:block h-8 w-auto" src="../assets/todo-letters-logo.png" alt="todoapp" /></a> 
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link @click="changeNavButton(1)" to="/" id="1" :class="classBtn1" aria-current='page'>Tasks</router-link>
              <router-link @click="changeNavButton(2)" to="archieved" id="2" :class="classBtn2" aria-current='page'>Archived</router-link>
              <router-link @click="changeNavButton(3)" to="completed" id="3" :class="classBtn3" aria-current="page">Completed</router-link>
            </div>
          </div>
        </div>
        <div class=" text-gray-500 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <button @click="signOutApp">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton as="a" @click="changeNavMobile(1)" :class="classMblBtn1" aria-current='page' >Tasks</DisclosureButton>
         <DisclosureButton  as="a" @click="changeNavMobile(2)" :class="classMblBtn2" aria-current= 'page' >Archived</DisclosureButton>
          <DisclosureButton as="a" @click="changeNavMobile(3)" :class="classMblBtn3" aria-current='page' >Completed</DisclosureButton>
      </div>

    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
    import {ref} from 'vue'
    import {useUserStore} from '../store/user.js';
    import { useRouter } from 'vue-router';
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
    const router = useRouter();
    const user = useUserStore();
    const navigation = [
    { name: 'Tasks', href: '/', current: true },
    { name: 'Archived', href: 'archieved', current: false },
    { name: 'Completed', href: 'completed', current: false },
    ]
    let classBtn1 = ref("navCurrent")
    let classBtn2 = ref("navNotCurrent")
    let classBtn3 = ref("navNotCurrent")
    let classMblBtn1 = ref("navMblCurrent")
    let classMblBtn2 = ref("navMblNotCurrent")
    let classMblBtn3 = ref("navMblNotCurrent")
      async function signOutApp(){
      try{
          await user.signOut();
          router.push({ path: '/auth' });
      }catch(error){
          router.push({path:'/'})
      }
  }
  function changeNavButton(id){
     switch(id){
      case 1: {
         classBtn1.value = "navCurrent";
         classBtn2.value = "navNotCurrent";
         classBtn3.value = "navNotCurrent";
     }
     break;
      case 2: {
         classBtn1.value = "navNotCurrent";
         classBtn2.value = "navCurrent";
         classBtn3.value = "navNotCurrent";
     }
     break;
      case 3: {
         classBtn1.value = "navNotCurrent";
         classBtn2.value = "navNotCurrent";
         classBtn3.value = "navCurrent";
     }
     break;
      default:{
        classBtn1.value = "navCurrent";
        classBtn2.value = "navNotCurrent";
        classBtn3.value = "navNotCurrent";
     }
  }}
  function changeNavMobile(id){
        switch(id){
      case 1: {
         classMblBtn1.value = "navMblCurrent";
         classMblBtn2.value = "navMblNotCurrent";
         classMblBtn3.value = "navMblNotCurrent";
         router.push('/')
     }
     break;
      case 2: {
         classMblBtn1.value = "navMblNotCurrent";
         classMblBtn2.value = "navMblCurrent";
         classMblBtn3.value = "navMblNotCurrent";
         router.push('/archieved')
     }
     break;
      case 3: {
         classMblBtn1.value = "navMblNotCurrent";
         classMblBtn2.value = "navMblNotCurrent";
         classMblBtn3.value = "navMblCurrent";
         router.push('/completed')
     }
     break;
      default:{
        classMblBtn1.value = "navCurrent";
        classMblBtn2.value = "navMblNotCurrent";
        classMblBtn3.value = "navMblNotCurrent";
        router.push('/')
     }
  }
  }
</script>

<style>

</style>