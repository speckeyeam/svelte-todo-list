<script lang="ts">
	import type { PageData } from './$types';
	import Task from '$components/task.svelte';
	import Project from '$components/project.svelte';
	import Header from '$components/header.svelte';

	export let data: PageData;
	let value: string;

	import { onMount } from 'svelte';

	import ioClient from 'socket.io-client';
	const ENDPOINT = 'http://localhost:2000';

	const socket = ioClient(ENDPOINT);
	const io = socket;

	let textfield = '';
	let username = '';

	let messages: any = [];

	onMount(() => {
		io.on('connect', function () {
			io.emit('joinChannel', {
				channel: data.id
			});
		});

		io.on('edit', (message) => {
			// Listen to the message event
			if (message.channel == data.id) {
				console.log(message);
			} else {
			}
			messages = [...messages, message];
		});
		io.on('name', (name) => {
			// Another listener for the name:
			username = name; // Update the name so it can be displayed
		});
	});

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
					const message: any = {};
					message.type = 'added';
					message.content = value;
					message.channel = data.id;
					io.emit('edit', message);
					console.log('test');
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
