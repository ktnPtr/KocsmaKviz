<script>
	// @ts-nocheck
	import PageContent from '../../components/PageContent.svelte'

	import { onMount } from 'svelte'
	import PointsTable from '../../components/PointsTable.svelte'

	let points = $state([])
	let seasons = $state([])
	let selectedSeason = $state('')

	let loading = $state(true)

	async function getAll() {
		loading = true

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
			loading = false
		}
	}

	onMount(() => {
		getAll()
	})
</script>

<PageContent title="Standings">
	{#if loading}
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

		<PointsTable {points} {selectedSeason} />
	{/if}
</PageContent>

<style>
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
</style>
