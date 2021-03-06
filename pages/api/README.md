### REST API

## Matches

### Post a list matches across (a set of) competitions from football-data.org.

`POST` /api/matches

#### Responses

- `201`: Success. All the matches were saved at Firebase.
- `400`: Error. Something went wrong in the external API request.

### Get all matches.

`GET` /api/matches

#### Responses

- `200`: Success. Return all the matches of the current day.
- `400`: Error. Bad request.

## Teams

### Get all teams.

`GET` /api/teams

#### Responses

- `200`: Success. Return all teams in the database.
- `400`: Error. Bad request.

### Get a team.

`GET` /api/teams/{id}

#### Responses

- `200`: Success. Return the a single team.
- `400`: Error. Bad request.
