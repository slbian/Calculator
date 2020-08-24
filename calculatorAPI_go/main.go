package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

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

func getUsers() (users []User) {
	psqlInfo := fmt.Sprintf("host=%s port=%d dbname=%s sslmode=disable",
		host, port, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	sqlStatementGetUsers := `SELECT id, username FROM users`
	rows, err := db.Query(sqlStatementGetUsers)
	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.Id, &user.Username)
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
	rows, err = db.Query(sqlStatementGetExecutions)

	// err := db.Exec(fmt.Sprintf("INSERT INTO %s VALUES ($1)", quoted), data)

	if err != nil {
		panic(err)
	}

	m := make(map[int]int)

	for i := range users {
		userId := users[i].Id
		m[userId] = 0
	}

	for rows.Next() {
		var userScore UserScore
		fmt.Println(rows)
		err := rows.Scan(&userScore.UserId, &userScore.Equation)
		if err != nil {
			panic(err)
		}
		m[userScore.UserId] += 1 // call to our calculation
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
// get all executions
// parse the string
// + for - and - for +
// execute
// length of the result
// add it to some total for that user

func handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	text := "world"
	byte := []byte(text)

	w.WriteHeader(200)
	w.Write(byte)
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
	users := getUsers()
	bytes, err := json.Marshal(users)
	if err != nil {
		panic(err)
	}

	w.WriteHeader(200)
	w.Write(bytes)
}

func main() {
	http.HandleFunc("/hello", handleHealthCheck)
	// http.HandleFunc("/token", handleToken)
	http.HandleFunc("/users", handleUsers)
	fmt.Println("Listening on 3003")
	http.ListenAndServe(":3003", nil)
}
