// GET /api/products
// Serves the product catalog. Reads once at startup and caches in memory.
// To update products: rebuild/redeploy the container (or mount as a ConfigMap in k8s).

import { Router } from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const products  = JSON.parse(readFileSync(join(__dirname, "../products.json"), "utf8"));

const router = Router();

router.get("/", (_req, res) => {
  res.json(products);
});

export default router;
