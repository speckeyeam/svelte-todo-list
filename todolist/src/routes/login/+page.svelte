<script lang="ts" src="https://apis.google.com/js/platform.js" async defer>
	import '../../styles/global.scss'
	import '../../styles/login.scss'
	// import '../scripts/swipe'
	import { isLoggedIn } from '$stores/stores';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';


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
<head>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<meta name="google-signin-client_id" content="388378161153-5tnbdofl3p4mggjmtevmimnv6ev1pov7.apps.googleusercontent.com">
</head>
<div class="login" out:fade>
	<div class="backgroundfilter"></div>
	<div   in:fly="{{ y: -50, duration: 250, delay: 300 }}"
	out:fly="{{ y: -50, duration: 250 }}"  id="login-card" class="card-wrapper flex vert center">
		<div class="login-title flex vert">
			<h1>Login</h1>
			<!-- <div class="line-bold"></div> -->
		</div>
		<!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->

		<button class="flex continuewith"><img src="https://img.icons8.com/color/48/null/google-logo.png"/>Continue with Google</button>
		<button class="flex continuewith"><img src="https://img.icons8.com/ios-glyphs/30/null/mac-os.png"/>Continue with Google</button>
		<div class="line-divider"><p>or</p>
		</div>
		<li>
			<label for="email">Email</label>
			<input bind:value={email} name="email" type="email" />
		</li>
		<li>
			<label for="password">Password</label>
			<input id="passwordInput" bind:value={password} name="password" type="password" />
		</li>
		<button class="flex email-btn" on:click={logIn}><a href="/myjude">Continue with email</a> </button>
		<p>New to Jude? <a href = "/signup">Sign Up</a></p>
	</div>
</div>
<main id="swup" class="transition-fade"></main>

<style> 
	.login {
		background-image: url("../images/leavesbackground2.jpeg");
		background-size: auto 100vw;
		background-repeat: no-repeat;
		height: 100vh;
		width: 1100vw;
		/* transition: all 250ms ease-in-out, transform 150ms ease; */
	}

	@media all and (max-width: 900px) {
		div.login {
			background-size: contain;
		}
	}
</style>