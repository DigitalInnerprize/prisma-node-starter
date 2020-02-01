const Server = require('../index');
const main   = require('./dbScript');

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  Server.start(port);
} else {
  main()
    .then(() => Server.start(port))
    .catch(e => console.error(e));
}
