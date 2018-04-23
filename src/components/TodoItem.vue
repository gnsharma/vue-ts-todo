<template lang="haml">
.card
  .card-content
    .card-title
      %input{"type": 'checkbox', "id": 'checkbox', "v-model:checked": 'todo.completed'}
      %p {{todo.title}}
    %p{"v-if": 'todo.completed == true'} Status: Completed
    %p{"v-if": 'todo.completed == false'} Status: Active
  .card-action
    %button.waves-effect.waves-light.btn{"v-on:click": '$emit("toggleCompleted")'} Toggle Status
    %button.waves-effect.waves-light.btn{"v-on:click": '$emit("removeSelf")'} Delete
</template>

<script lang="ts">
export default {
    props: ['todo']
};
</script>

<style>
#checkbox {
  -webkit-appearance:checkbox;
  opacity: unset;
  position: unset;
}
