<script lang="ts">
    import type { PageData } from './$types';
  	import Task from '$components/task.svelte';
    export let data: PageData;
  </script>
  

  {#each data.data as task, i}
	<Task data={task} />
{/each}

<!-- Button to create new task -->

