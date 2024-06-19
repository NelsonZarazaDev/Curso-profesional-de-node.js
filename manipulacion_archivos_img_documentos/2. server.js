const http = require("http");
const fs = require("fs/promises");
const url = require("url");

const server = http.createServer(async (request, response) => {
  //url.parse me permite leer la url
  //true convierte el strin query en object
  const queryObject = url.parse(request.url, true).query;
  const fileName = queryObject.file;

  if (fileName) {
    //Si nos entrega el nombre de un archivo, eso es lo que hace el server
    try {
      const data = await fs.readFile(fileName, "utf-8");
      response.writeHead(200, { "Content-type": "text/plain" });
      response.write(data);
      response.end();
    } catch (error) {
      response.writeHead(404, { "Content-type": "text/plain" });
      response.write("Fole not found");
      response.end();
    }
  } else {
    response.writeHead(400, { "Content-type": "text/plain" });
    response.write("Fole not found");
    response.end();
  }
});

const port = 5173;
server.listen(port, () => {
  console.log(`Server escuchando el puerto ${port}`);
});
