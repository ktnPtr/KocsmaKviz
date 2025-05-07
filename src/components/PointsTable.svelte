<script>
// @ts-nocheck
	import TableRow from '../components/TableRow.svelte'
    export let points;
    export let selectedSeason;
</script>

<table>
    <thead>
        <tr>
            <th>Team Name</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        {#each points.filter(p => p.season === selectedSeason) as team}
        
            <TableRow team_name={team.team_name} points={team.points}/>
        {/each}
    </tbody>
</table>

<style>
    

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 1rem 0.5rem;
		table-layout: fixed;
	}

	th{
		padding: 0.75rem 1rem;
		background: #f5f5f5;
		border-radius: 0.5rem;
	}

	th {
		background: #e0e0e0;
		font-weight: 600;
	}

	th:first-child {
		text-align: left;
		width: auto;
	}

	th:last-child {
		text-align: center;
		width: 3rem;
		white-space: nowrap;
	}
</style>