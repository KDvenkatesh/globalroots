import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from "@stellar/stellar-sdk/contract";
import type { u64, i128 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CBNEXEXZYSGDT3OOWJHWOEEZP6OP75UEANEPHSEXZE5PTYAP7HB5BAG6";
    };
};
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
export type DataKey = {
    tag: "Trade";
    values: readonly [u64];
};
/**
 * Trade Status
 */
export type TradeStatus = {
    tag: "Created";
    values: void;
} | {
    tag: "Funded";
    values: void;
} | {
    tag: "Shipped";
    values: void;
} | {
    tag: "Delivered";
    values: void;
} | {
    tag: "Released";
    values: void;
} | {
    tag: "Cancelled";
    values: void;
};
export interface Client {
    /**
     * Construct and simulate a get_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Get Trade
     */
    get_trade: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Trade>>;
    /**
     * Construct and simulate a fund_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Buyer funds escrow
     */
    fund_trade: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a ship_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Seller ships product
     */
    ship_trade: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a cancel_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Cancel trade
     */
    cancel_trade: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a create_trade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Create Trade
     */
    create_trade: ({ trade_id, seller, buyer, product_name, amount }: {
        trade_id: u64;
        seller: string;
        buyer: string;
        product_name: string;
        amount: i128;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a release_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Release escrow payment
     */
    release_payment: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a confirm_delivery transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Buyer confirms delivery
     */
    confirm_delivery: ({ trade_id }: {
        trade_id: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        get_trade: (json: string) => AssembledTransaction<Trade>;
        fund_trade: (json: string) => AssembledTransaction<null>;
        ship_trade: (json: string) => AssembledTransaction<null>;
        cancel_trade: (json: string) => AssembledTransaction<null>;
        create_trade: (json: string) => AssembledTransaction<null>;
        release_payment: (json: string) => AssembledTransaction<null>;
        confirm_delivery: (json: string) => AssembledTransaction<null>;
    };
}
