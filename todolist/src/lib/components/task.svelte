<script lang="ts">
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
		fetch('/api/editJude', {
			method: 'POST',
			body: JSON.stringify({
				task,
				id: data.id
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					originaltask = task;
					update = false;
				} else if (!res.sucess) {
				} else if (res.notLoggedIn) {
				}
			})
			.catch(() => alert('Failed to submit'));
	};
</script>

<input
	bind:value={task}
	on:input={taskupdated}
	on:focusin={toggledelete}
	style="make it not shit"
	on:focusout={toggledelete}
/>
{#if deleteBtn}
	<button>delete</button>
{/if}

{#if update}
	<button on:click={updateTask}>update</button>
{/if}
<br />
<slot />
