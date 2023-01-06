<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';
  import Header from '$components/header.svelte';
  import '../../styles/global.scss'
  import '../../styles/addTaskInput.scss'

	export let data: PageData;
	let value: string;
	const handleSubmit = async () => {
    
    fetch("/api/createJude", {
      method: "POST",
      body: JSON.stringify({
value
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.sucess){
        reloadData();
      }
      else if (res.notLoggedIn){
       
        alert("not logged in")
      }
      
    })
    .catch(() => alert('Failed to submit'))
  }

  const reloadData = async () => {
    
    
    fetch("/api/getJude", {
      method: "POST",
      body: JSON.stringify({
        foo: "bar"
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.data){
        data = res;
      }
      else if (res.notLoggedIn){
       
        alert("not logged in")
      }
      
    })
    .catch(() => alert('Failed to submit'))
  }





 
</script>
<Header />

<div class="addTask-cn">
  <input name="newTaskInput" id="newTaskInput" placeholder="Add Task" bind:value={value} type="input" class="newTaskInput">
  <label for="newTaskInput" class="addTask-label">Add Task</label>
  <!-- <button on:click={handleSubmit}>submit</button> -->
</div>

<br>

<div class="todos-cn">
  <h2>Your tasks</h2>

  {#each data.data as task, i}
    <Task data={task} />
  {/each}
</div>
