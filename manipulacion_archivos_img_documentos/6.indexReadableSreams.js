//la imagen debe estar en formato .bmp

const fs = require("fs");
const printPixels = require("./5.ReadableStreams");

const readableStream = fs.createReadStream("./image.png");

readableStream.on("data", (chunk) => {
  // console.log(chunk);
  printPixels(chunk);
});

readableStream.on("end", () => {
  console.log("Fin del archivo");
});

readableStream.on("error", () => {
  console.log("Error en la lectura");
});