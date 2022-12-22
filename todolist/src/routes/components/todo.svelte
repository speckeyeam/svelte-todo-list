<style>
   
</style>
<script lang="ts">
    import type { ITodo } from '../../types/todo'
    export let todo: ITodo
</script>
<li>
    <input class="form-check-input me-3" type="checkbox" value="" aria-label="..." checked />
    <p>{todo.text}</p>
    <s>{todo.text}</s>
</li>