<script lang="ts">
	import { isLoggedIn } from '$stores/stores';
	import { goto } from '$app/navigation';
	let email: string;
	let password: string;
	const logIn = async () => {
		fetch('/api/judein', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					isLoggedIn.toggle("true")
					goto("/myjude")
				} else if (res.LoggedIn) {
					alert('logged in');
				} else if (res.emailUsed) {
					alert('email used');
				} else if (res.usernameUsed) {
					alert('username used');
				} else {
					if (res.message) {
						alert(res.message);
					}
				}
			})
			.catch(() => alert('Failed to submit'));
	};
</script>

<input bind:value={email} name="email" type="email" />
<input bind:value={password} name="password" type="password" />
<button on:click={logIn}>Log in</button>
