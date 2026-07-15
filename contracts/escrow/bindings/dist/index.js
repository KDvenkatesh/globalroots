import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAA9UcmFkZSBTdHJ1Y3R1cmUAAAAAAAAAAAVUcmFkZQAAAAAAAAYAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAxwcm9kdWN0X25hbWUAAAAQAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABnN0YXR1cwAAAAAH0AAAAAtUcmFkZVN0YXR1cwAAAAAAAAAACHRyYWRlX2lkAAAABg==",
            "AAAAAgAAAAtTdG9yYWdlIEtleQAAAAAAAAAAB0RhdGFLZXkAAAAAAQAAAAEAAAAAAAAABVRyYWRlAAAAAAAAAQAAAAY=",
            "AAAAAgAAAAxUcmFkZSBTdGF0dXMAAAAAAAAAC1RyYWRlU3RhdHVzAAAAAAYAAAAAAAAAAAAAAAdDcmVhdGVkAAAAAAAAAAAAAAAABkZ1bmRlZAAAAAAAAAAAAAAAAAAHU2hpcHBlZAAAAAAAAAAAAAAAAAlEZWxpdmVyZWQAAAAAAAAAAAAAAAAAAAhSZWxlYXNlZAAAAAAAAAAAAAAACUNhbmNlbGxlZAAAAA==",
            "AAAAAAAAAAlHZXQgVHJhZGUAAAAAAAAJZ2V0X3RyYWRlAAAAAAAAAQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAQAAB9AAAAAFVHJhZGUAAAA=",
            "AAAAAAAAABJCdXllciBmdW5kcyBlc2Nyb3cAAAAAAApmdW5kX3RyYWRlAAAAAAABAAAAAAAAAAh0cmFkZV9pZAAAAAYAAAAA",
            "AAAAAAAAABRTZWxsZXIgc2hpcHMgcHJvZHVjdAAAAApzaGlwX3RyYWRlAAAAAAABAAAAAAAAAAh0cmFkZV9pZAAAAAYAAAAA",
            "AAAAAAAAAAxDYW5jZWwgdHJhZGUAAAAMY2FuY2VsX3RyYWRlAAAAAQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAA==",
            "AAAAAAAAAAxDcmVhdGUgVHJhZGUAAAAMY3JlYXRlX3RyYWRlAAAABQAAAAAAAAAIdHJhZGVfaWQAAAAGAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAMcHJvZHVjdF9uYW1lAAAAEAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAABZSZWxlYXNlIGVzY3JvdyBwYXltZW50AAAAAAAPcmVsZWFzZV9wYXltZW50AAAAAAEAAAAAAAAACHRyYWRlX2lkAAAABgAAAAA=",
            "AAAAAAAAABdCdXllciBjb25maXJtcyBkZWxpdmVyeQAAAAAQY29uZmlybV9kZWxpdmVyeQAAAAEAAAAAAAAACHRyYWRlX2lkAAAABgAAAAA="]), options);
        this.options = options;
    }
    fromJSON = {
        get_trade: (this.txFromJSON),
        fund_trade: (this.txFromJSON),
        ship_trade: (this.txFromJSON),
        cancel_trade: (this.txFromJSON),
        create_trade: (this.txFromJSON),
        release_payment: (this.txFromJSON),
        confirm_delivery: (this.txFromJSON)
    };
}
