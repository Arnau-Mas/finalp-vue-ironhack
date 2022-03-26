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
        async signIn(email, password) {
            const { user, error } = await supabase.auth.signIn({ email: email, password: password } );
            if (error) throw error;
            if (user) {
                this.user = user;
                console.log(user);
            }
        },
        async signOut() {
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
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
