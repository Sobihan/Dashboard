//
// EPITECH PROJECT, 2020
// B-DEV-500-PAR-5-1-cardgames-guillaume.le-berre
// File description:
// main
//

package main

import (
    "time"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
    "bufio"
	"os"
	"strconv"
	"fmt"
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

/* Server Logic */
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

func isFile(path string) bool {

    _, err := os.Open(path)
    if err != nil {
        return false
    }
    return true
}

func createCredentials(username string, password string) {

    credentials := "{\n\t\"username\": \"" + username + "\",\n" + "\t\"password\": \"" + password + "\"\n}"

    f, err := os.Create(username + ".json")
    if err != nil {
        return
    }

	l, err := f.WriteString(credentials)
	_ = l
    if err != nil {
        f.Close()
        return
    }

    err = f.Close()
    if err != nil {
        return
    }
}

func getEpoch() string {

	data := time.Now().Unix()

	datastr := strconv.FormatInt(data, 10)
	return datastr
}

func getClientIP(r *http.Request) string {

	IPAddress := r.Header.Get("X-Real-Ip")

	if IPAddress == "" {
		IPAddress = r.Header.Get("X-Forwarded-For")
    }

	if IPAddress == "" {
        IPAddress = r.RemoteAddr
	}

	return IPAddress
}

/* Network Utils */

func createAnswer(ans string) Response	{

	ret := Response {
		Answer: ans,
	}

	return ret
}

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
	_ = erro

	return data
}

/* Routes */
func Login(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	data := getBody(w, r)

	if data["username"] == nil || data["password"] == nil || data == nil {
		sendAnswer(w, r, "request error")
		return
	}

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

func CreateAccount(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	data := getBody(w, r)

	if data["username"] == nil || data["password"] == nil {
		sendAnswer(w, r, "request error")
		return
	}

	user := data["username"].(string)
	pass := data["password"].(string)

	if pass == "" {
		sendAnswer(w, r, "null password")
		return
	}

	if isUser(user) || isUser(user + "Config") {
		sendAnswer(w, r, "username already used")
		return
	}

	createCredentials(user, pass)
	sendAnswer(w, r, "ok")
}

func epoch(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	sendAnswer(w, r, getEpoch())
}

func host(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	sendAnswer(w, r, getClientIP(r))
}

func about(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if isFile("about.json") {
		content := getFile("about.json")

		var jsonMap map[string]interface{}

		json.Unmarshal([]byte(content), &jsonMap)

		jsonMap["customer"].(map[string]interface{})["host"] = getClientIP(r)
		jsonMap["server"].(map[string]interface{})["current_time"] = getEpoch()

		ans, err := json.Marshal(jsonMap)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		w.Header().Set("content-type", "application/json")
		w.Write(ans)
		return
	}

	sendAnswer(w, r, "server error")

}

func setConfig(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	body := getBody(w, r)

	if body == nil {
		sendAnswer(w, r, "request error")
		return
	}

	user := body["username"]
	data := body["data"]

	out, errno := json.Marshal(data)
	if errno != nil {
		http.Error(w, errno.Error(), 500)
		return
	}

	if isFile(user.(string) + "Config.json") {
		e := os.Remove(user.(string) + "Config.json")
		if e != nil {
			log.Fatal(e)
		}
	}

    f, err := os.Create(user.(string) + "Config.json")
    if err != nil {
        fmt.Println(err)
        return
    }

	l, err := f.WriteString(string(out))
	_ = l
    if err != nil {
        fmt.Println(err)
        f.Close()
        return
    }

    err = f.Close()
    if err != nil {
        fmt.Println(err)
        return
    }

	sendAnswer(w, r, "ok")
}

func getConfig(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	data := getBody(w, r)

	if data["username"] == nil {
		sendAnswer(w, r, "request error")
		return
	}

	user := data["username"].(string)

	if !isFile(user + "Config.json") {

		if isFile("about.json") {
			content := getFile("about.json")

			var jsonMap map[string]interface{}

			json.Unmarshal([]byte(content), &jsonMap)

			jsonMap["customer"].(map[string]interface{})["host"] = getClientIP(r)
			jsonMap["server"].(map[string]interface{})["current_time"] = getEpoch()

			ans, err := json.Marshal(jsonMap)
			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}

			w.Header().Set("content-type", "application/json")
			w.Write(ans)
			return
		}
		sendAnswer(w, r, "Missing file")
		return
	}

	content := getFile(user + "Config.json")

	var jsonMap map[string]interface{}

	json.Unmarshal([]byte(content), &jsonMap)

	jsonMap["customer"].(map[string]interface{})["host"] = getClientIP(r)
	jsonMap["server"].(map[string]interface{})["current_time"] = getEpoch()

	ans, err := json.Marshal(jsonMap)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(ans)
	return
}

/* Core */
func main() {

	http.HandleFunc("/login", Login)
	http.HandleFunc("/createAccount", CreateAccount)

	http.HandleFunc("/setConfig", setConfig)
	http.HandleFunc("/getConfig", getConfig)

	http.HandleFunc("/epoch", epoch)
	http.HandleFunc("/host", host)

	http.HandleFunc("/about.json", about)

	port := ":8000"

	log.Println("Starting server on address ", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		panic(err)
	}
}
