import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar todos los archivos de esquema
const typesArray = loadFilesSync(path.join(__dirname, './'), {
  extensions: ['graphql'],
});

// Fusionar los typeDefs
const typeDefs = mergeTypeDefs(typesArray, { throwOnConflict: true, sort: true });

export default typeDefs;