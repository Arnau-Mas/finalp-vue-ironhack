<template>
    <section>
        <div
            class="min-h-full flex items-center justify-center mobile:pt-12 sm:py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="bg-white rounded-lg p-10 max-w-md w-full space-y-8">
                <!-- shadow-md a dalt -->
                <div>
                    <img
                        class="mx-auto h-12 w-auto"
                        src="../assets/todo-logo.png"
                        alt="todoapp"
                    />
                    <h2
                        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Sign in!
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        The best<span class="font-medium text-cyan-600">
                            To-do app</span
                        >
                        in the world!
                    </p>
                </div>
                <form
                    @submit.prevent="joinApp"
                    novalidate="true"
                    class="mt-8 space-y-6"
                >
                    <!-- canviar per div i tornar a posar l'event a un @click del botó -->

                    <input type="hidden" name="remember" value="true" />

                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only"
                                >Email address</label
                            >
                            <input
                                v-model="emailData"
                                id="email-address"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                maxlength="50"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label for="password" class="sr-only"
                                >Password</label
                            >
                            <input
                                v-model="passwordData"
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                maxlength="20"
                            />
                        </div>
                    </div>

                    <div>
                        <button :class="classBtn">
                            <span
                                class="absolute left-0 inset-y-0 flex items-center pl-3"
                            >
                                <LockClosedIcon
                                    v-if="isShown"
                                    class="h-5 w-5 text-cyan-500 group-hover:text-cyan-400"
                                    aria-hidden="true"
                                />
                                <LockOpenIcon
                                    v-if="!isShown"
                                    class="h-5 w-5 text-green-500 group-hover:text-green-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
                        </button>
                    </div>

                    <AlertMessage
                        :messageClass="'errorMsg'"
                        :alertMessage="alertMessage"
                        v-if="doesntExist"
                    />
                </form>
                <div class="flex justify-between">
                    <div class="text-sm">
                        <RouteBut :route="route" :buttonText="buttonText" />
                    </div>
                    <div class="text-sm">
                        <a
                            href="#"
                            @click="forgotPass"
                            class="font-medium text-cyan-600 hover:text-cyan-500"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
  import { ref } from "vue";

  //components
  import RouteBut from "./RouteBut.vue";
  import AlertMessage from "./AlertMessage.vue";
  import { LockClosedIcon } from "@heroicons/vue/solid";
  import { LockOpenIcon } from "@heroicons/vue/solid";

  import router from "../router";
  import { useUserStore } from "../store/user.js";
  const user = useUserStore();
  let route = "/auth/sign-up";
  let buttonText = "Sign Up";
  let isShown = ref(true);
  let doesntExist = ref(false);
  let emailData = ref("trialtodoapp@gmail.com");
  let passwordData = ref("123456");
  let alertMessage = ref("Introduce valid email or password.");
  let classBtn = ref("signInBtn");

  async function joinApp() {
      doesntExist.value = false;
      let checkEmail = validateEmail();
      if (checkEmail == 1 && passwordData.value.length >= 6) {
          try {
              await user.signIn(emailData.value, passwordData.value);
              doesntExist.value = false;
              setTimeout(() => {
                  router.push({ path: "/" });
              }, 1000);
              isShown.value = false;
              classBtn.value = "signInConfirmed";
          } catch (err) {
              doesntExist.value = true;
          }
      } else {
          doesntExist.value = true;
      }
  }

  function validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailData.value)) {
          return 1;
      } else {
          return -1;
      }
  }
  function forgotPass() {
      setTimeout(() => {
          doesntExist.value = false;
          alertMessage.value = "Introduce valid email or password.";
      }, 1500);
      doesntExist.value = true;
      alertMessage.value = "Functionality not availaible yet!";
  }
</script>

<style></style>
