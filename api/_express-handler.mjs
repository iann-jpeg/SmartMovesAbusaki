import { app } from "../server/index.mjs";

export function handleApiRequest(req, res, prefix = "") {
  const queryPath = req.query?.path;
  const suffix = Array.isArray(queryPath) ? queryPath.join("/") : typeof queryPath === "string" ? queryPath : "";
  const normalizedSuffix = suffix ? `/${suffix.replace(/^\/+/, "")}` : "";
  req.url = `/api/${prefix}${normalizedSuffix}`.replace(/\/+/g, "/");
  return app(req, res);
}
