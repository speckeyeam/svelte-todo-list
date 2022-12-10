<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';

	export let data: PageData;
</script>

<h2>JOWSH JOWSH</h2>

{#each data.data as task, i}
	<Task data={task} />
{/each}
