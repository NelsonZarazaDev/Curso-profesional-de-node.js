// //Lo usamos para los test
// const config = require("../../config");

// //Se hace inyeccion de dependencias, esto si no existe tome ese valor por defecto en este caso _isStackShown = config.dev 
// function withErrorStack(error, stack, _isStackShown = config.dev) {
//   if (_isStackShown) {
//     return { ...error, stack };
//   }
//   return error;
// }

// module.exports = withErrorStack;
