# 🌍 GlobalRoots

GlobalRoots is a decentralized cross-border trade marketplace built on Stellar.

The platform connects global buyers and sellers and uses Soroban smart contracts to manage the trade lifecycle transparently on-chain.

## 🚀 Features

### Seller
- Connect Stellar wallet
- Add products
- View listed products
- Edit products
- Delete products
- Track trade status

### Buyer
- Browse global products
- View product details
- Purchase products
- Create blockchain trades
- Track trade lifecycle

### Blockchain Trade Flow

1. Seller lists a product
2. Buyer selects the product
3. Buyer creates a trade
4. Trade is stored on Stellar
5. Trade status becomes `Created`
6. Buyer funds the trade
7. Status becomes `Funded`
8. Seller marks the product as shipped
9. Status becomes `Shipped`
10. Buyer confirms delivery
11. Status becomes `Delivered`
12. Payment release is confirmed
13. Status becomes `Released`

## 🔐 Smart Contract Functions

The Soroban smart contract provides the following functions:

- `create_trade`
- `get_trade`
- `fund_trade`
- `ship_trade`
- `confirm_delivery`
- `release_payment`
- `cancel_trade`

## 📊 Trade Status Lifecycle

```text
Created
   ↓
Funded
   ↓
Shipped
   ↓
Delivered
   ↓
Released