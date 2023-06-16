<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';
	import Project from '$components/project.svelte';
	import Header from '$components/header.svelte';

	export let data: PageData;
	let value: string;

	const handleSubmit = async () => {
		fetch('/api/createTask', {
			method: 'POST',
			body: JSON.stringify({
				value,
				projectId: data.id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					let element = {};
					element.task = value;

					data.tasks.tasks.push(element);
					data.tasks = data.tasks;
					data.tasks;
				} else if (res.notLoggedIn) {
					alert('not logged in');
				}
			})
			.catch(() => alert('Failed to submit'));
	};
</script>

<Header />

<h1>{data.title}</h1>
<div>{@html data.id}</div>

<input bind:value type="text" />
<br />

<button on:click={handleSubmit}>submit</button>

<h2>Your tasks</h2>

{#each data.tasks.tasks as task, i}
	<Task data={task} />
{/each}
