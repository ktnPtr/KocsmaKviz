<script>
    export let team_name = "Team name";
    export let points = 0;
  </script>
  
<tr>
    <td>{team_name}</td>
    <td>{points}</td>
</tr>

<style>
	td {
		padding: 0.75rem 1rem;
		background: #f5f5f5;
		border-radius: 0.5rem;
	}


	td:first-child {
		text-align: left;
		width: auto;
	}

	td:last-child {
		text-align: center;
		width: 3rem;
		white-space: nowrap;
	}</style>