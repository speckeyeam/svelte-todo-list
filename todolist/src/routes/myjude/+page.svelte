<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';
  import Header from '$components/header.svelte';
  import AddTaskButton from "$components/addTask.svelte"
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
<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<Header />


<div class="todolist">
  <h2>Your tasks</h2>

  <AddTaskButton bind:value={value} on:message={handleSubmit} />
  <div class="todos-cn">
    {#each data.data as task, i}
      <Task data={task} />
    {/each}
  </div>
</div>



<br>



<style>
  .todolist {
    width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  h2 {
    padding: 20px 15px;
  }

</style>
