/**
 * Aplica firebase-cors.json al bucket de Firebase Storage.
 * Uso:
 *   npm run storage:cors -- tu-proyecto.appspot.com
 * o:
 *   set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com && npm run storage:cors
 *
 * Requiere gsutil (Google Cloud SDK) en PATH y autenticacion (gcloud auth login).
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const corsFile = path.join(root, "firebase-cors.json");

const bucketArg = process.argv[2]?.replace(/^gs:\/\//, "");
const bucket =
  bucketArg ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  process.env.FIREBASE_STORAGE_BUCKET;

if (!bucket) {
  console.error(
    "Indica el bucket: npm run storage:cors -- tu-proyecto.appspot.com\n" +
      "o define NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET."
  );
  process.exit(1);
}

const gsUri = `gs://${bucket}`;

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  return r.status ?? 1;
}

console.log(`Aplicando CORS: ${corsFile} -> ${gsUri}`);
const set = run("gsutil", ["cors", "set", corsFile, gsUri]);
if (set !== 0) {
  process.exit(set);
}

console.log("\nVerificacion (cors actual del bucket):");
run("gsutil", ["cors", "get", gsUri]);
