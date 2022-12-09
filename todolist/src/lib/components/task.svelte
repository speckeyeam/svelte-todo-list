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
	<button>update</button>
{/if}
<br />
<slot />
