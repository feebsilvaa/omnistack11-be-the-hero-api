const app = require('./app');

const PORT = process.env.PORT ? process.env.PORT : 3333;

// escuta a porta 3333 para receber as requisições
app.listen(PORT, () => {
  console.log(`Lintening ${PORT}.`)
});