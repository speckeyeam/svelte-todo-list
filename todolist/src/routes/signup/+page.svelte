<script lang="ts">
	let username: string;
	let email: string;
	let password: string;
	const signUp = async () => {
		fetch('/api/judeup', {
			method: 'POST',
			body: JSON.stringify({
				username,
				email,
				password
			})
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.sucess) {
					alert('sucess');
				} else if (res.LoggedIn) {
					alert('logged in');
				} else if (res.emailUsed) {
					alert('email used');
				} else if (res.usernameUsed) {
					alert('username used');
				} else {
					alert('something else');
				}
			})
			.catch(() => alert('Failed to submit'));
	};
</script>

<input bind:value={email} name="email" type="email" />
<input bind:value={username} name="username" type="text" />
<input bind:value={password} name="password" type="password" />
<button on:click={signUp}>Create Account</button>
