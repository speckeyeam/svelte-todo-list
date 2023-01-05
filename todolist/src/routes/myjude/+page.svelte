<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';
  import Header from '$components/header.svelte';
  
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
<input bind:value={value} type="text">
<br>

<button on:click={handleSubmit}>submit</button>

<h2>Your tasks</h2>

{#each data.data as task, i}
	<Task data={task} />
{/each}
