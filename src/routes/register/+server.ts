import type {RequestEvent} from "@sveltejs/kit";
import { register } from "$lib/register";

export async function GET (event: RequestEvent) {
	let data = await register.all("SELECT * FROM registrations");

	return new Response(JSON.stringify(data), {status: 200});
}

export async function POST (event: RequestEvent) {
	let reg = await event.request.json();

	await register.run(`INSERT INTO registrations (team_name, event_id, participants) VALUES (?, ?, ?)`, reg.team_name, reg.event_id, reg.participants);

	return new Response("", {status: 200});
}

export async function DELETE (event: RequestEvent) {
	let reg = await event.request.json();

	await register.run(`DELETE FROM registrations WHERE id = ?`, reg.id);

	return new Response("", {status: 200});
}