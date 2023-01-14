<script lang="ts">
	let username: string;
	let email: string;
	let password: string;
	import '../../styles/login.scss'
	import '../../styles/global.scss'
	import { fade, fly } from 'svelte/transition';
	import ErrorMessage from '$components/errorMessage.svelte';
	import { goto } from '$app/navigation';

	// import '../../styles/login.scss'

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
					goto("/myjude")
				} else if (res.LoggedIn) {
					alert('logged in');
				} else if (res.emailUsed) {
					alert('email used');
				} else if (res.usernameUsed) {
					alert('username used');
				} else {
					
				}
			})
			.catch(() => alert('Failed to submit'));
	};


	var error: String;

	
</script>

<head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<meta name="google-signin-client_id" content="388378161153-5tnbdofl3p4mggjmtevmimnv6ev1pov7.apps.googleusercontent.com">
</head>


<div class="signup" out:fade >
	<div class="backgroundfilter"></div>
	<!-- 
	<input bind:value={email} name="email" type="email" />
	<input bind:value={username} name="username" type="text" />
	<input bind:value={password} name="password" type="password" /> -->
	<!-- <button on:click={signUp}>Create Account</button> -->
	<div  in:fly="{{ y: -50, duration: 250, delay: 300 }}"
	out:fly="{{ y: -50, duration: 250 }}"  id="signup-card" class="card-wrapper flex vert center behind">
		<!-- <button id="signup-switch" class="switcher">Sign Up</button> -->
		<div class="login-title flex vert">
			<h1>Sign Up</h1>
			<!-- <div class="line-bold"></div> -->
		</div>
		<ErrorMessage {error}/>
		<li>
			<label for="email-signup">Email</label>
			<input required bind:value={email} name="email-signup" type="email" />
		</li>
		<li>
			<label for="username-signup">Username</label>
			<input required bind:value={username} name="username-signup" type="text" />
		</li>
		
		<li>
			<label for="password">Password</label>
			<input required bind:value={password} name="password" type="password" />	
		</li>
		
		<button type="submit" class="flex email-btn" on:click={signUp}> Continue with email</button>


		<div class="line-divider"><p>or</p></div>
		<!-- <button class="flex continuewith"><img src="https://img.icons8.com/color/48/null/google-logo.png"/>Continue with Google</button>
		<button class="flex continuewith"><img src="https://img.icons8.com/ios-glyphs/30/null/mac-os.png"/>Continue with Google</button> -->
		<p>Already have an account? <a href = "/login">Log in</a></p>
		</div>
</div>
<main id="swup" class="transition-fade"></main>

<style> 
	.signup {
		background-image: url("../images/leavesbackground3.jpeg");
		background-size: auto 100vw;
		background-repeat: no-repeat;
		height: 100vh;
		width: 1100vw;
		/* transition: all 250ms ease-in-out, transform 150ms ease; */
	}
	@media all and (max-width: 900px) {
		div.signup {
			background-size: contain;
		}
	}
	
</style>