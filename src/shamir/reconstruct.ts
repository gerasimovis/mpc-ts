import { Share } from "./types";
import { ModBigInt } from "../utils/modmath";

export function reconstructSecret(shares: Share[], prime: bigint): bigint {
  let secret = new ModBigInt(0n, prime)

  for (let i = 0; i < shares.length; i++) {
    const share = shares[i];
    const { x, y } = share;
    const xi = new ModBigInt(BigInt(x), prime)
    const yi = new ModBigInt(BigInt(y), prime)
    let li = new ModBigInt(1n, prime)

    for (let j = 0; j < shares.length; j++) {
      if (i === j) continue;
      const share = shares[j];
      const { x } = share
      const xj = new ModBigInt(BigInt(x), prime)

      const numerator = new ModBigInt(0n, prime).sub(xj); // 0-xj
      const denominator = xi.sub(xj); // (xi - xj)
      const frac = numerator.div(denominator);
      li = li.mul(frac);
    }

    secret = secret.add(yi.mul(li))
  }

  return secret.value
}
