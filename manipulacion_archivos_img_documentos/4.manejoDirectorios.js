const fs = require("fs/promises");
const path = require("path");

async function main() {
  //Crear carpeta
  try {
    await fs.mkdir("test_folder");
    console.log("Carpeta creada exitosamente");
  } catch (error) {
    console.error("Error creating folder: ", error);
  }

  //Renombrar carpeta
  try {
    await fs.rename("test_folder", "renamed_folder");
    console.log("Folder renamed successfully");
  } catch (error) {
    console.error("Error renaming folder: ", error);
  }

  //Cambiar carpeta al interior de otra
  try {
    await fs.mkdir("parent_folder");
    //En la carpeta parent_folder guardar renamed_folder
    await fs.rename(
      "renamed_folder",

      path.join("parent_folder", "renamed_folder")
    );
    console.log("Folder moved successfully");
  } catch (error) {
    console.error("Error moved folder: ", error);
  }

  //Copiar
  async function copyFolder(src, dest) {
    try {
      await fs.mkdir(dest);
      const files = await fs.readdir(src);

      for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        const stat = await fs.stat(srcPath);

        if (stat.isDirectory()) {
          await copyFolder(srcPath, destPath);
        } else {
          await fs.copyFile(srcPath, destPath);
        }
      }
    } catch (error) {
      console.error("Error copiando carpeta: ", error);
    }
  }
  try {
    await copyFolder("parent_folder", "copy_folder");
    console.log("Folder copied successfully");
  } catch (error) {
    console.error("Error copiando carpeta: ", error);
  }
}

main();
