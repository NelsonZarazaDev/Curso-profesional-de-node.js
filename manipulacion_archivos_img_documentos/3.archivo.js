/*
1. Leer un archivo - fs.readFile()
2. Escribir un archivo - fs.writeFile()
3. Copiar un archivo - fs.copyFile()
4. Renombrar un archivo - fs.rename()
5. RRemover un archivo - fs.unlink()
*/


const fs=require('fs/promises');

async function main(){

    //Leer archivo
    try {
        const data = await fs.readFile('input.txt', 'utf-8');
        console.log("File content: ", data);
    } catch (error) {
        console.error("Error reading file: ", error)
    }

    //Crear archivo
    try {
        await fs.writeFile("output.txt", "Hello world","utf-8");
        console.log("File created successfully");
    } catch (error) {
        console.error("error",error);
    }

    //Copiar archivo
    try {
        await fs.copyFile("input.txt","input-copy.txt");
        console.log("File copid successfully");
    } catch (error) {
        console.error("Error copying file: ",error);
    }

    //Renombrar
    try {
        await fs.rename("input-copy.txt", "input-renamed.txt");
        console.log("File renamed successfully");
    } catch (error) {
        console.error("error",error);
    }

    //Eliminar
    try {
        await fs.unlink("input-renamed.txt");
        console.log("file delete")
    } catch (error) {
        console.error("error",error);
    }
}

main();