<script type="ts">
    import { createEventDispatcher } from "svelte"
    export var value: string
    const dispatch = createEventDispatcher();
    function onSubmit() {
        dispatch('message')
    }
    var newTaskInput = document.getElementById("newTaskInput")

    function inputFocused() {
        newTaskInput?.classList.add("focused")
        console.log("focused")
    }
</script>

<div class="addTask-cn flex center">
    <input name="newTaskInput" id="newTaskInput" placeholder=" " bind:value={value} type="input" class="newTaskInput">
    <button on:click={onSubmit} class="addTask-label">Add Task</button>
    <!-- <button on:click={handleSubmit}>submit</button> -->
</div>


  <style>
    .addTask-cn {
      height: 40px;
      align-items: center;
    }
    /* .newTask-cn {
      position: relative;
      padding: 15px 0 0;
      margin-top: 10px;
      width: 50%;
    } */
    .addTask-cn:placeholder-shown {
    }
  </style>