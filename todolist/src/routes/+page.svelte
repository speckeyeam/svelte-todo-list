<script lang="ts">
//https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
/*
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
*/
let todolist: string[]= ["eat joshua soup", "eat joshua food"];
let count: number = 0;

$: doubled = count * 2;
/**
	 * @type {any}
	 */
let value: string;
function incrementCount() {
		count += 1;
	}
    function addToList() {
		todolist.push(value)
        value = '';

        todolist = todolist;
	}
</script>

<input bind:value={value} type="text">
<br>
<br>
<button on:click={addToList}>submit</button>
<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
{#each todolist as item, i}
	<li>{i + 1}: {item}</li>
{/each}

<p>{todolist}</p>
