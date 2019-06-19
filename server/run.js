require('dotenv').config();
const { app } = require('./index');
const db = require('./models');
const PORT =  process.env.PORT || 8080;

const run = () => {
  db.sequelize.sync()
    .then(() => console.log('Database is connected'))
    .then(() => app.listen(PORT, () => console.log(`api server started on port ${PORT}`)))
    .catch(err => console.log('Failed to connect to database', err));
}

run();

