//
// EPITECH PROJECT, 2020
// B-DEV-500-PAR-5-1-cardgames-guillaume.le-berre
// File description:
// main
//

package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
    "bufio"
	"os"
)

type Response struct {
	Answer string `json:"answer"`
}

/* Utils */
func getFile(path string) string {

    file, err := os.Open(path)
    if err != nil {
		log.Fatal(err)
		return ""
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
	var f string
	for scanner.Scan() {
		f += scanner.Text()
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
		return ""
	}
	return f
}

func readPassword(usr string) string {

	var result map[string]interface{}

	empJson := getFile(usr + ".json")
	json.Unmarshal([]byte(empJson), &result)

	password := result["password"].(string)
	return password
}

func isUser(user string) bool {

    _, err := os.Open(user + ".json")
    if err != nil {
        return false
    }
    return true
}

func createAnswer(ans string) Response	{

	ret := Response {
		Answer: ans,
	}

	return ret
}

/* Network Utils */
func sendAnswer(w http.ResponseWriter, r *http.Request, s string)	{

	ans, err := json.Marshal(createAnswer(s))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(ans)
}

func getBody(w http.ResponseWriter, r *http.Request) map[string]interface{} {

	var data map[string]interface{}

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return data
	}

	erro := json.Unmarshal([]byte(b), &data)
    if erro != nil {
        panic(erro)
	}

	return data
}

/* Routes */
func Login(w http.ResponseWriter, r *http.Request) {

	data := getBody(w, r)

	user := data["username"].(string)
	pass := data["password"].(string)

	if isUser(user) {
		if readPassword(user) == pass {
			sendAnswer(w, r, "ok")
			return
		}

		sendAnswer(w, r, "bad password")
		return
	}

	sendAnswer(w, r, "user doesn't exists")
}

func main() {

	http.HandleFunc("/login", Login)

	port := ":8000"

	log.Println("Starting server on address ", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		panic(err)
	}
}