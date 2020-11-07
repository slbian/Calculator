package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/Knetic/govaluate"
	_ "github.com/Knetic/govaluate"
	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

const (
	host   = "localhost"
	port   = 5432
	dbname = "calculatordb"
)

type User struct {
	Id       int `json:"id"`
	Username string
	Score    int
}

type UserScore struct {
	UserId   int    `db:"userId" json:"userId"`
	Equation string `db:"equation" json:"equation"`
}

func getUsersBenchmark() (users []User) {
	psqlInfo := fmt.Sprintf("host=%s port=%d dbname=%s sslmode=disable",
		host, port, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	sqlStatementGetUsers := `SELECT id, username FROM users`
	rowIterator, err := db.Query(sqlStatementGetUsers)
	if err != nil {
		panic(err)
	}

	for rowIterator.Next() {
		var user User
		err := rowIterator.Scan(&user.Id, &user.Username)
		if err != nil {
			panic(err)
		}

		users = append(users, user)
	}

	// mutate for every execution
	// convert to slice + return

	uCol := pq.QuoteIdentifier("userId")
	eCol := pq.QuoteIdentifier("equation")

	// sqlStatementGetExecutions := `SELECT $1, $2 FROM users`
	sqlStatementGetExecutions := fmt.Sprintf(`SELECT %s, %s FROM executions`, uCol, eCol)
	rowIterator, err = db.Query(sqlStatementGetExecutions) // TODO: query arguments

	if err != nil {
		panic(err)
	}

	m := make(map[int]int)

	for i := range users {
		userId := users[i].Id
		m[userId] = 0
	}

	for rowIterator.Next() {
		var userScore UserScore
		err := rowIterator.Scan(&userScore.UserId, &userScore.Equation)
		if err != nil {
			panic(err)
		}
		m[userScore.UserId] += handleUpsideDownEquation(userScore.Equation)
	}

	for i := range users {
		userId := users[i].Id
		users[i].Score = m[userId]
	}

	defer db.Close()
	return
}

// tasks
// Do upside down world calculation for all users in scoreboard
// for user:
//   get all executions
//   parse the string
//   + for - and - for +
//   execute
//   length of the result
//   add it to some total for that user
// time the request - javascript tool - for browser too
// cleanup + organization of code
//   think about error handling strategy

func handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	text := "world"
	byte := []byte(text)

	w.WriteHeader(200)
	w.Write(byte)
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
	// switch case based off query param
	var users []User
	params := r.URL.Query()["mode"]
	if params == nil || params[0] != "benchmark" {
		fmt.Println("bad mode")
		w.WriteHeader(400)
		w.Write([]byte("Bad Request"))
	}
	switch params[0] {
	case "benchmark":
		users = getUsersBenchmark()
	}
	bytes, err := json.Marshal(users)
	if err != nil {
		panic(err)
	}

	w.WriteHeader(200)
	w.Write(bytes)
}

func handleUpsideDownEquation(equation string) (score int) {
	var s string
	s = strings.Replace(equation, "+", "foo", -1)
	s = strings.Replace(equation, "-", "+", -1)
	s = strings.Replace(equation, "foo", "-", -1)

	expression, _ := govaluate.NewEvaluableExpression(s)
	r, _ := expression.Eval(nil)
	res := int(r.(float64))

	score = len(string(res))
	return
}

func main() {
	http.HandleFunc("/hello", handleHealthCheck)
	// http.HandleFunc("/token", handleToken)
	http.HandleFunc("/users", handleUsers)
	fmt.Println("Listening on 3003")
	http.ListenAndServe(":3003", nil)
}
