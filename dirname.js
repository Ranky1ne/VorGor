import { dirname } from 'path';
import { fileURLToPath } from 'url';
import  path  from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const _dirname = (res,arg) => {
    res.sendFile(path.join(__dirname + arg))
};