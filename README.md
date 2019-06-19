# Dependencies
* [Docker](#markdown-header-docker)
* [MySQL](#markdown-header-mysql)
* [Sequelize](#markdown-header-sequelize)

## Docker MySQL quick startup
Steps are easier on Unix

- `Sequelize will have issues on Windows if not using Git Bash || WSL`
- `use bcryptjs not bcrypt package to avoid elf header error with docker`

#
### Before running `docker-compose up`

- `In terminal navigate to server folder and run command:`
```
chmod +x wait-for-it.sh
```
#
`Unix`
- Create server env variable
- Create docker env variables for mysql in .docker.env file
- Port can be changed in docker-compose.yml file
```
docker-compose up
```
#
`Windows`


### Install `Git Bash || (WSL)` to run the above command
- First install wsl (Windows Subsystem for Linux) PS: 'Make sure to go to direct links inside the article for latest commands to use not direct commands from article' `https://docs.microsoft.com/en-us/windows/wsl/install-win10`

- Sync up windows docker and wsl docker to work together `https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly`
#

### MySQL cheat sheet
`https://gist.github.com/bradtraversy/c831baaad44343cc945e76c2e30927b3`
#

## Sequelize
- `First add 'require('dotenv').config()' at top of file for env vars in config.js file to be used`
### Sequelize test db connection funcs
```

db.sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

db.sequelize.close()
  .then(() => console.log('Connection has been closed'))
  .catch(err => console.error('Unable to disconnect:', err));
```

`Sequelize Docs`
- `http://docs.sequelizejs.com/manual/getting-started.html`
- `http://docs.sequelizejs.com/manual/migrations.html`

#

### DNS on MacOS

 `Unix`
 - http://serverfault.com/questions/118378/in-my-etc-hosts-file-on-linux-osx-how-do-i-do-a-wildcard-subdomain
 - http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/
Working model from the above suggestions was this : 
```bash
brew install dnsmasq
sudo nano /usr/local/etc/dnsmasq.conf
```
Add the following address line : `address=/.test/127.0.0.1` and now you can use `anything.test` for your localhost : 
```
foo.test                  -> localhost
bar.test:3000             -> localhost:3000
foo.bar.baz.bat.test:1234 -> localhost:1234
``` 

