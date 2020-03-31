const app = require('./app');

// escuta a porta 3333 para receber as requisições
app.listen(3333, () => {
  console.debug("Server is running and listening on 3333 port.")
});