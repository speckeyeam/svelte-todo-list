<script lang="ts">
	export let nodeReference;
	export let data: {};
	import '../../styles/global.scss'
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
	style="padding-top: 1rem; padding-bottom: 1rem;" class="task-cn"
>
	<input type="checkbox">
	<input name="taskInput" type="text" class="taskInput" class:completed={task.completed} bind:value={task} on:input={taskupdated} />
	{#if deleteBtn}
		<button on:click={deleteTask}>delete</button>
	{/if}

	{#if update}
		<button on:click={updateTask}>update</button>
	{/if}
	<br />
</div>
<slot />
<style>

	input.taskInput {
		pointer-events: none;
		background-color: rgba(255, 255, 255, 0);
		padding: 0.7rem 1rem;
		gap: 12px;
		width: 100%;
		justify-content: center;
		border: none;
		border-radius: 0;
	}
	.task-cn:hover {
		background-color: #3c645e91;
	}

	input.taskInput.editmode {
		pointer-events: all;
	}




.completed {
    opacity: 0.5;
    text-decoration: line-through;
}
.task-cn {
    align-items: center;
    justify-content: space-between;
    padding: 20px;
	display: flex;
	height: 50px;
	border-bottom: 1px solid black;
	width: 100%;
}


	
  


</style>