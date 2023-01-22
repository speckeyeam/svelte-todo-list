<script lang="ts">
	export let nodeReference;
	export let data: {};
	import '../../styles/global.scss'
	let originaltask = data.task;
	let task = data.task;
	let update: boolean = false;
	let deleteBtn: boolean = false;
	let completed: boolean = false;
	let moreMenuClicked: boolean = false;
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
		await delay(500);
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

	// function calculateHeightOfListContainer(){
	// 	const firstListItem = listItems[0];
	// 	let heightOfListItem = firstListItem.clientHeight;
	// 	const styleTag = document.createElement('style');
	// 	document.body.prepend(styleTag);
	// 	styleTag.innerHTML = `.list-container{
	// 		height: ${heightOfListItem}px;
	// 	}`;
	// };

	// calculateHeightOfListContainer();

		

</script>

<div 
	bind:this={nodeReference}
	on:mouseenter={toggledelete}
	on:mouseleave={toggledelete}
	style="padding-top: 1rem; padding-bottom: 1rem;" class="task-cn" class:completed={completed}
>
	<input class="task-checkbox" id={task} type="checkbox" on:click={deleteTask}>
	<label for={task}></label>
	<input name="taskInput" type="text" class="taskInput" bind:value={task} on:input={taskupdated} />
	{#if deleteBtn}
		<div class="right">
			<i class="fa-solid fa-ellipsis" on:click|once={() => { moreMenuClicked = true;}}></i>
			<div id="moremenu" class:active={ moreMenuClicked }>
				<li><i class="fa-solid fa-pen"></i></li>
				<li><i class="fa-solid fa-trash"></i></li>
			</div>	
			<!-- <button class="deleteBtn" on:click={deleteTask}>delete</button> -->
		</div>
		
	{/if}
	{#if update}
		<button class="updateBtn" on:click={updateTask}>update</button>
	{/if}
	<br />
</div>
<slot />
<style>
	#moremenu {
		display: none;
	}
	#moremenu.active {
		display: flex;
	}



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
		position: absolute;
		left: 40px;
	}
	div.right {
		list-style: none;
		position: absolute;
		right: 20px;
		display: flex;
		gap: 10px;
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
	
	input[type='checkbox']:hover + label {
		background: rgba(255,255,255,.1);
	}
	.task-cn {
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		display: flex;
		height: 40px;
		border-radius: 8px;
		width: 100%;
		position: relative;
		transition: all ease-in 0.2s;
	}
	.task-cn::after {
		content: "";
		position: absolute;
		bottom: 0%;
		left: 0%;
		width:98%;
		height: 1px;
		background-color: #3c645e39;
	}
	.task-cn:hover {
		background-color: #3c645e39;
	}
	.updateBtn,
	.deleteBtn {
		position: absolute;
		right: 0;
	}
	input[type='checkbox'] + label {
		display: flex;
		position: absolute;
		justify-content: center;
		align-items: center;
		margin-right: 1em;
		width: 1.2em;
		height:1.2em;
		background: transparent;
		border: 2px solid #9E9E9E;
		border-radius: 2px;
		cursor: pointer;  
		transition: all 250ms cubic-bezier(.4,.0,.23,1);
	}
	input[type='checkbox']:checked + label {
		border: .6em solid white;
		text-decoration: line-through;  	
		animation: shrink-bounce 200ms cubic-bezier(.4,.0,.23,1);
		/* animation: removed-item-animation .5s cubic-bezier(.65,-0.02,.72,.29); */
	}
	input[type="checkbox"]:checked + label:before {
		content: "";
		position: absolute;
		bottom: 50%;
		right: 50%;
		border-right: 3px solid transparent;
		border-bottom: 3px solid transparent;
		transform: rotate(45deg), translate(-50%, -50%);
		transform-origin: 0% 100%;
		animation: checkbox-check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards;	}
	.completed  {
		text-decoration: line-through;
		/* animation: removed-item-animation .5s cubic-bezier(.65,-0.02,.72,.29); */
	}

	@keyframes removed-item-animation {
		0% {
			opacity: 1;
			transform: translateX(0);
		}

		20% {
			opacity: 1;
			transform: translateX(50px);
		}

		50% {
			opacity: 1;
			transform: translateX(-800px);
		}

		100% {
			opacity: 0;
			transform: translateX(-800px);
		}
	}
	@keyframes shrink-bounce{
		0%{
			transform: scale(1);
		}
		33%{    
			transform: scale(.85);
		}
		100%{
			transform: scale(1);    
		}
	}
	@keyframes checkbox-check{
		0%{
			width: 0;
			height: 0;
			border-color: #212121;
			transform: translate3d(0,0,0) rotate(45deg);
		}
		33%{
			width: .2em;
			height: 0;
			transform: translate3d(0,0,0) rotate(45deg);
		}
		100%{    
			width: .2em;
			height: .5em;    
			border-color: #212121;
			transform: translate3d(0,0,0) rotate(45deg);
		}
	}

	label:before {
	}
	label:before {
		
	}

</style>