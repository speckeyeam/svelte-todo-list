<script lang="ts">
	export let nodeReference;
	export let data: {};
	let originaltask = data.task;
	let task = data.task;
	let update: boolean = false;
	let deleteBtn: boolean = false;
	const taskupdated = async () => {
		if (originaltask != task) {
			update = true;
		} else {
			update = false;
		}
	};
	const toggledelete = async () => {
		if (deleteBtn) {
			deleteBtn = false;
		} else {
			deleteBtn = true;
		}
	};

	const updateTask = async () => {
		fetch('/api/editTask', {
			method: 'POST',
			body: JSON.stringify({
				update: true,
				task,
				id: data.id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					console.log('sucess');
					originaltask = task;
					taskupdated();
				} else if (!res.sucess) {
					console.log('sucess');
				} else if (res.notLoggedIn) {
					console.log('not logged in');
				} else {
					console.log('something else');
				}
			})
			.catch(() => console.log('Failed to submit'));
	};

	const deleteTask = async () => {
		nodeReference.parentNode.removeChild(nodeReference);
		fetch('/api/editJude', {
			method: 'POST',
			body: JSON.stringify({
				delete: true,
				task,
				id: data.id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					console.log('sucess');
				} else if (!res.sucess) {
					console.log('oops');
				} else if (res.notLoggedIn) {
					console.log('not logged in');
				} else {
					console.log('error');
				}
			})
			.catch(() => console.log('Failed to submit'));
	};
</script>

<div
	bind:this={nodeReference}
	on:mouseenter={toggledelete}
	on:mouseleave={toggledelete}
	style="padding-top: 1rem; padding-bottom: 1rem;"
>
	<input bind:value={task} on:input={taskupdated} style="make it not shit" />
	{#if deleteBtn}
		<button on:click={deleteTask}>delete</button>
	{/if}

	{#if update}
		<button on:click={updateTask}>update</button>
	{/if}
	<br />
</div>
<slot />
