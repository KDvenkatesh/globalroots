#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, String,
};

#[contract]
pub struct EscrowContract;

/// Trade Status
#[contracttype]
#[derive(Clone)]
pub enum TradeStatus {
    Created,
}

/// Trade Structure
#[contracttype]
#[derive(Clone)]
pub struct Trade {
    pub trade_id: u64,
    pub seller: Address,
    pub buyer: Address,
    pub product_name: String,
    pub amount: i128,
    pub status: TradeStatus,
}

/// Storage Key
#[contracttype]
pub enum DataKey {
    Trade(u64),
}

#[contractimpl]
impl EscrowContract {

    /// Create a new Trade
    pub fn create_trade(
        env: Env,
        trade_id: u64,
        seller: Address,
        buyer: Address,
        product_name: String,
        amount: i128,
    ) {

        let trade = Trade {
            trade_id,
            seller,
            buyer,
            product_name,
            amount,
            status: TradeStatus::Created,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }

    /// Read Trade
    pub fn get_trade(
        env: Env,
        trade_id: u64,
    ) -> Trade {

        env.storage()
            .persistent()
            .get(&DataKey::Trade(trade_id))
            .unwrap()
    }
}

mod test;