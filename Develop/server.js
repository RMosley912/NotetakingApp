const exp = require('express');
const filePath = require('path');
const apiModule = require('./routes/apiMain');

const SERVER_PORT = process.env.PORT || 3001;

let webApp = exp();

// Middleware
webApp.use(exp.json());
webApp.use(exp.urlencoded({ extended: true }));
webApp.use('/api', apiModule);

webApp.use(exp.static('public'));

// Route for homepage
webApp.get('/', (request, response) =>
  response.sendFile(filePath.join(__dirname, './public/index.html'))
);

// Route for notes page
webApp.get('/notes', (request, response) =>
  response.sendFile(filePath.join(__dirname, './public/notes.html'))
);

// Start the server
webApp.listen(SERVER_PORT, () =>
  console.log(`Server listening at http://localhost:${SERVER_PORT}`)
);
