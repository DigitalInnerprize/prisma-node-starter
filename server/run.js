require('dotenv').config();
const { app } = require('./index');
const db = require('./models');

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database is ready');
  } catch (error) {
    throw new Error('Database failed to connect', error)
  }
  // eslint-disable-next-line no-console
  app.listen(3001, () => console.log(`api server started on port ${3001}`));
}

run();

