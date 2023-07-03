<script lang="ts">
	import type { PageData } from './$types';
	import Project from '$components/project.svelte';
	import Header from '$components/header.svelte';

	export let data: PageData;
	let value: string;
	const handleSubmit = async () => {
		fetch('/api/createProject', {
			method: 'POST',
			body: JSON.stringify({
				value
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					let element = {};
					element.title = value;
					data.data.push(element);
					data.data = data.data;
					data.data;
				} else if (res.notLoggedIn) {
					alert('not logged in');
				}
			})
			.catch((e) => alert(e));
	};
</script>

<Header />
<input bind:value type="text" />
<br />

<button on:click={handleSubmit}>submit</button>

<h2>Your projects</h2>

{#each data.data as project, i}
	<Project data={project} />
{/each}
