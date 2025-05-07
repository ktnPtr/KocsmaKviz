<script>
	// @ts-nocheck
	import PageContent from '../../components/PageContent.svelte'
	import { DatePicker } from 'date-picker-svelte'
	let date = $state()

	import { onMount } from 'svelte'

	let regs = $state([])
	let eventIDs = $state([])
	let selectedEventID = $state('')
	let loadingRegs = $state(true)

	let points = $state([])
	let seasons = $state([])
	let selectedSeason = $state('')
	let loadingPoints = $state(true)
	let newTeamName = $state('')
	let newSeason = $state(2025)

	let events = $state([])
	let loadingEvents = $state(true)
	let newEventName = $state('')

	async function getAllRegs() {
		loadingRegs = true

		try {
			let res = await fetch('/register', { method: 'GET' })

			if (res.status === 200) {
				regs = await res.json()
				eventIDs = Array.from(new Set(regs.map(t => t.event_id))).sort((a, b) => b - a)
				selectedEventID = eventIDs[0]
			} else {
				alert('A kéréssel hiba volt')
			}
		} catch (err) {
			console.error(err)
			alert('Hiba történt a kérés közben')
		} finally {
			loadingRegs = false
		}
	}

	async function getAllPoints() {
		loadingPoints = true

		try {
			let res = await fetch('/standings', { method: 'GET' })

			if (res.status === 200) {
				points = await res.json()
				seasons = Array.from(new Set(points.map(t => t.season))).sort((a, b) => b - a)
				selectedSeason = seasons[0]
			} else {
				alert('A kéréssel hiba volt')
			}
		} catch (err) {
			console.error(err)
			alert('Hiba történt a kérés közben')
		} finally {
			loadingPoints = false
		}
	}

	async function getAllEvents() {
		loadingEvents = true

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
			loadingEvents = false
		}
	}

	async function deleteRegister(id) {
		let res = await fetch('/register', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
		})
		getAllRegs()
	}

	async function deletePoints(id) {
		let res = await fetch('/standings', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
		})
		getAllPoints()
	}

	async function deleteEvents(id) {
		let res = await fetch('/events', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
		})
		getAllEvents()
	}

	async function updatePoints(id, points) {
		let res = await fetch('/standings', {
			method: 'PATCH',
			body: JSON.stringify({ id: id, points: points }),
		})
		getAllPoints()
	}

	async function addTeam(name, season) {
		let res = await fetch('/standings', {
			method: 'POST',
			body: JSON.stringify({ teamName: name, seasonID: season }),
		})
		getAllPoints()
	}

	async function addEvent(name, date) {
		let res = await fetch('/events', {
			method: 'POST',
			body: JSON.stringify({ title: name, date: date }),
		})
		getAllEvents()
	}

	onMount(() => {
		getAllRegs()
		getAllPoints()
		getAllEvents()
	})
</script>

<PageContent title="Registrations">
	{#if loadingRegs}
		<h3>Loading...</h3>
	{:else}
		<div class="season-select">
			<label for="season">Event:</label>
			<select id="season" bind:value={selectedEventID}>
				{#each eventIDs as eventID}
					<option value={eventID}>{eventID}</option>
				{/each}
			</select>
		</div>

		<table>
			<thead>
				<tr>
					<th>Team Name</th>
					<th>Participants</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each regs.filter(p => p.event_id === selectedEventID) as team}
					<tr>
						<td>{team.team_name}</td>
						<td>{team.participants}</td>
						<td>
							<button class="x-btn" onclick={() => deleteRegister(team.id)}>✕</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</PageContent>

<PageContent title="Points">
	{#if loadingPoints}
		<h3>Loading...</h3>
	{:else}
		<div class="season-select">
			<label for="season">Season:</label>
			<select id="season" bind:value={selectedSeason}>
				{#each seasons as season}
					<option value={season}>{season}</option>
				{/each}
			</select>
		</div>

		<table>
			<thead>
				<tr>
					<th>Team Name</th>
					<th>Points</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each points.filter(p => p.season === selectedSeason) as team}
					<tr>
						<td>{team.team_name}</td>
						<td><input type="number" min="0" bind:value={team.points} onchange={() => updatePoints(team.id, team.points)} class="points-input" /></td>
						<td>
							<button class="x-btn" onclick={() => deletePoints(team.id)}>✕</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="add-form">
			<input type="text" bind:value={newTeamName} placeholder="Team name" class="text-input" />

			<input type="number" bind:value={newSeason} placeholder="Season" class="number-input" min="0" />

			<button class="add-btn" onclick={() => addTeam(newTeamName, newSeason)}>Add</button>
		</div>
	{/if}
</PageContent>

<PageContent title="Events">
	{#if loadingEvents}
		<h3>Loading...</h3>
	{:else}
		<table class="event-table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Date</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each events as event}
					<tr>
						<td>{event.title}</td>
						<td>{event.date}</td>
						<td>
							<button class="x-btn" onclick={() => deleteEvents(event.id)}>✕</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="add-event-form">
			<input type="text" bind:value={newEventName} placeholder="New event title" class="text-input" />
			<DatePicker bind:value={date} timePrecision="minute" />
			<button class="add-btn" onclick={() => addEvent(newEventName, date)}>Add</button>
		</div>
	{/if}
</PageContent>

<style>
	input {
		width: 10rem; /* narrower */
		font-size: 1rem;
		padding: 0.4rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem; /* rounded box */
		background: #fafafa;
		text-align: center;
		outline: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	input:focus {
		border-color: #6200ea;
		box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.2);
		background: #fff;
	}

	.points-input {
		width: 2.5rem;
		padding: 0.25rem;
		font-size: 0.9rem;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 0.375rem;
		background: #fafafa;
		outline: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.points-input:focus {
		border-color: #6200ea;
		box-shadow: 0 0 0 1px rgba(98, 0, 234, 0.2);
		background: #fff;
	}

	.x-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		margin: 0 auto;
		padding: 0;
		border: none;
		border-radius: 0.25rem;
		background: none;
		color: #999;
		font-size: 1.1rem;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.x-btn:hover {
		color: #e00;
		background: rgba(0, 0, 0, 0.05);
	}

	.add-btn {
	padding: 0.5rem 1.25rem;
	background-color: #6366f1;
	color: #fff;
	border: none;
	border-radius: 0.5rem;
	font-size: 0.95rem;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s;
}

.add-btn:hover {
	background-color: #4f46e5;
}

	.season-select {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
	}

	.season-select label {
		font-weight: 500;
		font-size: 1rem;
	}

	select {
		padding: 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
	}

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 1rem 0.5rem;
		table-layout: fixed;
	}

	th,
	td {
		padding: 0.75rem 1rem;
		background: #f5f5f5;
		border-radius: 0.5rem;
		width: 7rem;
		text-align: center;
	}

	td:first-child,
	th:first-child {
		width: auto;
		text-align: left;
	}


	td:last-child,
	th:last-child {
		width: 3rem;
		text-align: center;
	}

</style>
