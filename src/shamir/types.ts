export type Share = {
  x: number;
  y: number;
};

export type ShamirOptions = {
  secret: bigint;
  threshold: number;
  shares: number;
  prime: bigint;
};
