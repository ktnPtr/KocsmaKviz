import type {RequestEvent} from "@sveltejs/kit";
import {events} from "$lib/events";

export async function GET (event: RequestEvent) {
	let data = await events.all("SELECT * FROM events");

	return new Response(JSON.stringify(data), {status: 200});
}

export async function POST (event: RequestEvent) {
	let evnt = await event.request.json();
	evnt.date = evnt.date.replace(evnt.date.charAt(10), ' ');
	evnt.date = evnt.date.slice(0, -5); 
	await events.run(`INSERT INTO events (title, date) VALUES (?, ?)`, evnt.title, evnt.date);

	return new Response("", {status: 200});
}

export async function DELETE (event: RequestEvent) {
	let id = await event.request.json();

	await events.run(`DELETE FROM events WHERE id = ?`, id.id);

	return new Response("", {status: 200});
}