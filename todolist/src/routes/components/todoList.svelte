<script lang="ts">
    import type { ITodo } from '../../types/todo'
    export let todos: ITodo[]
    import Todo from "./todo.svelte"


</script>

<div>
    {#each todos as todo (todo.id)}
        <Todo {todo}/>
    {/each}
    test
</div>