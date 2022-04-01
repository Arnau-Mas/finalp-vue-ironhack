import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    tasksCompleted:null,
    tasksArchieved:null,
  }),
  actions: {
    async fetchTasks() { //preguntar alex si esto está bien, ya que no quiero cebar a peticiones por cada ruta
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
        if(error) throw error;
        if(tasks){
          let completedTasks = tasks.filter( task => task.is_complete == true);
          let archievedTasks = tasks.filter(task => task.is_archieved == true);
          let restTasks = tasks.filter(task => task.is_archieved == false && task.is_complete == false)
          this.tasks = restTasks;
          this.tasksArchieved = archievedTasks;
          this.tasksCompleted = completedTasks;
          return this.tasks; //y si no las hay hacer otra cosa
        }
    },
    async insertTask(userId, title, time, isComplete, isArchived){
      const { data, error } = await supabase
      .from('tasks')
      .insert([
        { user_id: userId, title:title, time:time, is_complete:isComplete, is_archieved:isArchived}
      ]);
      if(data){
        this.tasks.push(...data); //fem spread operator perque data ens retorna un objecte dins d'un array i nomes volem posar l'objecte a dins de tasks
      }
      if(error) throw error;
    },
    async updateTask(taskId, parameterToSet, result){
      if(parameterToSet=="isCompleted"){
        const { data, error } = await supabase
        .from('tasks')
        .update({is_complete:result})
        .match({id:taskId})
        if(data){
          return data
        }
        if(error){
          throw error
        }
      }
      if(parameterToSet=="isArchieved"){
        const { data, error } = await supabase
        .from('tasks')
        .update({is_archieved:result})
        .match({id:taskId})
        if(data){
          return data
        }
        if(error){
          throw error
        }
      }
    },
    async deleteTask(taskId){
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId })
      if(data){
        return data;
      }
      if(error){
        throw error
      }
    }
  },
});