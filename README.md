# Dependencies
* [Prisma_ORM](https://www.prisma.io/docs/get-started/01-setting-up-prisma-existing-database-JAVASCRIPT-a003/)
* [Docker: Prisma_Image](https://hub.docker.com/r/prismagraphql/prisma/)
* [Docker: MySQL_Image](https://hub.docker.com/_/mysql)

## Will add node into docker-compose.yml soon

## Docker
Steps are a bit easier on Unix

- `Docker will have issues on Windows if not using Git Bash || WSL`
- `use bcryptjs not bcrypt package to avoid elf header error with docker`

#
### Before running `docker-compose up`

- Create `.env` file from `.env.example` file
- Container ports can be changed in docker-compose.yml file
#
`Unix`
```
docker-compose up -d
```
#
`Windows`


### Install `Git Bash || (WSL)` to run the above command
- First install wsl (Windows Subsystem for Linux) PS: 'Make sure to go to direct links inside the article for latest commands to use not direct commands from article' `https://docs.microsoft.com/en-us/windows/wsl/install-win10`

- Sync up windows docker and wsl docker to work together *IF NEEDED* `https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly`

```
docker-compose up -d
```
#
### `Check that containers are running`

```
docker ps
```
#

## Prisma
- Make sure `'require('dotenv').config()'` is at top of index file for env vars in config.js file to be used
### `If no prisma.yml file`
```
prisma init
```
- Add generated prisma folder path in prisma.yml
```
generate:
  - generator: javascript-client
    output: ./generated/prisma-client/
```
### Create prisma models in the `prisma/*.prisma` file format
- Add newly created models into `prisma.yml` file under `datamodels`
```
datamodel:
  - ./prisma/datamodel.prisma
```
### `RUN`
```
prisma deploy
```
#
### `test db connection func`
- run `bin/dbScripts.js` function by itself using `node ./bin/dbScripts.js`
- Or inside of `bin/start.js` file along with starting `server`
```
main()
    .then(() => Server.start(port))
    .catch(e => console.error(e));
```

- View changes directly through Admin route
### `http://localhost:${PRISMA_PORT}/_admin`

#

### Stop Containers
```
docker-compose stop
```

### Hard Reset containers
```
docker-compose kill
docker-compose down
docker-compose up -d
```

