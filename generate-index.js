// generate-index.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Este bloque es necesario por usar "type": "module"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKERS_DIR = path.join(__dirname, "public", "markers");
const INDEX_FILE = path.join(MARKERS_DIR, "index.json");

function generateIndex() {
  fs.readdir(MARKERS_DIR, (err, files) => {
    if (err) {
      console.error("❌ Error leyendo la carpeta de marcadores:", err);
      process.exit(1);
    }

    const jsonFiles = files
      .filter((file) => file.endsWith(".json") && file !== "index.json")
      .sort();

    fs.writeFile(INDEX_FILE, JSON.stringify(jsonFiles, null, 2), (err) => {
      if (err) {
        console.error("❌ Error escribiendo index.json:", err);
        process.exit(1);
      } else {
        console.log(`✅ index.json generado con ${jsonFiles.length} archivos.`);
      }
    });
  });
}

generateIndex();
