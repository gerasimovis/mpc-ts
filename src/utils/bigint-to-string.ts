export function bigintToString(b: bigint): string {
  const hex = b.toString(16);
  const padded = hex.length % 2 === 0 ? hex : "0" + hex;
  return Buffer.from(padded, "hex").toString("utf-8");
}
