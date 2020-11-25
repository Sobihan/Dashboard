# Dahsboard Server

Dashboard protocol for client

# Protocols

# Login

HTTP request to login an user


Client ask to:
```
POST http://localhost:8080/login
```
Body JSON format:
```json
{
    "username": "$username",
    "password": "$password"
}
```


Server answer:
```json
{
    "answer": "$answer"
}
```

Possible values for ``$answer``
```
"ok" : the connection is done
"bad password" : the password given for the user is bad
"user doesn't exists" : the username doesn't exists in the database
```

# CreateAccount

HTTP request to create an account


Client ask to:
```
POST http://localhost:8080/createAccount
```
Body JSON format:
```json
{
    "username": "$username",
    "password": "$password"
}
```


Server answer:
```json
{
    "answer": "$answer"
}
```

Possible values for ``$answer``
```
"ok" : the account has been created
"request error" : missing username or password
"null password" : the password is null
"username already used" : this username is already used
```

# epoch

HTTP request to get the current server time in EPoch Unix Time Stamp Format


Client ask to:
```
GET http://localhost:8080/epoch
```

Server answer:
```json
{
    "answer": "$answer"
}
```

Possible values for ``$answer``
```
epoch : value of the current server time in Epoch Unix Time Stamp Format
```

# host

HTTP request to get the IP of the client performing the HTTP request


Client ask to:
```
GET http://localhost:8080/host
```

Server answer:
```json
{
    "answer": "$answer"
}
```

Possible values for ``$answer``
```
IP : value of the current server time in Epoch Unix Time Stamp Format
```


# about

HTTP request to get the file about.json


Client ask to:
```
GET http://localhost:8080/about.json
```

Server answer:
```json
{
    // data
}
```

Possible values for ``$answer``
```
json file set, with dynamic value on "host", "current_time"
```


# setConfig

HTTP request to set the current configuration of an user


Client ask to:
```
POST http://localhost:8080/setConfig
```
Body JSON format:


vars:
- "username" : username to set the configuration
- "data" : configuration
```json
{
    "username": "$username",
    "data": {
        // data
    }
}
```


Server answer:
```json
{
    "answer": "$answer"
}
```

Possible values for ``$answer``
```
"ok" : the file has beed writen
```


# getConfig

HTTP request to get the current configuration of an user


Client ask to:
```
POST http://localhost:8080/getConfig
```
Body JSON format:
```json
{
    "username": "$username"
}
```


Server answer:
```json
{
    //data
}
```
