<script lang="ts" src="https://apis.google.com/js/platform.js" async defer>
	import '../../styles/global.scss'
	import '../../styles/login.scss'

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


<body>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<meta name="google-signin-client_id" content="388378161153-5tnbdofl3p4mggjmtevmimnv6ev1pov7.apps.googleusercontent.com">

	<!-- <input bind:value={email} name="email" type="email" />
<input bind:value={password} name="password" type="password" />
<button on:click={logIn}>Log in</button> -->

<div class="backgroundfilter"></div>
<!-- <img src="https://media.istockphoto.com/id/974079490/photo/jungle-leaves-background.jpg?s=170667a&w=0&k=20&c=yAjOu8rWodR9Nqc_Lk9MMFe26v2KLAILYoDo_X6OnYo=" class="backgroundimage" alt="background"> -->
<div class="login-cn flex vert center">
	<div class="login-title flex vert">
		<h1>Login</h1>
		<!-- <div class="line-bold"></div> -->
	</div>
	<div class="g-signin2" data-onsuccess="onSignIn"></div>

	<button class="flex continuewith"><img src="https://img.icons8.com/color/48/null/google-logo.png"/>Continue with Google</button>
	<button class="flex continuewith"><img src="https://img.icons8.com/ios-glyphs/30/null/mac-os.png"/>Continue with Google</button>
	<div class="line-divider"><p>or</p>
	</div>
	<label for="email">Email</label>
	<input bind:value={email} name="email" type="email" />
	<label for="password">Password</label>
	<input id="passwordInput" bind:value={password} name="password" type="password" />
	<button class="flex email-btn" on:click={logIn}>Continue with email</button>
</div>
</body>

