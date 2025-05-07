<script>
	import NavBar from '../components/NavBar.svelte'
	import Container from '../components/Container.svelte'
	
	let { children } = $props();
</script>

<main class="page">
	<Container>
		<NavBar />
			{@render children()}
	</Container>
</main>

<style>
	:global(body, html) {
		margin: 0;
		padding: 0;
		height: 100%;
		font-family: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;
		background-color: #e8ecf0;
		color: #1a1a1a;
	}

	.page {
		position: relative;
		min-height: 100vh;
		padding: 2rem;
		box-sizing: border-box;
	}

</style>
