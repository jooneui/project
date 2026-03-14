import { createHash, timingSafeEqual } from "node:crypto";

export function hashEditToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function tokenMatches(token: string, hash: string) {
  const tokenHash = Buffer.from(hashEditToken(token));
  const storedHash = Buffer.from(hash);

  if (tokenHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(tokenHash, storedHash);
}
