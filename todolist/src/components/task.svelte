<script lang="ts">
	export let nodeReference;
	export let data: {};
	import '../../styles/global.scss'
	let originaltask = data.task;
	let task = data.task;
	let update: boolean = false;
	let deleteBtn: boolean = false;
	let completed: boolean = false;
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
	const delay = ms => new Promise(res => setTimeout(res, ms));

	const deleteTask = async () => {
		completed = true
		await delay(1000);
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



	const listItems = document.querySelectorAll('.task-cn');

	function calculateHeightOfListContainer(){
		const firstListItem = listItems[0];
		let heightOfListItem = firstListItem.clientHeight;
		const styleTag = document.createElement('style');
		document.body.prepend(styleTag);
		styleTag.innerHTML = `.list-container{
			height: ${heightOfListItem}px;
		}`;
	};

	calculateHeightOfListContainer();

</script>

<div 
	bind:this={nodeReference}
	on:mouseenter={toggledelete}
	on:mouseleave={toggledelete}
	style="padding-top: 1rem; padding-bottom: 1rem;" class="task-cn"
>
	<input id={task} type="checkbox" on:click={deleteTask}>
	<label for={task}></label>
	<input name="taskInput" type="text" class="taskInput" class:completed={completed} bind:value={task} on:input={taskupdated} />
	{#if deleteBtn}
		<i class="fa-solid fa-ellipsis"></i>
		<!-- <button class="deleteBtn" on:click={deleteTask}>delete</button> -->
	{/if}
	{#if update}
		<button class="updateBtn" on:click={updateTask}>update</button>
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
		transition: all 250ms cubic-bezier(.4,.0,.23,1);
		font-size: 0.8rem;
	}
	i {
		cursor: pointer;
	}
	input.taskInput.editmode {
		pointer-events: all;
	}
	input[type="checkbox"] {
		display: none;
	}
	input[type='checkbox'] + label {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 1em;
		width: 1em;
		height: 1em;
		background: transparent;
		border: 2px solid #9E9E9E;
		border-radius: 2px;
		cursor: pointer;  
		transition: all 250ms cubic-bezier(.4,.0,.23,1);
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
		position: relative;
		transition: all ease-in 0.2s;
		height: 0;
	}
	.task-cn:not(:first-child) {
	}
	.task-cn:hover {
		background-color: #3c645e91;
	}
	.updateBtn,
	.deleteBtn {
		position: absolute;
		right: 0;
	}
	
	@keyframes strike{
		0%   { width : 0; }
		100% { width: 100%; }
	}


</style>