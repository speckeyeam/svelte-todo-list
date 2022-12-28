<script lang="ts">
    import type { ITodo } from '../../types/todo'
    export let todo: ITodo
    import '../../public/global.css'
    import '../../public/checkbox.css'

</script>


<li class="todo-cn flex">
    <div class="left-cn  flex align-center">
        <span class="form-check-input me-3">
            <input  type="checkbox" value="" aria-label="..." checked />
        </span>
        <span class:completed={todo.completed}>{todo.text}</span>
        <!-- <s>{todo.text}</s> -->
    </div>
    <div class="right-cn">
        <i class="fa-solid fa-ellipsis"></i>
    </div>
</li>