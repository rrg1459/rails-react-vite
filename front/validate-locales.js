import fs from 'fs';
import path from 'path';

const localesDir = path.join(path.resolve(), 'src', 'locales');
const languages = ['en', 'es'];
const errors = [];

function getFileStructure(dirPath) {
  const structure = {};

  function traverse(currentPath, currentStructure) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        currentStructure[file] = {};
        traverse(filePath, currentStructure[file]);
      } else {
        if (file.endsWith('.json')) {
          try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            currentStructure[file] = Object.keys(data).sort();
          } catch (e) {
            errors.push(`Error: El archivo JSON en '${filePath}' no es válido. Mensaje: ${e.message}`);
          }
        } else {
          currentStructure[file] = true;
        }
      }
    }
  }

  traverse(dirPath, structure);
  return structure;
}

function compareStructures(structure1, structure2, currentPath = '') {
  const keys1 = Object.keys(structure1).sort();
  const keys2 = Object.keys(structure2).sort();

  if (keys1.length !== keys2.length || keys1.join(',') !== keys2.join(',')) {
    const missingInEs = keys1.filter(key => !keys2.includes(key));
    const missingInEn = keys2.filter(key => !keys1.includes(key));

    if (missingInEs.length > 0) {
      errors.push(`Error: Archivos o carpetas que faltan en 'es' dentro de '${currentPath}': ${missingInEs.join(', ')}`);
    }
    if (missingInEn.length > 0) {
      errors.push(`Error: Archivos o carpetas que faltan en 'en' dentro de '${currentPath}': ${missingInEn.join(', ')}`);
    }
  }

  for (const key of keys1) {
    if (structure2[key]) {
      const value1 = structure1[key];
      const value2 = structure2[key];

      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
        if (Array.isArray(value1) && Array.isArray(value2)) {
          if (value1.length !== value2.length || value1.join(',') !== value2.join(',')) {
            const missingInEs = value1.filter(translationKey => !value2.includes(translationKey));
            const missingInEn = value2.filter(translationKey => !value1.includes(translationKey));

            if (missingInEs.length > 0) {
              errors.push(`Error: Claves que faltan en '${path.join(currentPath, key)}' (en 'es'): ${missingInEs.join(', ')}`);
            }
            if (missingInEn.length > 0) {
              errors.push(`Error: Claves que faltan en '${path.join(currentPath, key)}' (en 'en'): ${missingInEn.join(', ')}`);
            }
          }
        } else {
          compareStructures(value1, value2, path.join(currentPath, key));
        }
      }
    }
  }
}

console.log('Validando la estructura y claves de localización...');

try {
  const enStructure = getFileStructure(path.join(localesDir, languages[0]));
  const esStructure = getFileStructure(path.join(localesDir, languages[1]));

  compareStructures(enStructure, esStructure);

  if (errors.length > 0) {
    console.error('\n¡La validación falló! Se encontraron las siguientes inconsistencias:');
    errors.forEach(error => console.error(`- ${error}`));
    throw new Error('Validación fallida.');
  } else {
    console.log('\n✅ La estructura y las claves de los archivos de localización son consistentes en todas las carpetas.');
  }
} catch (error) {
  console.error(`\nError al validar las localizaciones: ${error.message}`);
  // Manejamos el error final para que el script termine con un código de salida no cero.
}