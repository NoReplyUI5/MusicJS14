import { fileURLToPath } from "url";
import { dirname } from "path";
export default (url) => dirname(fileURLToPath(url));
