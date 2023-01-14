<script type="ts">
    import { createEventDispatcher } from "svelte"
    export var value: string
    const dispatch = createEventDispatcher();
    var newTaskInput = document.getElementById("newTaskInput")
    function onSubmit() {
      if(value !== "") {
        dispatch('message')
        value = "";
      }
    }

    function inputFocused() {
        newTaskInput?.classList.add("focused")
        console.log("focused")
    }


    newTaskInput?.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            onSubmit();
            console.log("aeiheb")
        }
    });
</script>

<form on:submit|preventDefault={onSubmit} class="addTask-cn flex center">
    <input name="newTaskInput" id="newTaskInput" placeholder=" " bind:value={value} type="input" class="newTaskInput">
    <button type="submit" class="addTask-label">Add Task</button>
    <!-- <button on:click={handleSubmit}>submit</button> -->
</form>


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
    .addTask-cn:focus-within  {
      box-shadow:
        /* offset-x | offset-y | blur-radius | spread-radius | color */
        0px 24px 38px 3px hsla(0,0%,0%,0.14), 
        0px 9px 46px 8px hsla(0,0%,0%,0.12), 
        0px 11px 15px -7px hsla(0,0%,0%,0.2);
    }
  </style>