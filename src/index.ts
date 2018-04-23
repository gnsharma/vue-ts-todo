import Vue from "vue";
import TodoApp from "./components/TodoApp.vue";

export interface State {
    newTodoTitle: string;
    currentView: string;
    todos: Todo[];
}

export interface Todo {
    index: number;
    title: string;
    completed: boolean;
}

const app = new Vue({
    el: '#app',
    data: { name: "World"},
    components: {
        TodoApp
    }
});


