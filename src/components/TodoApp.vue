<template lang="haml">
.container
  .row
    .col.s12
      %header
        %h1 Todos
        %input{"v-model": 'newTodoTitle', "v-on:keyup.enter": 'createTodo()', "placeholder": "Add todo", "autofocus": ""}
  .row
    .col.s8
      %div{"v-if": 'todos.length'}
        %ul
          %div{"v-for": 'todo in todosInView'}
            %todo-item{"v-bind:todo": 'todo', "v-on:toggleCompleted": 'toggleCompleted(todo.index)', "v-on:removeSelf": 'removeTodo(todo.index)'}
    .col.s4
      .row
        .col.s12
          .card-panel{"v-bind:class": '[currentView == "completed" ? "green" : ""]'}
            %button.waves-effect.waves-light.btn{"v-on:click": 'currentView = "completed"'} Completed
      .row
        .col.s12
          .card-panel{"v-bind:class": '[currentView == "active" ? "green" : ""]'}
            %button.waves-effect.waves-light.btn{"v-on:click": 'currentView = "active"'} Active
      .row
        .col.s12
          .card-panel{"v-bind:class": '[currentView == "all" ? "green" : ""]'}
            %button.waves-effect.waves-light.btn{"v-on:click": 'currentView = "all"'} All
  .divider
  .row
    .col.s12
      %button.waves-effect.waves-light.btn{"v-on:click": 'clearCompleted()', "style": 'margin-top:10px;'} Clear completed 
</template>

<script lang="ts">
import Vue from "vue";

import TodoItem from './TodoItem.vue';
 
import { State, Todo } from '../index';

export default Vue.extend({
    components: {
	TodoItem,
    },
   
    props: [],

    data() {
	
	const initialState: State = {
	    newTodoTitle: '',
	    currentView: 'all',
	    todos: [
		{ completed: false, title: 'First todo', index: 0 },
	    ]
	};
	
	return initialState;
    },

    methods: {
	
	createTodo() {
	    const title = this.newTodoTitle.trim();
	    if (!title) {
		return;
	    }
	    this.todos.push({
		completed: false,
		title,
		index: this.todos.length
	    });
	    this.newTodoTitle = '';
	},
	
	removeTodo(index: number) {
	    if (index >= this.todos.length) {
		throw new Error(`Index of to be deleted todo is greater than length of todo list`);
	    }
	    this.todos.splice(index, 1);
	},

        toggleCompleted(index: number) {
            const current = this.todos[index];
	    this.todos.splice(index, 1, {
		...current,
		completed: !current.completed
	    });
	},

	clearCompleted() {
	    this.todos = this.remaining;
        },

	toggleAll() {
	    const stateForAll = this.completed.length !== this.todos.length;

	    for  (const todo of this.todos) {
		todo.completed = stateForAll;
	    }
	},

    },

    computed: {
	todosInView(): Todo[] {
	    switch (this.currentView) {
		case 'completed':
		    return this.completed;
		case 'active':
		    return this.remaining;
		case 'all':
		    return this.todos;
		default:
		    return this.todos;
	    }
	},
	completed(): Todo[] {
	    return this.todos.filter(isCompleted);
	},
	remaining(): Todo[] {
	    return this.todos.filter(isNotCompleted);
	},
    },
});

function isCompleted(todo: Todo) {
    return todo.completed;
}

function isNotCompleted(todo: Todo) {
    return !todo.completed;
}
</script>

