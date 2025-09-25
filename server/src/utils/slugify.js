import { nanoid } from "nanoid";

export function generateSlug(title = "") {
  const base = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "form"}-${nanoid(6)}`;
}
