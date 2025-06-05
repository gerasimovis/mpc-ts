#!/usr/bin/env tsx

import { Command } from "commander";
import { splitSecret } from "./shamir/split";
import { reconstructSecret } from "./shamir/reconstruct";
import * as fs from "node:fs";
const program = new Command();

program
  .name("mpc-cli")
  .description("A CLI tool for Shamir Secret Sharing")
  .version("0.1.0");

program
  .command("split")
  .description("Split a secret into N shares with a threshold for reconstruction")
  .requiredOption("-s, --secret <number>", "Secret value to split", value => BigInt(parseInt(value)))
  .requiredOption("-t, --threshold <number>", "Minimum number of shares required to reconstruct the secret", parseInt)
  .requiredOption("-n, --shares <number>", "Total number of shares to generate", parseInt)
  .option("-p, --prime <number>", "Prime modulus to use for field operations", value => BigInt(parseInt(value)), 7919n)
  .action((opts) => {
    const shares = splitSecret(opts);
    console.log("Generated shares:", shares);
    fs.writeFileSync("shares.json", JSON.stringify(shares, null, 2));
  });

program
  .command("reconstruct")
  .description("Reconstruct a secret from a set of shares")
  .requiredOption("-i, --input <path>", "Path to a JSON file with shares in format [{ x, y }]")
  .option("-p, --prime <number>", "Prime modulus used during sharing", value => BigInt(parseInt(value)), 7919n)
  .action((opts) => {
    const { prime, input } = opts;
    const buffer = fs.readFileSync(input);
    const shares = JSON.parse(buffer.toString());
    const secret = reconstructSecret(shares, prime);
    console.log("Reconstructed secret:", secret);
  });

program.parse();
