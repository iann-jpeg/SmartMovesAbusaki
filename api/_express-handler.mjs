import { app } from "../server/index.mjs";

export function handleApiRequest(req, res, prefix = "") {
  const queryPath = req.query?.path;
  const originalPath = String(req.url ?? "").split("?")[0];
  const routePrefix = `/api/${prefix}`.replace(/\/+$/, "");
  const urlSuffix = originalPath.startsWith(routePrefix) ? originalPath.slice(routePrefix.length) : "";
  const suffix = Array.isArray(queryPath) ? queryPath.join("/") : typeof queryPath === "string" ? queryPath : urlSuffix;
  const normalizedSuffix = suffix ? `/${suffix.replace(/^\/+/, "")}` : "";
  req.url = `/api/${prefix}${normalizedSuffix}`.replace(/\/+/g, "/");
  return app(req, res);
}
