import { ShamirOptions, Share } from "./types";
import { ModBigInt } from "../utils/modmath";

/**
 * k = 5 (threshold)
 * secret = 12345
 * example: f(x) = secret + 42*x + 55*x^2 + 100*x^3 + 12*x^4
 * secret === f(0)
 */

export function splitSecret(options: ShamirOptions): Share[] {
  const { secret, shares, threshold, prime } = options

  if (secret < 0n || secret >= prime) {
    throw new Error("Secret must be a non-negative bigint less than the modulus");
  }

  if (shares < threshold) {
    throw new Error("shares must be >= threshold");
  }

  const results: Share[] = []
  const coefficients = [new ModBigInt(secret, prime)]
  for (let i = 1; i < threshold; i++) {
    coefficients.push(ModBigInt.rand(prime))
  }

  for (let x = 1n; x <= shares; x++) {
    let xi = new ModBigInt(x, prime)
    let y = new ModBigInt(0n, prime)

    coefficients.forEach((c, i) => {
      const term = xi.pow(i).mul(c)
      y = y.add(term)
    })

    results.push({ x: Number(x), y: Number(y.value) })
  }

  return results
}
