<template>
    <section class="flex flex-col items-center w-full mobile:mb-1 mb-6">
        <article :class="divClass">
            <input
                @focus="changePlaceholder"
                @focusout="changePlaceholder"
                v-model="taskText"
                type="text"
                maxlength=""
                class="focus:ring-0 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 border-0 px-2 leading-tight focus:border-none"
                :placeholder="placeholderText"
                aria-label="Full name"
            />
            <p class="text-sky-500">|</p>
            <input
                v-model="taskDate"
                type="time"
                class="text-center focus:ring-0 appearance-none bg-transparent border-none text-gray-700 w-32 mobile:mt-2 mobile:pr-0 mobile:pl-2 py-1 px-0 leading-tight"
            />
            <button
                v-tooltip="'Add Task'"
                @click="addTask"
                class="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white px-2 mobile:ml-0 rounded"
                type="button"
            >
                +
            </button>
            <button
                @click="cleanInput"
                class="fullCancel flex-shrink-0 border-transparent border-4 text-sky-500 hover:text-sky-800 text-sm py-1 ml-2 rounded"
                type="button"
            >
                Cancel
            </button>
            <button @click="cleanInput" :class="newClassBtn" type="button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </article>
        <article v-if="errorMessageBool" class="mt-4 w-full max-w-xl">
            <AlertMessage
                :messageClass="'errorMsg'"
                :alertMessage="errorMessage"
            />
        </article>
    </section>
</template>

<script setup>
    import { useUserStore } from "../store/user.js";
    import { useTaskStore } from "../store/task.js";
    import AlertMessage from "./AlertMessage.vue";
    import { ref, computed } from "vue";

    //components
    import TaskItem from "../components/TaskItem.vue";

    //variables
    let user = useUserStore();
    let tasks = useTaskStore();
    let userId = user.user.id;
    let taskText = ref("");
    let taskDate = ref("00:00");
    let taskCompleted = ref(false);
    let taskArchived = ref(false);
    let errorMessageBool = ref(false);
    let divClass = ref("newTaskClass");
    let errorMessage = ref("Sorry. Has been some error. Try it later.");
    let placeholderText = ref("✏️ Write your task");
    let textCancelBtn = ref("Cancel");
    // let newClassBtn = ref("hidden")

    //Functions
    function changePlaceholder() {
        errorMessageBool.value = false;
        if (placeholderText.value) {
            placeholderText.value.length > 0;
        } else {
            placeholderText.value = "✏️ Write your task";
        }
    }

    function addTask() {
        if (!taskText.value) {
            divClass.value = "newTaskClassError";
            setTimeout(() => {
                divClass.value = "newTaskClass";
            }, 200);
        } else {
            try {
                tasks.insertTask(
                    userId,
                    taskText.value,
                    taskDate.value,
                    taskCompleted.value,
                    taskArchived.value
                );
                cleanInput();
            } catch (err) {
                errorMessageBool.value = true;
                errorMessage = ref("Sorry. Has been some error. Try it later.");
            }
        }
    }

    function cleanInput() {
        taskText.value = "";
        taskDate.value = "00:00";
    }

    //Computeds
    const newClassBtn = computed(() => {
        if (taskText.value) {
            return "shortCancel cancelButtonClass visible";
        } else {
            return "shortCancel hidden";
        }
    });
</script>

<style>
    .shortCancel {
        display: none;
        padding: 0.4rem;
    }

    @media (max-width: 639px) {
        /* aixo ho puc fer amb sm:shortCancel etc */
        .shortCancel {
            display: inline-block;
        }
        .fullCancel {
            display: none;
        }
    }
</style>
