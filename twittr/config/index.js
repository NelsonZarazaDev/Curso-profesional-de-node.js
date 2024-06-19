const dotenv = require("dotenv");
dotenv.config();

//Estas son configuraciones de valores de entorno
//
const config = {
  //Esta configuracion permite manejar valores por defecto de las variables de entorno
  dev: process.env.NODE_ENV === "production",
  port: 5173, //process.env.PORT || 3000 -> Esto se usa para que tome el siguiente purto si el por defecto no funciona, en este caso todoasignarlo porr loq que interfiere con la bd
  databaseUrl: process.env.DATABASE_URI,
  PORT: process.env.PORT,
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER,
  DBPASSWORD: process.env.DBPASSWORD,
  DATABASE: process.env.DATABASE,
  corsOrigin: process.env.CPRS_ORIGIN || "url",
};

module.exports = config;
