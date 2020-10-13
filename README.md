# Logitech-Harmony-Http

> A simple http warpper to use the logitech harmony websockets apis

Prerequisite:

* Nodejs > 10.X
* npm 

Usage:

```sh 
npm i
export HUB_HOST=192.168.X.XXX
npm start
```

## Environment variables

| *Variable*       | *Description*                                                        | *Default* |
|:-----------------|:---------------------------------------------------------------------|:----------|
| `HUB_HOST`       | The IP of your haromny hub                                           |           |
| `HUB_REMOTE_ID`  | The remote id of your harmony, if not set script will get it for you |           |
| `PORT`           | port of the http server                                              | 8080      |


Then let's say you have a device named `ac`

You will be able to controle it with the following api :

```
curl --request POST \
  --url http://localhost:8080/ac/action \
  --header 'content-type: application/json' \
  --data '{
    "type": "os"
  }'
```
