module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DOCKER_MYSQL_PORT,
    "host": process.env.DB_HOST,
    "protocol": "tcp",
    "dialect": "mysql"
  },
  "test": {
    "username": 'test',
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DOCKER_MYSQL_PORT,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DOCKER_MYSQL_PORT,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
