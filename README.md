# Projekt Dokumentáció

## Célja

Ez a projekt egy eseménykezelő és pontszámláló alkalmazás, amely lehetővé teszi:

- csapatok regisztrálását eseményekre,
- pontszámok nyilvántartását szezonokra bontva,
- adminisztrációs oldalt az adatok kezelésére.

## Megvalósítás

- **Frontend**: SvelteKit
- **Backend**: SvelteKit
- **Adattárolás**: SQLite

## Kódbázis szerkezete

```
src/
├── components/         → Komponensek
├── lib/                → SQLite
├── routes/             → Oldalak és API végpontok
│   ├── +page.svelte    → Főoldal
│   ├── standings/      → Ranglista Oldal
│   ├── admin/          → Admin Oldal
│   ├── events/         → API végpontok eseményekhez
│   └── register/       → API regisztrációhoz
tmp/
├── events.db           → Események adatbázisa
├── points.db           → Csapatpontok adatbázisa
├── register.db         → Nevezések adatbázisa
```

## API-k leírása

### `GET /events`

Lekéri az összes eseményt.

### `POST /events`

Létrehoz egy új eseményt.

```json
{
  "title": "New Event",
  "date": "2025-05-07T15:00:00"
}
```

### `DELETE /events`

Egy esemény törlése:

```json
{
  "id": 3
}
```


### `GET /register`

Visszaadja az összes regisztrációt.

### `POST /register`

Új regisztráció hozzáadás:

```json
{
  "team_name": "Team A",
  "event_id": 1,
  "participants": 4
}
```

### `DELETE /register`

Egy regisztráció törlése:

```json
{
  "id": 3
}
```

### `GET /standings`

Visszaadja az összes csapat pontját.

### `POST /standings`

Új csapat hozzáadása:

```json
{
  "teamName": "Team A",
  "seasonID": 2025
}
```

### `PATCH /standings`

Pont módosítása:

```json
{
  "id": 2,
  "points": 42
}
```

### `DELETE /standings`

Csapat törlése:

```json
{
  "id": 3
}
```

## Tárolt adatok

### `events.db` – események

| id          | title   | date     |
| ----------- | ------- | -------- |
| azonosító | szöveg | időpont |

### `points.db` – pontok

| id          | team_name | points | season |
| ----------- | --------- | ------ | ------ |
| azonosító | szöveg   | szám  | szám  |

### `register.db` – regisztrációk

| id          | team_name | event_id | participants |
| ----------- | --------- | -------- | ------------ |
| azonosító | szöveg   | szám    | szám        |

## Kommunikáció módja

A frontend és a backend között a kommunikáció REST API-hívásokkal történik JSON formátumban.
