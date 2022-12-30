<script lang="ts">

	export let data: {};
    import { onDestroy } from 'svelte';
    import { browser } from "$app/environment"
    let loggedIn: String;
    import { isLoggedIn } from '$stores/stores';

	
</script>
{#if $isLoggedIn == "true"}
<div style = "display: absolute; width: 100%; height: 5%; background-color: whitesmoke;">
    joshua logged in  
</div>
{:else}
<div style = "display: absolute; width: 100%; height: 5%; background-color: whitesmoke;">
    joshua not logged in 
</div>
{/if}
