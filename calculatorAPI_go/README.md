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
- [x] Hot loading
- [x] Read from the database + add to the response
- [] Validate JWT and authorize
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
- Why did I have to go get?
  - `go get -u github.com/lib/pq`

How to set up Air:
1. Install Air with `go get -u github.com/cosmtrek/air`
2. Add `alias air='~/bin/air'` to your ~/.zshrc
3. `curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin` or `curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh`
4. Install postgres library with `go get -u github.com/lib/pq`
5. Make sure `GO111MODULE=auto`
6. Start server with hot loading with `air -c .air.toml`
7. Make HTTP request with `http http://localhost:3003/hello`
