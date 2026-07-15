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
    Funded,
    Shipped,
    Delivered,
    Released,
    Cancelled,
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

    /// Internal helper to fetch a trade
    fn get_trade_internal(env: &Env, trade_id: u64) -> Trade {
        env.storage()
            .persistent()
            .get(&DataKey::Trade(trade_id))
            .unwrap()
    }

    /// Create Trade
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

    /// Get Trade
    pub fn get_trade(
        env: Env,
        trade_id: u64,
    ) -> Trade {

        Self::get_trade_internal(&env, trade_id)
    }

    /// Buyer funds escrow
    pub fn fund_trade(
        env: Env,
        trade_id: u64,
    ) {

        let mut trade = Self::get_trade_internal(&env, trade_id);

        trade.status = TradeStatus::Funded;

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }

    /// Seller ships product
    pub fn ship_trade(
        env: Env,
        trade_id: u64,
    ) {

        let mut trade = Self::get_trade_internal(&env, trade_id);

        trade.status = TradeStatus::Shipped;

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }

    /// Buyer confirms delivery
    pub fn confirm_delivery(
        env: Env,
        trade_id: u64,
    ) {

        let mut trade = Self::get_trade_internal(&env, trade_id);

        trade.status = TradeStatus::Delivered;

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }

    /// Release escrow payment
    pub fn release_payment(
        env: Env,
        trade_id: u64,
    ) {

        let mut trade = Self::get_trade_internal(&env, trade_id);

        trade.status = TradeStatus::Released;

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }

    /// Cancel trade
    pub fn cancel_trade(
        env: Env,
        trade_id: u64,
    ) {

        let mut trade = Self::get_trade_internal(&env, trade_id);

        trade.status = TradeStatus::Cancelled;

        env.storage()
            .persistent()
            .set(&DataKey::Trade(trade_id), &trade);
    }
}

mod test;