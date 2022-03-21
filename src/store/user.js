import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signIn(email, password){
      try {
        const { user, error } = await supabase.auth.signIn({ email: email, password: password })
        if (error) throw error
        alert(`error signin ${email}, ${password}, ${error}`)
        if(user){
          this.user = user;
          console.log(user)
        }
      } catch (error) {
        alert("error signIn", error.error_description || error.message)
      } 
    },
    async signOut(){
      try {
        let { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      }
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});