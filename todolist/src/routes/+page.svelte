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
let error: boolean = false;
let message: string;
$: doubled = count * 2;
/**
	 * @type {any}
	 */
let value: string;

const loggedIn = async () => {
  fetch("/api/createJude", {
      method: "POST",
      body: JSON.stringify({
value: "jude"
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.sucess){
        alert("sucess")
      }
      else if (res.notLoggedIn){
        error = true;
        alert("not logged in")
      }
      
    })
    .catch(() => alert('Failed to submit'))
  }
//loggedIn();
function incrementCount() {
		count += 1;
	}
    function addToList() {
		todolist.push(value)
        value = '';

        todolist = todolist;
	}
	let response;
  
	const handleSubmit = async () => {
    
    fetch("/api/createJude", {
      method: "POST",
      body: JSON.stringify({
value
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.sucess){
        alert("sucess")
      }
      else if (res.notLoggedIn){
        error = true;
        alert("not logged in")
      }
      
    })
    .catch(() => alert('Failed to submit'))
  }

  const signOut = async () =>{
    fetch("/api/judeout", {
      method: "POST",
      body: JSON.stringify({
value
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.sucess){
alert("sucess")
      }
      else if (res.notLoggedIn){
alert("not logged in")
      }
      
    })
    .catch(() => alert('Failed to submit'))

  
  }

</script>

<input bind:value={value} type="text">
<br>
<br>

<button on:click={signOut}>Sign Out</button>
<button on:click={handleSubmit}>submit</button>
{#if error}
  <h1> {message}</h1>
{/if}
<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<a href = "/signup">Create Account</a>
<a href = "/login">Log in</a>
{#each todolist as item, i}
	<li>{i + 1}: {item}</li>
{/each}

<p>{todolist}</p>
