# FCC DevOps Node Express

Youtube  
Learn Docker - DevOps with Node.js & Express  
https://www.youtube.com/watch?v=9zUHg7xjIqQ    


## About this course

Learn the core fundamentals of Docker by building a Node/Express app with a Mongo & Redis database.  


## Environment Setup


## ⭐️ Course Contents: Part 1 ⭐️


### 0:00:14 Intro & demo express app  

- expressをインストールする  
	```sh
	npm init -y
	npm install express
	```

✅ 受講完了: 1回  


### 0:04:18 Custom Images with Dockerfile  

✅ 受講完了: 1回  


### 0:10:34 Docker image layers & caching  

- `image`を作成する  
	```sh
	docker build -t node-app-image .
	```
- `container`を起動する
	```sh
	docker run -d --name node-app node-app-image
	```
- `container`に入る  
	```sh
	docker exec -it node-app bash
	```

✅ 受講完了: 1回  


### 0:20:26 Docker networking opening ports  

- `port`を開く  
	```sh
	docker run -d -p 3000:3000 --name node-app node-app-image
	```

✅ 受講完了: 1回  


### 0:26:36 Dockerignore file  

- `.dockerignore`に無視リストを書くことで`docker`に無視させることができる  

✅ 受講完了: 1回  


### 0:31:46 Syncing source code with bind mounts  

- 開発用に`nodemon`をインストールする  
	```sh
	npm install nodemon --save-dev
	```
- `package.json`を編集する  
	```json
	"scripts": {
		"start": "node index.js",
		"dev": "nodemon index.js"
	},
	```
- カレントディレクトリーをマウントする  
	```sh
	docker run -v $(pwd):/app -d -p 3000:3000 --name node-app node-app-image
	```

✅ 受講完了: 1回  


### 0:45:30 Anonymous Volumes hack  

- ログを確認する  
	```sh
	docker logs node-app
	```

✅ 受講完了: 1回  


### 0:51:58 Read-Only Bind Mounts  

- `/app`をRead-Onlyにしてみた  
	```sh
	docker run -v $(pwd):/app:ro -v /app/node_modules -d -p 3000:3000 --name node-app node-app-image
	```

✅ 受講完了: 1回  


### 0:54:58 Environment variables  

- コマンドで環境変数を設定し`Express`のポートを4000番に設定してみる  
	```sh
	docker run -v $(pwd):/app -v /app/node_modules -d --env PORT=4000 -p 3000:4000 --name node-app node-app-image
	```
- コンテナ内で`printenv`  
	```sh
	printenv
	:
	PORT=4000
	:
	```

✅ 受講完了: 1回  


### 0:59:16 loading environment variables from file  

- `.env`で環境変数を設定することができる  
- ファイルで環境変数を設定し`Express`のポートを3000番に設定してみる  
	```sh
	docker run -v $(pwd):/app -v /app/node_modules -d --env-file ./.env -p 3000:3000 --name node-app node-app-image
	```

✅ 受講完了: 1回  


### 1:01:31 Deleting stale volumes  

- `volume`を削除する  
	```sh
	docker volume prune
	```
- `container`削除時に`anonymous volume`も削除する  
	```sh
	docker container rm -fv
	```

✅ 受講完了: 1回  


### 1:04:01 Docker Compose  

- `image`をビルドして`container`を起動する  
	```sh
	docker-compose up -d
	```
- `container`終了時に`volume`も削除する  
	```sh
	docker-compose down -v
	```

✅ 受講完了: 1回  


### 1:21:36 Development vs Production configs

- `docker-compose`の設定ファイルを分割し、開発環境用と本番環境用で使い分けれるようにする  
	```sh
	# development
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	# production
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
	```
- `container`に入る  
	```sh
	docker-compose exec node-app bash
	```

✅ 受講完了: 1回  


## ⭐️ Course Contents: Part 2: Working with multiple containers ⭐️


### 1:44:47 Adding a Mongo Container

✓ 受講途中:  


### 2:01:48 Communicating between containers


### 2:12:00 Express Config file


### 2:21:45 Container bootup order


### 2:32:26 Building a CRUD application


### 2:51:27 Sign up and Login


### 3:06:57 Authentication with sessions & Redis


### 3:34:36 Architecture Review


### 3:40:48 Nginx for Load balancing to multiple node containers


### 3:54:33 Express CORS


## ⭐️ Course Contents: Part 3: Moving to Prod ⭐️


### 3:57:44 Installing docker on Ubuntu(Digital Ocean)


### 4:03:21 Setup Git


### 4:05:37 Environment Variables on Ubuntu


### 4:14:12 Deploying app to production server


### 4:18:57 Pushing changes the hard way


### 4:25:58 Rebuilding Containers


### 4:27:32 Dev to Prod workflow review


### 4:30:50 Improved Dockerhub workflow


### 4:46:10 Automating with watchtower 


### 4:56:06 Why we need an orchestrator


### 5:03:32 Docker Swarm


### 5:16:13 Pushing changes to Swarm stack

