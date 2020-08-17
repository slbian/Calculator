package main

import (
	"fmt"
	"net/http"
)

func handleHello(w http.ResponseWriter, r *http.Request) {
	byte := []byte("world")

	w.WriteHeader(200)
	w.Write(byte)
}

func main() {
	http.HandleFunc("/hello", handleHello)

	fmt.Println("Listening to!")
	http.ListenAndServe(":3003", nil)
}
