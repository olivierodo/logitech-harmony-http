# Logitech-Harmony-Http

> A simple http warpper to use the logitech harmony websockets apis

Prerequisite:

* Nodejs > 10.X
* npm 

Usage:

```sh 
npm i
export HUB_HOST= 192.168.X.XXX
npm start
```

## Environment variables

| *Variable*       | *Description*                                                        | *Default* |
|:-----------------|:---------------------------------------------------------------------|:----------|
| `HUB_HOST`       | The IP of your haromny hub                                           |           |
| `HUB_REMOTE_ID`  | The remote id of your harmony, if not set script will get it for you |           |
| `PORT`           | port of the http server                                              | 8080      |


