const http = require('http');
const port = 3000 // || process.env.PORT;
const app = require('./App');

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Servidor rodando na url http://localhost:${port}`)
});
