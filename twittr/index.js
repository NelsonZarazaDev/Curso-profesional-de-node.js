//Cambiar entre modo desarrollo y modo produccion npm run dev NODE_ENV="produccion"
//Por defectto se inicia en modo desarrollo el cual muestra el error en la consola de postman
//En modo produccion no muestra esa clase de errores

const express = require("express");
const config = require("./config");
const tweetsRouter = require("./routes/tweetsRouter");
const {
  logErrors,
  wrapErros,
  errorHandler,
} = require("./utils/middlewares/errorMiddlewares");
const notFoundMiddleware = require("./utils/middlewares/notFoundMiddleware");
const cors = require("cors");

const app = express();
const port = config.port;
app.use(cors({origin:config.dev ? "*" : config.corsOrigin}));
app.use(express.json()); //Permite el post
app.use("/tweets", tweetsRouter); //Permite las operaciones

//Catch 404
app.use(notFoundMiddleware);

//Error middlewares
app.use(logErrors);
app.use(wrapErros);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`🪐 server running at http://localhost:${port}`)
);
