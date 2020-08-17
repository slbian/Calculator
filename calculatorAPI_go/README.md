# Calculator Golang API

Run in dev mode with hot reloading:
```air -c .air.toml```

_____

Upside down world features
- toggle that "inverts" your score
  - every execution in your history is re-calculated with the inverse operation
  - multiply by some random int for every operation
  - store seed in the database (all users use this seed)
  - "2 games"
- dark mode (persist mode)
- scoreboard reflects dark mode users
- notification that another user switched modes

To do:
- [x] Massive seed script
- [x] Make a Go API with a hello world endpoint
- [] hot loading
- [] Read from the database + add to the response
- [] Come up with the upside world calculation + rules
  - [] syncronous
  - [] reimplement it using go routines
  - [] keep both around for benchmarking


Things that need to change:
  - [] My Score     GET /users/active
  - [] Scoreboard   GET /users
  - [] Execution   POST /executions


UI:
- [] Toggle
  - [] Different appearance
  - [] Different base URL for 3 above requests



Notes:
- Air for hot reloads https://github.com/cosmtrek/air
