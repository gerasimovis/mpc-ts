import * as assert from "node:assert";
import { randomBytes } from 'crypto';

export class ModBigInt {
  constructor(public value: bigint, public modulus: bigint) {}

  static mod (a: bigint, p: bigint): bigint {
    const result = a % p;
    return result >= 0n ? result : result + p;
  }

  static modInv(a: bigint, p: bigint): bigint {
    let t = 0n, newT = 1n;
    let r = p, newR = ModBigInt.mod(a, p);

    while (newR !== 0n) {
      const quotient = r / newR;
      [t, newT] = [newT, t - quotient * newT];
      [r, newR] = [newR, r - quotient * newR];
    }

    if (r > 1n) throw new Error("No modular inverse (not coprime)");
    if (t < 0n) t += p;

    return t;
  }

  static rand(mod: bigint) {
    const bytes = Math.ceil(mod.toString(2).length / 8);
    let r: bigint;

    do {
      const buf = randomBytes(bytes);
      r = BigInt("0x" + buf.toString("hex"));
    } while (r >= mod || r === 0n);

    return new ModBigInt(r, mod);
  }

  add (other: ModBigInt) {
    assert.strictEqual(this.modulus, other.modulus, "Modulus mismatch");
    const value = ModBigInt.mod(this.value + other.value, this.modulus);
    return new ModBigInt(value, this.modulus);
  }

  sub (other: ModBigInt) {
    assert.strictEqual(this.modulus, other.modulus, "Modulus mismatch");
    const raw = this.value - other.value;
    const value = ModBigInt.mod(raw, this.modulus);
    return new ModBigInt(value, this.modulus);
  }

  mul (other: ModBigInt) {
    assert.strictEqual(this.modulus, other.modulus, "Modulus mismatch");
    const value = ModBigInt.mod(this.value * other.value, this.modulus);
    return new ModBigInt(value, this.modulus);
  }

  pow(exp: number) {
    if (exp < 0) throw new Error("Negative exponent not supported");
    let result = new ModBigInt(1n, this.modulus);
    let base: ModBigInt = this;
    let e = BigInt(exp);

    while (e > 0n) {
      if (e % 2n === 1n) {
        result = result.mul(base);
      }
      base = base.mul(base);
      e = e / 2n;
    }

    return result;
  }

  inv () {
    return new ModBigInt(ModBigInt.modInv(this.value, this.modulus), this.modulus);
  }

  div (other: ModBigInt) {
    assert.strictEqual(this.modulus, other.modulus, "Modulus mismatch");
    return this.mul(other.inv());
  }

  neg () {
    const value = ModBigInt.mod(-this.value, this.modulus);
    return new ModBigInt(value, this.modulus);
  }
}
