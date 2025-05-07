import type {RequestEvent} from "@sveltejs/kit";
import { points } from "$lib/points";

export async function GET (event: RequestEvent) {
	let data = await points.all("SELECT * FROM seasons");

	return new Response(JSON.stringify(data), {status: 200});
}

export async function PATCH (event: RequestEvent) {
	let reg = await event.request.json();

	await points.run(`UPDATE seasons SET points = ? WHERE id = ?`, reg.points, reg.id);

	return new Response("", {status: 200});
}

export async function POST (event: RequestEvent) {
	let reg = await event.request.json();

	await points.run(`INSERT INTO seasons (team_name, season, points) VALUES (?, ?, ?)`, reg.teamName, reg.seasonID, 0);
	return new Response("", {status: 200});
}

export async function DELETE (event: RequestEvent) {
	let id = await event.request.json();

	await points.run(`DELETE FROM seasons WHERE id = ?`, id.id);

	return new Response("", {status: 200});
}