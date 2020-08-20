package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
)

const (
	host   = "localhost"
	port   = 5432
	dbname = "calculatordb"
)

func getUser() (username string) {
	psqlInfo := fmt.Sprintf("host=%s port=%d dbname=%s sslmode=disable",
		host, port, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	sqlStatementGetUser := `SELECT username FROM users LIMIT $1`
	err = db.QueryRow(sqlStatementGetUser, 1).Scan(&username)
	if err != nil {
		panic(err)
	}

	defer db.Close()
	return
}

func handleHello(w http.ResponseWriter, r *http.Request) {
	username := getUser()
	byte := []byte(username)

	w.WriteHeader(200)
	w.Write(byte)
}

func main() {
	http.HandleFunc("/hello", handleHello)
	http.HandleFunc("/token", handleToken)
	fmt.Println("Listening to!")
	http.ListenAndServe(":3003", nil)
}
