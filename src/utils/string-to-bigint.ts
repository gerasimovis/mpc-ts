export function stringToBigInt(str: string): bigint {
  const buffer = Buffer.from(str, "utf-8");
  return BigInt("0x" + buffer.toString("hex"));
}
