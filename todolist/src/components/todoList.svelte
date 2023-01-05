<script lang="ts">
    import type { ITodo } from '../types/todo'
    export let todos: ITodo[]
    import Todo from "./todo.svelte"
    import '../css/global.css'


</script>


<div class="todolist-cn">
    {#each todos as todo (todo.id)}
        <Todo {todo}/>
    {/each}
</div>

<style>

</style>