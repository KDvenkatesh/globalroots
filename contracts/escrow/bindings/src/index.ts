import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CBNEXEXZYSGDT3OOWJHWOEEZP6OP75UEANEPHSEXZE5PTYAP7HB5BAG6",
  }
} as const


/**
 * Trade Structure
 */
export interface Trade {
  amount: i128;
  buyer: string;
  product_name: string;
  seller: string;
  status: TradeStatus;
  trade_id: u64;
}

/**
 * Storage Key
 */
export type DataKey = {tag: "Trade", values: readonly [u64]};

/**
 * Trade Status
 */
export type TradeStatus = {tag: "Created", values: void} | {tag: "Funded", values: void} | {tag: "Shipped", values: void} | {tag: "Delivered", values: void} | {tag: "Released", values: void} | {tag: "Cancelled", values: void};

export interface Client {
  /**
   * Construct and simulate a get_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get Trade
   */
  get_trade: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<Trade>>

  /**
   * Construct and simulate a fund_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Buyer funds escrow
   */
  fund_trade: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a ship_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Seller ships product
   */
  ship_trade: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a cancel_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Cancel trade
   */
  cancel_trade: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Create Trade
   */
  create_trade: ({trade_id, seller, buyer, product_name, amount}: {trade_id: u64, seller: string, buyer: string, product_name: string, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a release_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Release escrow payment
   */
  release_payment: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a confirm_delivery transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Buyer confirms delivery
   */
  confirm_delivery: ({trade_id}: {trade_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAA9UcmFkZSBTdHJ1Y3R1cmUAAAAAAAAAAAVUcmFkZQAAAAAAAAYAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAxwcm9kdWN0X25hbWUAAAAQAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABnN0YXR1cwAAAAAH0AAAAAtUcmFkZVN0YXR1cwAAAAAAAAAACHRyYWRlX2lkAAAABg==",
        "AAAAAgAAAAtTdG9yYWdlIEtleQAAAAAAAAAAB0RhdGFLZXkAAAAAAQAAAAEAAAAAAAAABVRyYWRlAAAAAAAAAQAAAAY=",
        "AAAAAgAAAAxUcmFkZSBTdGF0dXMAAAAAAAAAC1RyYWRlU3RhdHVzAAAAAAYAAAAAAAAAAAAAAAdDcmVhdGVkAAAAAAAAAAAAAAAABkZ1bmRlZAAAAAAAAAAAAAAAAAAHU2hpcHBlZAAAAAAAAAAAAAAAAAlEZWxpdmVyZWQAAAAAAAAAAAAAAAAAAAhSZWxlYXNlZAAAAAAAAAAAAAAACUNhbmNlbGxlZAAAAA==",
        "AAAAAAAAAAlHZXQgVHJhZGUAAAAAAAAJZ2V0X3RyYWRlAAAAAAAAAQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAQAAB9AAAAAFVHJhZGUAAAA=",
        "AAAAAAAAABJCdXllciBmdW5kcyBlc2Nyb3cAAAAAAApmdW5kX3RyYWRlAAAAAAABAAAAAAAAAAh0cmFkZV9pZAAAAAYAAAAA",
        "AAAAAAAAABRTZWxsZXIgc2hpcHMgcHJvZHVjdAAAAApzaGlwX3RyYWRlAAAAAAABAAAAAAAAAAh0cmFkZV9pZAAAAAYAAAAA",
        "AAAAAAAAAAxDYW5jZWwgdHJhZGUAAAAMY2FuY2VsX3RyYWRlAAAAAQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAA==",
        "AAAAAAAAAAxDcmVhdGUgVHJhZGUAAAAMY3JlYXRlX3RyYWRlAAAABQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAMcHJvZHVjdF9uYW1lAAAAEAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAABZSZWxlYXNlIGVzY3JvdyBwYXltZW50AAAAAAAPcmVsZWFzZV9wYXltZW50AAAAAAEAAAAAAAAACHRyYWRlX2lkAAAABgAAAAA=",
        "AAAAAAAAABdCdXllciBjb25maXJtcyBkZWxpdmVyeQAAAAAQY29uZmlybV9kZWxpdmVyeQAAAAEAAAAAAAAACHRyYWRlX2lkAAAABgAAAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    get_trade: this.txFromJSON<Trade>,
        fund_trade: this.txFromJSON<null>,
        ship_trade: this.txFromJSON<null>,
        cancel_trade: this.txFromJSON<null>,
        create_trade: this.txFromJSON<null>,
        release_payment: this.txFromJSON<null>,
        confirm_delivery: this.txFromJSON<null>
  }
}