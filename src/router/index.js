import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import GeneralTasks from "../components/GeneralTasks.vue"
import ArchievedTasks from "../components/ArchievedTasks.vue"
import CompletedTasks from "../components/CompletedTasks.vue"

const routes = [
  { path: "/auth", 
      beforeEnter: (to, from) => {
      if(to.name == "sign-up"){
        return {name:""}
      }
    },
    component: Auth,
    children:[
      { path: "", component: SignIn},
      { path: "sign-up", component: SignUp},
    ] },
  { path: "/", component: Home,
    beforeEnter: (to, from) => {
      if(to.name == "archieved" || to.name=="completed"){
        return {name:""}
      }
    },
    children:[
      { path: "", component: GeneralTasks},
      { path: "archieved", component: ArchievedTasks},
      { path: "completed", component: CompletedTasks}
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;