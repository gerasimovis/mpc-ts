# mpc-ts

🛡️ TypeScript CLI for [Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) — a foundational cryptographic primitive used in secure multiparty computation (MPC).

---

## ✨ Features

- ✅ Split a secret into N shares
- ✅ Reconstruct the secret from any K shares
- ✅ CLI-ready with zero dependencies beyond `ts-node` / `tsx`
- ✅ BigInt-safe operations in ℤ/pℤ field
- ✅ Useful for both educational and experimental MPC purposes

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/gerasimovis/mpc-ts.git
cd mpc-ts
npm install
```

### 2. Make the CLI executable

```bash
chmod +x src/cli.ts
```

> Or use directly with `tsx`:
```bash
npx tsx src/cli.ts ...
```

---

## 🧪 CLI Usage

### Split a secret into 5 shares (threshold = 3)

```bash
npx tsx src/cli.ts split -s 1234 -t 3 -n 5
```

Outputs:

```json
[
  { "x": 1, "y": 5272 },
  { "x": 2, "y": 6705 },
  ...
]
```

### Reconstruct a secret from any 3 shares

```bash
npx tsx src/cli.ts reconstruct -i shares.json
```

Outputs:

```
Reconstructed secret: 1234
```

---

## ⚙️ API Reference (WIP)

- `splitSecret({ secret, threshold, shares, prime }) → Share[]`
- `reconstructSecret(shares: Share[], prime) → secret`

---

## 📦 TODO

- [ ] Add JSON output format options
- [ ] Add test suite (Jest/Vitest)
- [ ] Add support for hex/string input
- [ ] Publish as npm package (`mpc-ts`)

---

## 🧠 About Shamir's Secret Sharing

Shamir's scheme is a threshold-based method to split a secret into parts, such that:
- Any `k` parts can reconstruct the original
- Fewer than `k` parts reveal **nothing**

Mathematically:  
Secret = `f(0)` for a random polynomial `f(x)` of degree `k-1`, and shares = `f(x₁)...f(xₙ)`

---

## 📄 License

MIT © [gerasimovis](https://github.com/gerasimovis)
