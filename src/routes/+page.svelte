<script>
// @ts-nocheck

	import Card from '../components/Card.svelte'
	import CardContainer from '../components/CardContainer.svelte'
	import FunFact from '../components/FunFact.svelte'
	import PageContent from '../components/PageContent.svelte'
	import { onMount } from 'svelte'


	let fact = $state([])
	const API_KEY = "2OMPA8llopiQV013wr7mPA==Ffj93zh5ELnjE0MI";
	async function fetchFacts() {
		try {
			const res = await fetch(`https://api.api-ninjas.com/v1/facts`, {
				headers: {
					"X-Api-Key": API_KEY
				}
			});

			if (!res.ok) {
				throw new Error(`Error ${res.status}: ${await res.text()}`);
			}

			let facts = await res.json();
			fact = facts[0].fact
		} catch (err) {
			console.error(err);
			error = err.message;
		}
	}


	let events = $state([])
	let loading = $state(true)

	let showModal = $state(false)
	let selectedEvent = $state(null)

	let teamName = $state('')
	let peopleCount = $state(1)

	async function getAll() {
		loading = true

		try {
			let res = await fetch('/events', { method: 'GET' })

			if (res.status === 200) {
				events = await res.json()
			} else {
				alert('A kéréssel hiba volt')
			}
		} catch (err) {
			console.error(err)
			alert('Hiba történt a kérés közben')
		} finally {
			loading = false
		}
	}

	function handleCardClick(id) {
		selectedEvent = events.find(e => e.id === id)
		showModal = true
	}

	async function addRegister() {
		let res = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify({ team_name: teamName, event_id: selectedEvent.id, participants: peopleCount }),
		})

		showModal = false
		teamName = ''
		peopleCount = 1
	}

	onMount(() => {
		fetchFacts()
		getAll()
	})
</script>

<PageContent title="Upcoming Events">
	{#if loading}
		<h3>Loading...</h3>
	{:else}
		<CardContainer>
			{#each events as event}
				<Card id={event.id} title={event.title} date={event.date} onClick={handleCardClick} />
			{/each}
		</CardContainer>
		<FunFact fact={fact} />
	{/if}
</PageContent>

{#if showModal}
	<div class="modal-backdrop"></div>
	<div class="modal">
		<button class="close-btn" onclick={() => (showModal = false)}>✕</button>
		<h2>Register for {selectedEvent.title}</h2>
		<label>
			Team Name
			<input type="text" bind:value={teamName} placeholder="Enter team name" />
		</label>
		<label>
			Number of People
			<input type="number" min="1" bind:value={peopleCount} />
		</label>
		<button class="register-btn" onclick={addRegister}>Register</button>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(6px);
		z-index: 1000;
	}
	.modal {
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 2rem;
		border-radius: 0.75rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		width: 90%;
		max-width: 400px;
		z-index: 1001;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		font-family: 'Segoe UI', Roboto, sans-serif;
	}

	.modal h2 {
		margin: 0;
		font-size: 1.25rem;
		color: #333;
	}

	.modal label {
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		color: #555;
		gap: 0.5rem;
	}

	.modal input {
		border: none;
		border-bottom: 2px solid #ccc;
		padding: 0.5rem 0;
		font-size: 1rem;
		outline: none;
		transition: border-color 0.2s;
		background: transparent;
	}

	.modal input:focus {
		border-bottom: 2px solid black;
	}

	.register-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 0.75rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
		font-size: 1rem;
	}

	.register-btn:hover {
		background: #218838;
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		color: #666;
		transition: color 0.2s;
	}

	.close-btn:hover {
		color: #000;
	}
</style>
