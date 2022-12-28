<script lang="ts">
    import type { ITodo } from '../../types/todo'
    export let todos: ITodo[]
    import Todo from "./todo.svelte"
    import '../../public/global.css'
    import '../../public/checkbox.css'


</script>


<div class="todolist-cn">
    {#each todos as todo (todo.id)}
        <Todo {todo}/>
    {/each}
</div>

<style>
    .todolist-cn {
        margin: auto;
        max-width: 800px;
        border: 1px solid white;
    }
</style>