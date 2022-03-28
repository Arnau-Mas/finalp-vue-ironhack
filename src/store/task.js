import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
        if(error) throw error;
        if(data){
          this.tasks = tasks;
        } 
    },
    async insertTask(userId, title, time, isComplete, isArchived){
      const { data, error } = await supabase
      .from('tasks')
      .insert([
        { user_id: userId, title:title, time:time, is_complete:isComplete, is_archieved:isArchived}
      ]);
      if(error) throw error;
      if(data){
        this.tasks = tasks;
      }
    }
  },
});