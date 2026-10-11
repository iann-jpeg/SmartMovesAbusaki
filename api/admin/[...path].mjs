import { handleApiRequest } from "../_express-handler.mjs";

export default function handler(req, res) {
  return handleApiRequest(req, res, "admin");
}
