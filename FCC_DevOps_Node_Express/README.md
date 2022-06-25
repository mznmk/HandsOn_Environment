# FCC DevOps Node Express

Youtube  
Learn Docker - DevOps with Node.js & Express  
https://www.youtube.com/watch?v=9zUHg7xjIqQ    


## About this course

Learn the core fundamentals of Docker by building a Node/Express app with a Mongo & Redis database.  


## Environment Setup


## ⭐️ Course Contents: Part 1 ⭐️


### 0:00:14 Intro & demo express app  

[part1-1](./part1-1/)  

✅ 受講完了: 1回  

- expressをインストールする  
	```sh
	npm init -y
	npm install express
	```


### 0:04:18 Custom Images with Dockerfile  

✅ 受講完了: 1回  


### 0:10:34 Docker image layers & caching  

✅ 受講完了: 1回  

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


### 0:20:26 Docker networking opening ports  

✅ 受講完了: 1回  

- `port`を開く  
	```sh
	docker run -d -p 3000:3000 --name node-app node-app-image
	```


### 0:26:36 Dockerignore file  

✅ 受講完了: 1回  

- `.dockerignore`に無視リストを書くことで`docker`に無視させることができる  


### 0:31:46 Syncing source code with bind mounts  

✅ 受講完了: 1回  

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


### 0:45:30 Anonymous Volumes hack  

✅ 受講完了: 1回  

- ログを確認する  
	```sh
	docker logs node-app
	```


### 0:51:58 Read-Only Bind Mounts  

✅ 受講完了: 1回  

- `/app`をRead-Onlyにしてみた  
	```sh
	docker run -v $(pwd):/app:ro -v /app/node_modules -d -p 3000:3000 --name node-app node-app-image
	```


### 0:54:58 Environment variables  

✅ 受講完了: 1回  

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


### 0:59:16 loading environment variables from file  

✅ 受講完了: 1回  

- `.env`で環境変数を設定することができる  
- ファイルで環境変数を設定し`Express`のポートを3000番に設定してみる  
	```sh
	docker run -v $(pwd):/app -v /app/node_modules -d --env-file ./.env -p 3000:3000 --name node-app node-app-image
	```


### 1:01:31 Deleting stale volumes  

✅ 受講完了: 1回  

- `volume`を削除する  
	```sh
	docker volume prune
	```
- `container`削除時に`anonymous volume`も削除する  
	```sh
	docker container rm -fv
	```


### 1:04:01 Docker Compose  

[part1-2](./part1-2/)  

✅ 受講完了: 1回  

- `image`をビルドして`container`を起動する  
	```sh
	docker-compose up -d
	```
- `container`終了時に`volume`も削除する  
	```sh
	docker-compose down -v
	```


### 1:21:36 Development vs Production configs

✅ 受講完了: 1回  

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


## ⭐️ Course Contents: Part 2: Working with multiple containers ⭐️


### 1:44:47 Adding a Mongo Container

[part2](./part2/)  

✅ 受講完了: 1回  

- `mongo`コンテナを追加する  
- `docker-compose.yml`に`mongo`の設定を追加する
- `mongo`にログイン  
	```sh
	docker exec -it part2_mongo_1 mongo -u "root" -p "pass"
	```
- `mongo`でデータを操作し永続化に成功しているか確認する  
	```sh
	# show databases
	show dbs
	# use database
	use mydb
	# insert record into "books" table
	db.books.insert({"name": "harry poter"})
	# find record from "bools" table
	db.books.find()
	```
- `container`終了する(永続化のため`volume`は削除しない)  
	```sh
	docker-compose down
	```


### 2:01:48 Communicating between containers

✅ 受講完了: 1回  

- `mongoose`(ORMapper)をインストールする  
	```sh
	npm install mongoose
	```
- `container`の内部情報を確認する  
	```sh
	docker inspect part2_mongo_1
	```
- `container`の`log`を確認する  
	```sh
	docker logs part2_node-app_1
	```
- `network`を確認する  
	```sh
	docker network ls
	docker network inspect part2_node-app_1
	```
- `index.js`に`mongo`への接続コマンドを設定する  
	```sh
	mongoose
	  .connect("mongodb://root:pass@172.24.0.2:27017/?authSource=admin");
	```


### 2:12:00 Express Config file

✅ 受講完了: 1回  

- `config.js` `docker-compose.dev.yml` `docker-compose.prod.yml`に環境変数を設定することで汎用性を高める  
	```sh
	mongoose
	  .connect("mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin");
	```


### 2:21:45 Container bootup order

✅ 受講完了: 1回  

- `node-app`は`mongo`のデータがあることが前提なので依存関係を`docker-compose.yml`に設定する  
- 依存関係のある`mongo`を起動させず`node-app`だけを起動するとエラーになることを確認する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app
	```
- `mongo`を起動するとエラーが起こらないことを確認する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongo
	```


### 2:32:26 Building a CRUD application

✅ 受講完了: 1回  

