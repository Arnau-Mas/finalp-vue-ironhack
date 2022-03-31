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
              <router-link @click="changeNavButton"  v-for="item in navigation" :to="item.href" :key="item.name" :class="[item.current ? ' text-white border bg-cyan-500 shadow-sm' : 'text-gray-500 hover:bg-cyan-100', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
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
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :to="item.href" :class="[item.current ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:bg-cyan-100 hover:text-gray-500', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
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
      async function signOutApp(){
      try{
          await user.signOut();
          router.push({ path: '/auth' });
      }catch(error){
          router.push({path:'/'})
      }
  }
  function changeNavButton(e){
     e.target.class = activeButton(e.target.href) 
  }
</script>

<style>

</style>