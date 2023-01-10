<script lang="ts">
//https://stackoverflow.com/questions/68041262/how-to-avoid-showing-loading-state-after-the-initial-load-in-svelte
	export let data: {};
    import { onDestroy,  onMount} from 'svelte';
    import { browser } from "$app/environment"
    import { goto } from '$app/navigation';
    let loggedIn: String;
    import { isLoggedIn } from '$stores/stores';

    onMount(async () => {
      fetch("/api/validSession", {
      method: "POST",
      body: JSON.stringify({
value: "balls"
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.sucess){
        isLoggedIn.toggle("true")
      }
      else{
        isLoggedIn.toggle("false")
      }
      
    })
    .catch(() => alert('Failed to submit'))
	});
    const signOut = async () =>{
    fetch("/api/judeout", {
      method: "POST",
      body: JSON.stringify({
value: "balls"
      })
    })
    .then(res => res.json())
    .then(res => {
      isLoggedIn.toggle("false")
      goto("/")
    })
    .catch(() => alert('Failed to submit'))

  
  }
</script>
{#if $isLoggedIn == "true"}
<div style = "display: absolute; width: 100%; height: 5%; background-color: whitesmoke;">
    joshua logged in   <button on:click={signOut}>Sign Out</button>
</div>
{:else}
<div style = "display: absolute; width: 100%; height: 5%; background-color: whitesmoke;">
    joshua not logged in   <a href = "/login"> <button>Log in</button></a><a href = "/signup"><button>Sign up</button></a>
</div>
{/if}