- CRUDを実装した(コード参照)  
- `postman`で動作確認をする  


### 2:51:27 Sign up and Login

✅ 受講完了: 1回  

- sign up / login を実装した(コード参照)  
- `bcryptjs`をインストールする  
	```sh
	npm install bcryptjs
	```
- `bcrypt`でパスワードをハッシュ化する  
- `postman`で動作確認をする  


### 3:06:57 Authentication with sessions & Redis

✅ 受講完了: 1回  

- セッション管理用に`redis`コンテナを追加する  
- `docker-compose.yml`に`redis`の設定を追加する
- `redis`関連パッケージをインストールする(`redis`のバージョンが3でないとうまくいかないので注意)  
	```sh
	npm install redis@3 connect-redis express-session
	```
- `anonymous volume`を作り直して起動する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d -V
	```
- sessionを実装する(コード参照)  
- `redis`コンテナに入り  
	```sh
	docker exec -it part2_redis_1 bash
	```
- セッションの挙動を確認する  
	```sh
	redis-cli
	> KEYS *
	> GET "sess:xxxxxxxxxxxxxxxxxxxxxxxx"
	```


### 3:34:36 Architecture Review

✅ 受講完了: 1回  


### 3:40:48 Nginx for Load balancing to multiple node containers

✅ 受講完了: 1回  

- `node-app`を直接外部に開くのではなく、リバースプロキシーに`nginx`を導入した  
- `node-app`の`index.js` を実装した(コード参照)  
- `nginx`の`default.conf` を実装した(コード参照)  
- `docker-compose`の`docker-compose.yml` `docker-compose.dev.yml` `docker-compose.prod.yml` を実装した(コード参照)  
- 2つの`node-app`コンテナーでロードバランシングする  
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
```


### 3:54:33 Express CORS

✅ 受講完了: 1回  

- クロスオリジンのリソースにアクセスできるようにする  
- `cors`をインストールする  
	```sh
	npm install cors
	```
- 実装部分は`index.js`参照  


## ⭐️ Course Contents: Part 3: Moving to Prod ⭐️


### 3:57:44 Installing docker on Ubuntu(Digital Ocean)

[part3-1](./part3-1/)  

✅ 受講完了: 1回  

- `docker`をインストールする  
	```sh
	# https://docs.docker.com/engine/install/ubuntu/
	# https://get.docker.com/
	curl -fsSL https://get.docker.com -o get-docker.sh
	sh get-docker.sh
	docker --version
	```
- `docker-compose`をインストールする  
	```sh
	# https://github.com/docker/compose/releases
	sudo curl -L https://github.com/docker/compose/releases/download/2.6.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
	docker-compose --version
	```


### 4:03:21 Setup Git

✅ 受講完了: 1回  

- GitHubにリポジトリーを作成しリモートでアクセスできるようにしておく  


### 4:05:37 Environment Variables on Ubuntu

✅ 受講完了: 1回  

- `docker-compose.yml` `docker-compose.prod.yml` ファイルを整える  
- パスワード等は`.env`ファイルにまとめておきシステム起動時に`.bashrc`から読み込むように設定する  
	```sh
	# .bashrc
	source .env
	```


### 4:14:12 Deploying app to production server

✅ 受講完了: 1回  

- ローカルからGitHubリポジトリーにプッシュする  
- サーバーから`git pull`でプルしてくる  
- コンテナを起動する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
	```


### 4:18:57 Pushing changes the hard way

✅ 受講完了: 1回  

- ローカルから変更をGitHubリポジトリーにプッシュする  
- サーバーから`git pull`でプルしてくる  
- コンテナを起動して変更を反映させる(downしなくていける)  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
	```
- 限定した変更の反映も可能  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app
	```


### 4:25:58 Rebuilding Containers

✅ 受講完了: 1回  

- コンテナを再構築する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps node-app
	```


### 4:27:32 Dev to Prod workflow review

✅ 受講完了: 1回  


### 4:30:50 Improved Dockerhub workflow

[part3-2](./part3-2/)  

✅ 受講完了: 1回  

- DockerHubのリポジトリーにプッシュする  
	```sh
	docker image tag part3_node-app mznmk/node-app
	docker push mznmk/node-app
	```
- `node-app`イメージをプルするよう`docker-compose.yml`の設定を変更する  
- コンテナを再構築する  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
	```
- 限定した変更の反映も可能  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app
	```
- DockerHubのリポジトリーにプッシュ可能  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml push
	```
- DockerHubのリポジトリーにプル可能  
	```sh
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
	```


### 4:46:10 Automating with watchtower 

✅ 受講完了: 1回  

- `watchtower`を利用してDockerHubのイメージを用いた自動更新を行う(デプロイ環境でdocker login が必要)  
	```sh
	docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock 'containrrr/watchtower:latest' app_node-app_1
	```


### 4:56:06 Why we need an orchestrator

✅ 受講完了: 1回  


### 5:03:32 Docker Swarm


### 5:16:13 Pushing changes to Swarm stack

