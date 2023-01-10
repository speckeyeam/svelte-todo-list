<script lang="ts">
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
  <div class="header" >
      joshua logged in   <button on:click={signOut}>Sign Out</button>
  </div>
  {:else}
  <div class="header flex" style = "width: 100%; height: 5%;">
      <p class="message"> joshua not logged in   </p>
      <div>
        <a href = "/login"> <button>Log in</button></a><a href = "/signup"><button>Sign up</button></a>
      </div>
  </div>
  {/if}

